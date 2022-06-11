import { Editor, Node, Path, Point, Range, Transforms } from 'slate';
import { writable, type Writable } from 'svelte/store';
import { getContext, setContext } from 'svelte';
import { shallowEqual } from 'fast-equals';
import { Key } from './Key';
import {
	EDITOR_TO_ELEMENT,
	ELEMENT_TO_NODE,
	IS_FOCUSED,
	IS_READ_ONLY,
	NODE_TO_INDEX,
	NODE_TO_KEY,
	NODE_TO_PARENT,
	EDITOR_TO_WINDOW,
	EDITOR_TO_KEY_TO_ELEMENT,
	PLACEHOLDER_SYMBOL
} from './weakMaps';
import type { DOMPoint } from './dom';
import {
	DOMElement,
	DOMNode,
	DOMRange,
	DOMSelection,
	DOMStaticRange,
	isDOMElement,
	isDOMSelection,
	normalizeDOMPoint,
	hasShadowRoot
} from './dom';
import { IS_CHROME, IS_FIREFOX } from './environment';
import type { ISvelteEditor } from './withSvelte';
import type { SvelteComponentTyped } from 'svelte';

export type ISvelteComponent<T extends Record<string, any> = Record<string, any>> = new (
	...args: any[]
) => SvelteComponentTyped<T>;

export function getWindow(editor: ISvelteEditor): Window {
	const window = EDITOR_TO_WINDOW.get(editor);
	if (!window) {
		throw new Error('Unable to find a host window element for this editor');
	}
	return window;
}

export function findKey(node: Node): Key {
	let key = NODE_TO_KEY.get(node);

	if (!key) {
		key = new Key();
		NODE_TO_KEY.set(node, key);
	}

	return key;
}

export function findPath(node: Node): Path {
	const path: Path = [];
	let child = node;

	while (true) {
		const parent = NODE_TO_PARENT.get(child);

		if (parent == null) {
			if (Editor.isEditor(child)) {
				return path;
			} else {
				break;
			}
		}

		const i = NODE_TO_INDEX.get(child);

		if (i == null) {
			break;
		}

		path.unshift(i);
		child = parent;
	}

	throw new Error(`Unable to find the path for Slate node: ${JSON.stringify(node)}`);
}

export function findDocumentOrShadowRoot(editor: ISvelteEditor): Document | ShadowRoot {
	const el = toDOMNode(editor, editor);
	const root = el.getRootNode();

	if (
		(root instanceof Document || root instanceof ShadowRoot) &&
		(root as Document).getSelection != null
	) {
		return root;
	}

	return el.ownerDocument;
}

export function isFocused(editor: ISvelteEditor): boolean {
	return !!IS_FOCUSED.get(editor);
}

export function isReadOnly(editor: ISvelteEditor): boolean {
	return !!IS_READ_ONLY.get(editor);
}

export function blur(editor: ISvelteEditor): void {
	const el = toDOMNode(editor, editor);
	const root = findDocumentOrShadowRoot(editor);
	IS_FOCUSED.set(editor, false);

	if (root.activeElement === el) {
		el.blur();
	}
}

export function focus(editor: ISvelteEditor): void {
	const el = toDOMNode(editor, editor);
	const root = findDocumentOrShadowRoot(editor);
	IS_FOCUSED.set(editor, true);

	if (root.activeElement !== el) {
		el.focus({ preventScroll: true });
	}
}

export function deselect(editor: ISvelteEditor): void {
	const root = findDocumentOrShadowRoot(editor);
	const domSelection = (root as Document).getSelection();

	if (domSelection && domSelection.rangeCount > 0) {
		domSelection.removeAllRanges();
	}

	if (editor.selection) {
		Transforms.deselect(editor);
	}
}

