import { Editor, Node, Path, Point, Range, Transforms } from 'slate';
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
import type { SvelteEditor } from './withSvelte';

export function getWindow(editor: SvelteEditor): Window {
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

export function findDocumentOrShadowRoot(editor: SvelteEditor): Document | ShadowRoot {
	const el = toDOMNode(editor, editor);
	const root = el.getRootNode();

	if (
		(root instanceof Document || root instanceof ShadowRoot) &&
		(root as any).getSelection != null
	) {
		return root;
	}

	return el.ownerDocument;
}

export function isFocused(editor: SvelteEditor): boolean {
	return !!IS_FOCUSED.get(editor);
}

export function isReadOnly(editor: SvelteEditor): boolean {
	return !!IS_READ_ONLY.get(editor);
}

export function blur(editor: SvelteEditor): void {
	const el = toDOMNode(editor, editor);
	const root = findDocumentOrShadowRoot(editor);
	IS_FOCUSED.set(editor, false);

	if (root.activeElement === el) {
		el.blur();
	}
}

export function focus(editor: SvelteEditor): void {
	const el = toDOMNode(editor, editor);
	const root = findDocumentOrShadowRoot(editor);
	IS_FOCUSED.set(editor, true);

	if (root.activeElement !== el) {
		el.focus({ preventScroll: true });
	}
}

export function deselect(editor: SvelteEditor): void {
	const el = toDOMNode(editor, editor);
	const { selection } = editor;
	const root = findDocumentOrShadowRoot(editor);
	const domSelection = (root as any).getSelection();

	if (domSelection && domSelection.rangeCount > 0) {
		domSelection.removeAllRanges();
	}

	if (selection) {
		Transforms.deselect(editor);
	}
}

export function hasDOMNode(
	editor: SvelteEditor,
	target: DOMNode,
	options: { editable?: boolean } = {}
): boolean {
	const { editable = false } = options;
	const editorEl = toDOMNode(editor, editor);
	let targetEl;

	// COMPAT: In Firefox, reading `target.nodeType` will throw an error if
	// target is originating from an internal "restricted" element (e.g. a
	// stepper arrow on a number input). (2018/05/04)
	// https://github.com/ianstormtaylor/slate/issues/1819
	try {
		targetEl = (isDOMElement(target) ? target : target.parentElement) as HTMLElement;
	} catch (err) {
		if (!(err as any).message.includes('Permission denied to access property "nodeType"')) {
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
			: (typeof targetEl.isContentEditable === 'boolean' && // isContentEditable exists only on HTMLElement, and on other nodes it will be undefined
					// this is the core logic that lets you know you got the right editor.selection instead of null when editor is contenteditable="false"(readOnly)
					targetEl.closest('[contenteditable="false"]') === editorEl) ||
			  !!targetEl.getAttribute('data-slate-zero-width'))
	);
}

export function toDOMNode(editor: SvelteEditor, node: Node, throwError = true): HTMLElement {
	const KEY_TO_ELEMENT = EDITOR_TO_KEY_TO_ELEMENT.get(editor);
	const domNode = Editor.isEditor(node)
		? EDITOR_TO_ELEMENT.get(editor)
		: KEY_TO_ELEMENT?.get(findKey(node));

	if (!domNode && throwError) {
		throw new Error(`Cannot resolve a DOM node from Slate node: ${JSON.stringify(node)}`);
	}

	return domNode;
}

export function hasDOMPoint(editor: SvelteEditor, point: Point): boolean {
	return !!toDOMPoint(editor, point, false);
}

export function toDOMPoint(editor: SvelteEditor, point: Point, throwError = true): DOMPoint {
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

	return domPoint;
}

export function hasDOMRange(editor: SvelteEditor, range: Range): boolean {
	return !!toDOMRange(editor, range, false);
}

export function toDOMRange(editor: SvelteEditor, range: Range, throwError = true): DOMRange {
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

	// A slate Point at zero-width Leaf always has an offset of 0 but a native DOM selection at
	// zero-width node has an offset of 1 so we have to check if we are in a zero-width node and
	// adjust the offset accordingly.
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

export function findEventRange(editor: SvelteEditor, event: any): Range {
	if ('nativeEvent' in event) {
		event = event.nativeEvent;
	}

	const { clientX: x, clientY: y, target } = event;

	if (x == null || y == null) {
		throw new Error(`Cannot resolve a Slate range from a DOM event: ${event}`);
	}

	const node = toSlateNode(event.target);
	const path = findPath(node);

	// If the drop target is inside a void node, move it into either the
	// next or previous node, depending on which side the `x` and `y`
	// coordinates are closest to.
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

	// Else resolve a range from the caret position where the drop occured.
	let domRange;
	const { document } = getWindow(editor);

	// COMPAT: In Firefox, `caretRangeFromPoint` doesn't exist. (2016/07/25)
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

	// Resolve a Slate range from the DOM range.
	const range = toSlateRange(editor, domRange, {
		exactMatch: false,
		suppressThrow: false
	});
	return range;
}

export function toSlatePoint<T extends boolean>(
	editor: SvelteEditor,
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

		// Calculate how far into the text node the `nearestNode` is, so that we
		// can determine what the offset relative to the text node is.
		if (leafNode) {
			textNode = leafNode.closest('[data-slate-node="text"]')!;
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
				el!.parentNode!.removeChild(el);
			});

			// COMPAT: Edge has a bug where Range.prototype.toString() will
			// convert \n into \r\n. The bug causes a loop when slate-react
			// attempts to reposition its cursor to match the native position. Use
			// textContent.length instead.
			// https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/10291116/
			offset = contents.textContent!.length;
			domNode = textNode;
		} else if (voidNode) {
			// For void nodes, the element with the offset key will be a cousin, not an
			// ancestor, so find it by going down from the nearest void parent.
			leafNode = voidNode.querySelector('[data-slate-leaf]')!;

			// COMPAT: In read-only editors the leaf is not rendered.
			if (!leafNode) {
				offset = 1;
			} else {
				textNode = leafNode.closest('[data-slate-node="text"]')!;
				domNode = leafNode;
				offset = domNode.textContent!.length;
				domNode.querySelectorAll('[data-slate-zero-width]').forEach((el) => {
					offset -= el.textContent!.length;
				});
			}
		}

		if (
			domNode &&
			offset === domNode.textContent!.length &&
			// COMPAT: If the parent node is a Slate zero-width space, editor is
			// because the text node should have no characters. However, during IME
			// composition the ASCII characters will be prepended to the zero-width
			// space, so subtract 1 from the offset to account for the zero-width
			// space character.
			(parentNode.hasAttribute('data-slate-zero-width') ||
				// COMPAT: In Firefox, `range.cloneContents()` returns an extra trailing '\n'
				// when the document ends with a new-line character. This results in the offset
				// length being off by one, so we need to subtract one to account for this.
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

	// COMPAT: If someone is clicking from one Slate editor into another,
	// the select event fires twice, once for the old editor's `element`
	// first, and then afterwards for the correct `element`. (2017/03/03)
	const slateNode = toSlateNode(textNode!);
	const path = findPath(slateNode);
	return { path, offset } as T extends true ? Point | null : Point;
}

export function toSlateRange<T extends boolean>(
	editor: SvelteEditor,
	domRange: DOMRange | DOMStaticRange | DOMSelection,
	options: {
		exactMatch: T;
		suppressThrow: T;
	}
): T extends true ? Range | null : Range {
	const { exactMatch, suppressThrow } = options;
	const el = isDOMSelection(domRange) ? domRange.anchorNode : domRange.startContainer;
	let anchorNode;
	let anchorOffset;
	let focusNode;
	let focusOffset;
	let isCollapsed;

	if (el) {
		if (isDOMSelection(domRange)) {
			anchorNode = domRange.anchorNode;
			anchorOffset = domRange.anchorOffset;
			focusNode = domRange.focusNode;
			focusOffset = domRange.focusOffset;
			// COMPAT: There's a bug in chrome that always returns `true` for
			// `isCollapsed` for a Selection that comes from a ShadowRoot.
			// (2020/08/08)
			// https://bugs.chromium.org/p/chromium/issues/detail?id=447523
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
	// if the selection is a hanging range that ends in a void
	// and the DOM focus is an Element
	// (meaning that the selection ends before the element)
	// unhang the range to avoid mistakenly including the void
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

export function hasRange(editor: SvelteEditor, range: Range): boolean {
	const { anchor, focus } = range;
	return Editor.hasPath(editor, anchor.path) && Editor.hasPath(editor, focus.path);
}

export function shallowCompare(obj1: object, obj2: object) {
	return (
		Object.keys(obj1).length === Object.keys(obj2).length &&
		Object.keys(obj1).every((key) => obj2.hasOwnProperty(key) && obj1[key] === obj2[key])
	);
}

export function isDecoratorRangeListEqual(list?: Range[], another?: Range[]): boolean {
	if (list === another) {
		return true;
	}
	if (!list || !another || list?.length !== another?.length) {
		return false;
	}

	for (let i = 0; i < list.length; i++) {
		const range = list[i];
		const other = another[i];

		const { anchor: _rangeAnchor, focus: _rangeFocus, ...rangeOwnProps } = range;
		const { anchor: _otherAnchor, focus: _otherFocus, ...otherOwnProps } = other;

		if (
			!Range.equals(range, other) ||
			range[PLACEHOLDER_SYMBOL] !== other[PLACEHOLDER_SYMBOL] ||
			!shallowCompare(rangeOwnProps, otherOwnProps)
		) {
			return false;
		}
	}

	return true;
}

export function objectSet<T>(obj: T, key: keyof T, value: T[keyof T]): T {
	obj[key] = value;
	return obj;
}