export function hasDOMNode(
	editor: ISvelteEditor,
	target: DOMNode,
	options: { editable?: boolean } = {}
): boolean {
	const { editable = false } = options;
	const editorEl = toDOMNode(editor, editor);
	let targetEl: HTMLElement | null = null;

	try {
		targetEl = (isDOMElement(target) ? target : target.parentElement) as HTMLElement;
	} catch (err) {
		if (!(err as Error).message.includes('Permission denied to access property "nodeType"')) {
			throw err;
		}
	}

	if (!targetEl) {
		return false;
	}

	return (
		targetEl.closest(`[data-svelte-editor]`) === editorEl &&
		(!editable || targetEl.isContentEditable
			? true
			: (typeof targetEl.isContentEditable === 'boolean' &&
					targetEl.closest('[contenteditable="false"]') === editorEl) ||
			  !!targetEl.getAttribute('data-slate-zero-width'))
	);
}

export function toDOMNode(editor: ISvelteEditor, node: Node, throwError = true): HTMLElement {
	const KEY_TO_ELEMENT = EDITOR_TO_KEY_TO_ELEMENT.get(editor);
	const domNode = Editor.isEditor(node)
		? EDITOR_TO_ELEMENT.get(editor)
		: KEY_TO_ELEMENT?.get(findKey(node));

	if (!domNode && throwError) {
		throw new Error(`Cannot resolve a DOM node from Slate node: ${JSON.stringify(node)}`);
	}

	return domNode as HTMLElement;
}

export function hasDOMPoint(editor: ISvelteEditor, point: Point): boolean {
	return !!toDOMPoint(editor, point, false);
}

export function toDOMPoint(editor: ISvelteEditor, point: Point, throwError = true): DOMPoint {
	const [node] = Editor.node(editor, point.path);
	const el = toDOMNode(editor, node, throwError);
	let domPoint: DOMPoint | undefined;

	if (Editor.void(editor, { at: point })) {
		point = { path: point.path, offset: 0 };
	}

	const selector = `[data-slate-string], [data-slate-zero-width]`;
	const texts = el ? Array.from(el.querySelectorAll(selector)) : [];
	let start = 0;

	for (const text of texts) {
		const domNode = text.childNodes[0] as HTMLElement;

		if (domNode == null || domNode.textContent == null) {
			continue;
		}

		const { length } = domNode.textContent;
		const attr = text.getAttribute('data-slate-length');
		const trueLength = attr == null ? length : parseInt(attr, 10);
		const end = start + trueLength;

		if (point.offset <= end) {
			const offset = Math.min(length, Math.max(0, point.offset - start));
			domPoint = [domNode, offset];
			break;
		}

		start = end;
	}

	if (!domPoint && throwError) {
		throw new Error(`Cannot resolve a DOM point from Slate point: ${JSON.stringify(point)}`);
	}

	return domPoint as DOMPoint;
}

export function hasDOMRange(editor: ISvelteEditor, range: Range): boolean {
	return !!toDOMRange(editor, range, false);
}

export function toDOMRange(
	editor: ISvelteEditor,
	range: Range,
	throwError = true
): DOMRange | undefined {
	const { anchor, focus } = range;
	const isBackward = Range.isBackward(range);
	const domAnchor = toDOMPoint(editor, anchor, throwError);
	if (!domAnchor) {
		return undefined;
	}
	const domFocus = Range.isCollapsed(range) ? domAnchor : toDOMPoint(editor, focus);

	const window = getWindow(editor);
	const domRange = window.document.createRange();
	const [startNode, startOffset] = isBackward ? domFocus : domAnchor;
	const [endNode, endOffset] = isBackward ? domAnchor : domFocus;

	const startEl = (isDOMElement(startNode) ? startNode : startNode.parentElement) as HTMLElement;
	const isStartAtZeroWidth = !!startEl.getAttribute('data-slate-zero-width');
	const endEl = (isDOMElement(endNode) ? endNode : endNode.parentElement) as HTMLElement;
	const isEndAtZeroWidth = !!endEl.getAttribute('data-slate-zero-width');

	domRange.setStart(startNode, isStartAtZeroWidth ? 1 : startOffset);
	domRange.setEnd(endNode, isEndAtZeroWidth ? 1 : endOffset);
	return domRange;
}

export function toSlateNode(domNode: DOMNode): Node {
	let domEl = isDOMElement(domNode) ? domNode : domNode.parentElement;

	if (domEl && !domEl.hasAttribute('data-slate-node')) {
		domEl = domEl.closest(`[data-slate-node]`);
	}

	const node = domEl ? ELEMENT_TO_NODE.get(domEl as HTMLElement) : null;

	if (!node) {
		throw new Error(`Cannot resolve a Slate node from DOM node: ${domEl}`);
	}

	return node;
}

export function findEventRange(editor: ISvelteEditor, event: any): Range {
	const { clientX: x, clientY: y, target } = event;

	if (x == null || y == null) {
		throw new Error(`Cannot resolve a Slate range from a DOM event: ${event}`);
	}

	const node = toSlateNode(event.target);
	const path = findPath(node);

	if (Editor.isVoid(editor, node)) {
		const rect = target.getBoundingClientRect();
		const isPrev = editor.isInline(node)
			? x - rect.left < rect.left + rect.width - x
			: y - rect.top < rect.top + rect.height - y;

		const edge = Editor.point(editor, path, {
			edge: isPrev ? 'start' : 'end'
		});
		const point = isPrev ? Editor.before(editor, edge) : Editor.after(editor, edge);

		if (point) {
			const range = Editor.range(editor, point);
			return range;
		}
	}

	let domRange: DOMRange | null = null;
	const { document } = getWindow(editor);

	if (document.caretRangeFromPoint) {
		domRange = document.caretRangeFromPoint(x, y);
	} else {
		const position = (document as any).caretPositionFromPoint(x, y);

		if (position) {
			domRange = document.createRange();
			domRange.setStart(position.offsetNode, position.offset);
			domRange.setEnd(position.offsetNode, position.offset);
		}
	}

	if (!domRange) {
		throw new Error(`Cannot resolve a Slate range from a DOM event: ${event}`);
	}

	const range = toSlateRange(editor, domRange, {
		exactMatch: false,
		suppressThrow: false
	});
	return range;
}

export function toSlatePoint<T extends boolean>(
	editor: ISvelteEditor,
	domPoint: DOMPoint,
	options: {
		exactMatch: T;
		suppressThrow: T;
	}
): T extends true ? Point | null : Point {
	const { exactMatch, suppressThrow } = options;
	const [nearestNode, nearestOffset] = exactMatch ? domPoint : normalizeDOMPoint(domPoint);
	const parentNode = nearestNode.parentNode as DOMElement;
	let textNode: DOMElement | null = null;
	let offset = 0;

	if (parentNode) {
		const voidNode = parentNode.closest('[data-slate-void="true"]');
		let leafNode = parentNode.closest('[data-slate-leaf]');
		let domNode: DOMElement | null = null;

		if (leafNode) {
			textNode = leafNode.closest('[data-slate-node="text"]');

			if (textNode) {
				const window = getWindow(editor);
				const range = window.document.createRange();
				range.setStart(textNode, 0);
				range.setEnd(nearestNode, nearestOffset);

				const contents = range.cloneContents();
				const removals = [
					...Array.prototype.slice.call(contents.querySelectorAll('[data-slate-zero-width]')),
					...Array.prototype.slice.call(contents.querySelectorAll('[contenteditable=false]'))
				];

				removals.forEach((el) => {
					el.parentNode.removeChild(el);
				});

				offset = contents?.textContent?.length || 0;
				domNode = textNode;
			}
		} else if (voidNode) {
			leafNode = voidNode.querySelector('[data-slate-leaf]');

			if (!leafNode) {
				offset = 1;
			} else {
				textNode = leafNode.closest('[data-slate-node="text"]');
				domNode = leafNode;
				offset = domNode?.textContent?.length || 0;
				domNode.querySelectorAll('[data-slate-zero-width]').forEach((el) => {
					offset -= el?.textContent?.length || 0;
				});
			}
		}

		if (
			domNode &&
			offset === domNode?.textContent?.length &&
			(parentNode.hasAttribute('data-slate-zero-width') ||
				(IS_FIREFOX && domNode.textContent?.endsWith('\n\n')))
		) {
			offset--;
		}
	}

	if (!textNode) {
		if (suppressThrow) {
			return null as T extends true ? Point | null : Point;
		}
		throw new Error(`Cannot resolve a Slate point from DOM point: ${domPoint}`);
	}

	const slateNode = toSlateNode(textNode);
	const path = findPath(slateNode);
	return { path, offset } as T extends true ? Point | null : Point;
}

export function toSlateRange<T extends boolean>(
	editor: ISvelteEditor,
	domRange: DOMRange | DOMStaticRange | DOMSelection,
	options: {
		exactMatch: T;
		suppressThrow: T;
	}
): T extends true ? Range | null : Range {
	const { exactMatch, suppressThrow } = options;
	const el = isDOMSelection(domRange) ? domRange.anchorNode : domRange.startContainer;
	let anchorNode: DOMNode | null = null;
	let anchorOffset: number = 0;
	let focusNode: DOMNode | null = null;
	let focusOffset: number = 0;
	let isCollapsed: boolean = false;

	if (el) {
		if (isDOMSelection(domRange)) {
			anchorNode = domRange.anchorNode;
			anchorOffset = domRange.anchorOffset;
			focusNode = domRange.focusNode;
			focusOffset = domRange.focusOffset;
			if (IS_CHROME && hasShadowRoot()) {
				isCollapsed =
					domRange.anchorNode === domRange.focusNode &&
					domRange.anchorOffset === domRange.focusOffset;
			} else {
				isCollapsed = domRange.isCollapsed;
			}
		} else {
			anchorNode = domRange.startContainer;
			anchorOffset = domRange.startOffset;
			focusNode = domRange.endContainer;
			focusOffset = domRange.endOffset;
			isCollapsed = domRange.collapsed;
		}
	}

	if (anchorNode == null || focusNode == null || anchorOffset == null || focusOffset == null) {
		throw new Error(`Cannot resolve a Slate range from DOM range: ${domRange}`);
	}

	const anchor = toSlatePoint(editor, [anchorNode, anchorOffset], {
		exactMatch,
		suppressThrow
	});
	if (!anchor) {
		return null as T extends true ? Range | null : Range;
	}

	const focus = isCollapsed
		? anchor
		: toSlatePoint(editor, [focusNode, focusOffset], {
				exactMatch,
				suppressThrow
		  });
	if (!focus) {
		return null as T extends true ? Range | null : Range;
	}

	let range: Range = { anchor: anchor as Point, focus: focus as Point };
	if (
		Range.isExpanded(range) &&
		Range.isForward(range) &&
		isDOMElement(focusNode) &&
		Editor.void(editor, { at: range.focus, mode: 'highest' })
	) {
		range = Editor.unhangRange(editor, range, { voids: true });
	}

	return range as unknown as T extends true ? Range | null : Range;
}

export function hasRange(editor: ISvelteEditor, range: Range): boolean {
	const { anchor, focus } = range;
	return Editor.hasPath(editor, anchor.path) && Editor.hasPath(editor, focus.path);
}

export function isDecoratorRangeListEqual(list?: Range[], another?: Range[]): boolean {
	if (list === another) {
		return true;
	}
	if (!list) {
		return false;
	}
	if (!another) {
		return false;
	}
	if (list.length !== another.length) {
		return false;
	}

	for (let i = 0; i < list.length; i++) {
		const range = list[i];
		const other = another[i];

		const { anchor: _rangeAnchor, focus: _rangeFocus, ...rangeOwnProps } = range;
		const { anchor: _otherAnchor, focus: _otherFocus, ...otherOwnProps } = other;

		if (
			!Range.equals(range, other) ||
			(range as any)[PLACEHOLDER_SYMBOL] !== (other as any)[PLACEHOLDER_SYMBOL] ||
			!shallowEqual(rangeOwnProps, otherOwnProps)
		) {
			return false;
		}
	}

	return true;
}

export function isSelectionEqual(selection: Range | null, other: Range | null): boolean {
	return selection === other || (!!selection && !!other && Range.equals(selection, other));
}

export type IContextKey<T> = { _type: T };

export function createContextKey<T>(): IContextKey<T> {
	return {} as IContextKey<T>;
}

export function getFromContext<T>(key: IContextKey<T>) {
	const context = getContext<Writable<T>>(key);
	if (!context) {
		throw new Error(`Must be used inside the component's context.`);
	}
	return context;
}

export function createContext<T>(key: IContextKey<T>, intialValue: T): Writable<T> {
	const store = writable(intialValue);
	setContext(key, store);
	return store;
}
