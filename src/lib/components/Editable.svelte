<script lang="ts" context="module">
	export const ELEMENT_CONTEXT_KEY = createContextKey<ISvelteComponent<IElementProps>>();
	export const LEAF_CONTEXT_KEY = createContextKey<ISvelteComponent<ILeafProps>>();
	export const PLACEHOLDER_CONTEXT_KEY = createContextKey<ISvelteComponent<IPlaceholderProps>>();

	export function getElementContext() {
		return getFromContext(ELEMENT_CONTEXT_KEY);
	}
	export function getLeafContext() {
		return getFromContext(LEAF_CONTEXT_KEY);
	}
	export function getPlaceholderContext() {
		return getFromContext(PLACEHOLDER_CONTEXT_KEY);
	}

	type DeferredOperation = () => void;

	export function hasTarget(editor: ISvelteEditor, target: EventTarget | null): target is Node {
		return isDOMNode(target) && hasDOMNode(editor, target);
	}

	export function hasEditableTarget(
		editor: ISvelteEditor,
		target: EventTarget | null
	): target is DOMNode {
		return isDOMNode(target) && hasDOMNode(editor, target, { editable: true });
	}

	export function isTargetInsideNonReadonlyVoid(
		editor: ISvelteEditor,
		target: EventTarget | null
	): boolean {
		if (IS_READ_ONLY.get(editor)) {
			return false;
		} else {
			const slateNode = hasTarget(editor, target) && toSlateNode(target);
			return Editor.isVoid(editor, slateNode);
		}
	}

	export function defaultScrollSelectionIntoView(_editor: Editor, domRange: DOMRange) {
		const leafEl = domRange.startContainer.parentElement!;
		const prevGetBoundingClientRect = leafEl.getBoundingClientRect;
		leafEl.getBoundingClientRect = domRange.getBoundingClientRect.bind(domRange);
		scrollIntoView(leafEl, {
			scrollMode: 'if-needed'
		});
		leafEl.getBoundingClientRect = prevGetBoundingClientRect;
	}
</script>

<script lang="ts">
	import {
		Editor,
		Node as SlateNode,
		Element as SlateElement,
		Path,
		Range,
		Transforms
	} from 'slate';
	import { afterUpdate } from 'svelte';
	import { onMount, tick } from 'svelte';
	import { debounce } from 'throttle-debounce';
	import scrollIntoView from 'scroll-into-view-if-needed';
	import { direction } from '../direction';
	import Children from './Children.svelte';
	import DefaultElement from './DefaultElement.svelte';
	import DefaultLeaf from './DefaultLeaf.svelte';
	import DefaultPlaceholder from './DefaultPlaceholder.svelte';
	import { getEditor } from './Slate.svelte';
	import {
		defaultDecorate,
		getDecorateContext,
		getEditorContext,
		getFocusedContext,
		getReadOnlyContext,
		getSelectionContext
	} from './Slate.svelte';
	import {
		HAS_BEFORE_INPUT_SUPPORT,
		IS_CHROME,
		IS_FIREFOX,
		IS_FIREFOX_LEGACY,
		IS_IOS,
		IS_QQBROWSER,
		IS_SAFARI
	} from '../environment';
	import hotkeys from '../hotkeys';
	import { DOMNode, DOMRange, getDefaultView, isDOMElement, isPlainTextOnlyPaste } from '../dom';
	import { isDOMNode } from '../dom';
	import {
		createContext,
		createContextKey,
		findDocumentOrShadowRoot,
		findEventRange,
		findPath,
		focus,
		getFromContext,
		hasDOMNode,
		hasRange,
		isFocused,
		toDOMNode,
		toDOMRange,
		toSlateNode,
		toSlateRange,
		type ISvelteComponent
	} from '../utils';
	import type { ISvelteEditor } from '../withSvelte';
	import {
		EDITOR_TO_ELEMENT,
		EDITOR_TO_WINDOW,
		ELEMENT_TO_NODE,
		IS_FOCUSED,
		IS_READ_ONLY,
		NODE_TO_ELEMENT,
		PLACEHOLDER_SYMBOL
	} from '../weakMaps';
	import type { IElementProps } from './InternalElement.svelte';
	import type { ILeafProps, IPlaceholderProps } from './InternalLeaf.svelte';

	export let Element: ISvelteComponent<IElementProps> = DefaultElement;
	export let Leaf: ISvelteComponent<ILeafProps> = DefaultLeaf;
	export let Placeholder: ISvelteComponent<IPlaceholderProps> = DefaultPlaceholder;
	export let placeholder: string | undefined = undefined;
	export let readOnly = false;
	export let autoFocus = false;
	export let decorate = defaultDecorate;
	export let scrollSelectionIntoView = defaultScrollSelectionIntoView;
	export let ref: HTMLDivElement | undefined = undefined;
	export let spellcheck = true;
	export let autocorrect: string = 'true';
	export let autocapitalize: string = 'true';
	export let onKeyDown: svelteHTML.KeyboardEventHandler<HTMLElement> = () => undefined;

	const ElementContext = createContext(ELEMENT_CONTEXT_KEY, Element);
	const LeafContext = createContext(LEAF_CONTEXT_KEY, Leaf);
	const PlaceholderContext = createContext(PLACEHOLDER_CONTEXT_KEY, Placeholder);

	$: ElementContext.set(Element);
	$: LeafContext.set(Leaf);
	$: PlaceholderContext.set(Placeholder);

	const editor = getEditor();
	const editorContext = getEditorContext();
	const readOnlyContext = getReadOnlyContext();
	const focusedContext = getFocusedContext();
	const decorateContext = getDecorateContext();
	const selectionContext = getSelectionContext();
	const deferredOperations: DeferredOperation[] = [];
	const state: {
		isComposing: boolean;
		hasInsertPrefixInCompositon: boolean;
		updateSelectionTimeoutId: ReturnType<typeof setTimeout> | null;
		isDraggingInternally: boolean;
		latestElement: Element | null;
		readOnly: boolean;
	} = {
		isComposing: false,
		hasInsertPrefixInCompositon: true,
		updateSelectionTimeoutId: null,
		isDraggingInternally: false,
		latestElement: null,
		readOnly
	};

	$: IS_READ_ONLY.set(editor, readOnly);
	$: readOnlyContext.set(readOnly);
	$: state.readOnly = readOnly;
	$: decorateContext.set(decorate);

	let decorations: Range[] = [];
	$: if (
		$editorContext.children.length === 1 &&
		Array.from(SlateNode.texts($editorContext)).length === 1 &&
		SlateNode.string($editorContext) === '' &&
		!state.isComposing
	) {
		const start = Editor.start(editor, []);
		decorations = [
			...decorate([editor, []]),
			{
				[PLACEHOLDER_SYMBOL]: true,
				placeholder,
				anchor: start,
				focus: start
			} as any
		];
	} else if (decorations.length) {
		decorations = decorate([editor, []]);
	}

	let prevAutoFocus: boolean;
	$: if (prevAutoFocus !== autoFocus && ref) {
		if (autoFocus) {
			ref.focus();
		}
		prevAutoFocus = autoFocus;
	}

	function onDOMSelectionChange() {
		if (state.isComposing || state.isDraggingInternally || state.updateSelectionTimeoutId) {
			debouncedOnDOMSelectionChange();
		} else {
			const root = findDocumentOrShadowRoot(editor) as Document;
			const el = toDOMNode(editor, editor);
			const domSelection = root.getSelection();

			if (root.activeElement === el) {
				state.latestElement = root.activeElement;
				IS_FOCUSED.set(editor, true);
				focusedContext.set(true);
			} else {
				IS_FOCUSED.delete(editor);
				focusedContext.set(false);
			}

			if (!domSelection) {
				Transforms.deselect(editor);
				return;
			}

			const anchorNodeSelectable =
				hasEditableTarget(editor, domSelection.anchorNode) ||
				isTargetInsideNonReadonlyVoid(editor, domSelection.anchorNode);

			const focusNodeSelectable =
				hasEditableTarget(editor, domSelection.focusNode) ||
				isTargetInsideNonReadonlyVoid(editor, domSelection.focusNode);

			if (anchorNodeSelectable && focusNodeSelectable) {
				const range = toSlateRange(editor, domSelection, {
					exactMatch: false,
					suppressThrow: true
				});
				if (range) {
					Transforms.select(editor, range);
					return;
				}
			}

			Transforms.deselect(editor);
		}
	}
	const afterFlushOnDOMSelectionChange = () => tick().then(onDOMSelectionChange);
	const debouncedOnDOMSelectionChange = debounce(0, afterFlushOnDOMSelectionChange);

	onMount(() => {
		const window = getDefaultView(ref);
		if (window) {
			EDITOR_TO_WINDOW.set(editor, window);
			window.document.addEventListener('selectionchange', debouncedOnDOMSelectionChange);
		}

		EDITOR_TO_ELEMENT.set(editor, ref as HTMLDivElement);
		NODE_TO_ELEMENT.set(editor, ref as HTMLDivElement);
		ELEMENT_TO_NODE.set(ref as HTMLDivElement, editor);

		return () => {
			EDITOR_TO_ELEMENT.delete(editor);
			NODE_TO_ELEMENT.delete(editor);

			if (window) {
				EDITOR_TO_WINDOW.delete(editor);
				window.document.removeEventListener('selectionchange', debouncedOnDOMSelectionChange);
			}
		};
	});

	function onUpdate() {
		const root = findDocumentOrShadowRoot(editor) as Document;
		const domSelection = root?.getSelection();

		if (state.isComposing || !domSelection || !isFocused(editor)) {
			return;
		}

		const hasDomSelection = domSelection.type !== 'None';

		if (!editor.selection && !hasDomSelection) {
			return;
		}

		const editorElement = EDITOR_TO_ELEMENT.get(editor)!;
		let hasDomSelectionInEditor = false;
		if (
			editorElement.contains(domSelection.anchorNode) &&
			editorElement.contains(domSelection.focusNode)
		) {
			hasDomSelectionInEditor = true;
		}

		if (hasDomSelection && hasDomSelectionInEditor && editor.selection) {
			const slateRange = toSlateRange(editor, domSelection, {
				exactMatch: true,
				suppressThrow: true
			});
			if (slateRange && Range.equals(slateRange, editor.selection)) {
				return;
			}
		}

		if (editor.selection && !hasRange(editor, editor.selection)) {
			editor.selection = toSlateRange(editor, domSelection, {
				exactMatch: false,
				suppressThrow: false
			});
			selectionContext.set(editor.selection);
			return;
		}

		const newDomRange =
			editor.selection && hasDomSelectionInEditor && toDOMRange(editor, editor.selection);

		if (newDomRange) {
			if (Range.isBackward(editor.selection!)) {
				domSelection.setBaseAndExtent(
					newDomRange.endContainer,
					newDomRange.endOffset,
					newDomRange.startContainer,
					newDomRange.startOffset
				);
			} else {
				domSelection.setBaseAndExtent(
					newDomRange.startContainer,
					newDomRange.startOffset,
					newDomRange.endContainer,
					newDomRange.endOffset
				);
			}
			scrollSelectionIntoView(editor, newDomRange);
		} else {
			domSelection.removeAllRanges();
		}

		if (state.updateSelectionTimeoutId) {
			clearTimeout(state.updateSelectionTimeoutId);
		}
		let timeoutId: number = setTimeout(() => {
			if (newDomRange && IS_FIREFOX) {
				const el = toDOMNode(editor, editor);
				el.focus();
			}
			Object.assign(state, {
				updateSelectionTimeoutId: null
			});
		}) as any;

		Object.assign(state, {
			updateSelectionTimeoutId: timeoutId
		});
	}
	afterUpdate(() => tick().then(onUpdate));

	function onBeforeInput(event: InputEvent) {
		if (!state.readOnly && hasEditableTarget(editor, event.target)) {
			const type = event.inputType;
			const data = (event as any).dataTransfer || event.data || undefined;

			if (type === 'insertCompositionText' || type === 'deleteCompositionText') {
				return;
			}

			let native = false;
			if (
				type === 'insertText' &&
				editor.selection &&
				Range.isCollapsed(editor.selection) &&
				event.data &&
				event.data.length === 1 &&
				/[a-z ]/i.test(event.data) &&
				editor.selection.anchor.offset !== 0
			) {
				native = true;

				if (editor.marks) {
					native = false;
				}

				const inline = Editor.above(editor, {
					at: editor.selection.anchor,
					match: (n) => Editor.isInline(editor, n),
					mode: 'highest'
				});
				if (inline) {
					const [, inlinePath] = inline;

					if (Editor.isEnd(editor, editor.selection.anchor, inlinePath)) {
						native = false;
					}
				}
			}

			if (!native) {
				event.preventDefault();
			}

			if (!type.startsWith('delete') || type.startsWith('deleteBy')) {
				const [targetRange] = (event as any).getTargetRanges();

				if (targetRange) {
					const range = toSlateRange(editor, targetRange, {
						exactMatch: false,
						suppressThrow: false
					});

					if (!editor.selection || !Range.equals(editor.selection, range)) {
						Transforms.select(editor, range);
					}
				}
			}

			if (editor.selection && Range.isExpanded(editor.selection) && type.startsWith('delete')) {
				const direction = type.endsWith('Backward') ? 'backward' : 'forward';
				Editor.deleteFragment(editor, { direction });
				return;
			}

			switch (type) {
				case 'deleteByComposition':
				case 'deleteByCut':
				case 'deleteByDrag': {
					Editor.deleteFragment(editor);
					break;
				}

				case 'deleteContent':
				case 'deleteContentForward': {
					Editor.deleteForward(editor);
					break;
				}

				case 'deleteContentBackward': {
					Editor.deleteBackward(editor);
					break;
				}

				case 'deleteEntireSoftLine': {
					Editor.deleteBackward(editor, { unit: 'line' });
					Editor.deleteForward(editor, { unit: 'line' });
					break;
				}

				case 'deleteHardLineBackward': {
					Editor.deleteBackward(editor, { unit: 'block' });
					break;
				}

				case 'deleteSoftLineBackward': {
					Editor.deleteBackward(editor, { unit: 'line' });
					break;
				}

				case 'deleteHardLineForward': {
					Editor.deleteForward(editor, { unit: 'block' });
					break;
				}

				case 'deleteSoftLineForward': {
					Editor.deleteForward(editor, { unit: 'line' });
					break;
				}

				case 'deleteWordBackward': {
					Editor.deleteBackward(editor, { unit: 'word' });
					break;
				}

				case 'deleteWordForward': {
					Editor.deleteForward(editor, { unit: 'word' });
					break;
				}

				case 'insertLineBreak': {
					Editor.insertSoftBreak(editor);
					break;
				}
				case 'insertParagraph': {
					Editor.insertBreak(editor);
					break;
				}

				case 'insertFromComposition':
				case 'insertFromDrop':
				case 'insertFromPaste':
				case 'insertFromYank':
				case 'insertReplacementText':
				case 'insertText': {
					if (editor.selection) {
						if (Range.isExpanded(editor.selection)) {
							Editor.deleteFragment(editor);
						}
					}

					if (type === 'insertFromComposition') {
						if (state.isComposing) {
							state.isComposing = false;
						}
					}
					if (data?.constructor.name === 'DataTransfer') {
						editor.insertData(data);
					} else if (typeof data === 'string') {
						if (native) {
							deferredOperations.push(() => Editor.insertText(editor, data));
						} else {
							Editor.insertText(editor, data);
						}
					}
					break;
				}
			}
		}
	}

	function onInput(_event: Event) {
		for (const op of deferredOperations) {
			op();
		}
		deferredOperations.length = 0;
	}

	function onKeyDownInternal(event: KeyboardEvent & { currentTarget: EventTarget & HTMLElement }) {
		if (!state.readOnly && !state.isComposing && hasEditableTarget(editor, event.target)) {
			const element =
				editor.children[editor.selection !== null ? editor.selection.focus.path[0] : 0];
			const isRTL = direction(SlateNode.string(element)) === 'rtl';

			if (hotkeys.isRedo(event)) {
				event.preventDefault();
				const maybeHistoryEditor: any = editor;

				if (typeof maybeHistoryEditor.redo === 'function') {
					maybeHistoryEditor.redo();
				}
			} else if (hotkeys.isUndo(event)) {
				event.preventDefault();
				const maybeHistoryEditor: any = editor;

				if (typeof maybeHistoryEditor.undo === 'function') {
					maybeHistoryEditor.undo();
				}
			} else if (hotkeys.isMoveLineBackward(event)) {
				event.preventDefault();
				Transforms.move(editor, { unit: 'line', reverse: true });
			} else if (hotkeys.isMoveLineForward(event)) {
				event.preventDefault();
				Transforms.move(editor, { unit: 'line' });
			} else if (hotkeys.isExtendLineBackward(event)) {
				event.preventDefault();
				Transforms.move(editor, {
					unit: 'line',
					edge: 'focus',
					reverse: true
				});
			} else if (hotkeys.isExtendLineForward(event)) {
				event.preventDefault();
				Transforms.move(editor, { unit: 'line', edge: 'focus' });
			} else if (hotkeys.isMoveBackward(event)) {
				event.preventDefault();

				if (editor.selection && Range.isCollapsed(editor.selection)) {
					Transforms.move(editor, { reverse: !isRTL });
				} else {
					Transforms.collapse(editor, { edge: 'start' });
				}
			} else if (hotkeys.isMoveForward(event)) {
				event.preventDefault();

				if (editor.selection && Range.isCollapsed(editor.selection)) {
					Transforms.move(editor, { reverse: isRTL });
				} else {
					Transforms.collapse(editor, { edge: 'end' });
				}
			} else if (hotkeys.isMoveWordBackward(event)) {
				event.preventDefault();

				if (editor.selection && Range.isExpanded(editor.selection)) {
					Transforms.collapse(editor, { edge: 'focus' });
				}

				Transforms.move(editor, { unit: 'word', reverse: !isRTL });
			} else if (hotkeys.isMoveWordForward(event)) {
				event.preventDefault();

				if (editor.selection && Range.isExpanded(editor.selection)) {
					Transforms.collapse(editor, { edge: 'focus' });
				}

				Transforms.move(editor, { unit: 'word', reverse: isRTL });
			} else if (!HAS_BEFORE_INPUT_SUPPORT) {
				if (
					hotkeys.isBold(event) ||
					hotkeys.isItalic(event) ||
					hotkeys.isTransposeCharacter(event)
				) {
					event.preventDefault();
				} else if (hotkeys.isSplitBlock(event)) {
					event.preventDefault();
					Editor.insertBreak(editor);
				} else if (hotkeys.isDeleteBackward(event)) {
					event.preventDefault();

					if (editor.selection && Range.isExpanded(editor.selection)) {
						Editor.deleteFragment(editor, { direction: 'backward' });
					} else {
						Editor.deleteBackward(editor);
					}
				} else if (hotkeys.isDeleteForward(event)) {
					event.preventDefault();

					if (editor.selection && Range.isExpanded(editor.selection)) {
						Editor.deleteFragment(editor, { direction: 'forward' });
					} else {
						Editor.deleteForward(editor);
					}
				} else if (hotkeys.isDeleteLineBackward(event)) {
					event.preventDefault();

					if (editor.selection && Range.isExpanded(editor.selection)) {
						Editor.deleteFragment(editor, { direction: 'backward' });
					} else {
						Editor.deleteBackward(editor, { unit: 'line' });
					}
				} else if (hotkeys.isDeleteLineForward(event)) {
					event.preventDefault();

					if (editor.selection && Range.isExpanded(editor.selection)) {
						Editor.deleteFragment(editor, { direction: 'forward' });
					} else {
						Editor.deleteForward(editor, { unit: 'line' });
					}
				} else if (hotkeys.isDeleteWordBackward(event)) {
					event.preventDefault();

					if (editor.selection && Range.isExpanded(editor.selection)) {
						Editor.deleteFragment(editor, { direction: 'backward' });
					} else {
						Editor.deleteBackward(editor, { unit: 'word' });
					}
				} else if (hotkeys.isDeleteWordForward(event)) {
					event.preventDefault();

					if (editor.selection && Range.isExpanded(editor.selection)) {
						Editor.deleteFragment(editor, { direction: 'forward' });
					} else {
						Editor.deleteForward(editor, { unit: 'word' });
					}
				}
				return onKeyDown(event);
			} else {
				if (IS_CHROME || IS_SAFARI) {
					if (
						editor.selection &&
						(hotkeys.isDeleteBackward(event) || hotkeys.isDeleteForward(event)) &&
						Range.isCollapsed(editor.selection)
					) {
						const currentNode = SlateNode.parent(editor, editor.selection.anchor.path);

						if (
							SlateElement.isElement(currentNode) &&
							Editor.isVoid(editor, currentNode) &&
							Editor.isInline(editor, currentNode)
						) {
							event.preventDefault();
							Editor.deleteBackward(editor, { unit: 'block' });
							return;
						}
					}
				}
				return onKeyDown(event);
			}
		}
	}

	function onFocus(event: FocusEvent) {
		if (
			!state.readOnly &&
			!state.updateSelectionTimeoutId &&
			hasEditableTarget(editor, event.target)
		) {
			const el = toDOMNode(editor, editor);
			const root = findDocumentOrShadowRoot(editor);

			state.latestElement = root.activeElement;

			if (IS_FIREFOX && event.target !== el) {
				el.focus();
				return;
			}

			IS_FOCUSED.set(editor, true);
			focusedContext.set(true);
		}
	}

	function onBlur(event: FocusEvent) {
		if (
			state.readOnly ||
			state.updateSelectionTimeoutId ||
			!hasEditableTarget(editor, event.target)
		) {
			return;
		}

		const root = findDocumentOrShadowRoot(editor);
		if (state.latestElement === root.activeElement) {
			return;
		}

		const relatedTarget = event.relatedTarget;
		const el = toDOMNode(editor, editor);

		if (relatedTarget === el) {
			return;
		}

		if (isDOMElement(relatedTarget) && relatedTarget.hasAttribute('data-slate-spacer')) {
			return;
		}

		if (relatedTarget != null && isDOMNode(relatedTarget) && hasDOMNode(editor, relatedTarget)) {
			const node = toSlateNode(relatedTarget);

			if (SlateElement.isElement(node) && !editor.isVoid(node)) {
				return;
			}
		}

		if (IS_SAFARI) {
			const domSelection = (root as Document).getSelection();
			domSelection?.removeAllRanges();
		}

		IS_FOCUSED.delete(editor);
		focusedContext.set(false);
	}

	function onClick(event: Event) {
		if (!state.readOnly && hasTarget(editor, event.target) && isDOMNode(event.target)) {
			const node = toSlateNode(event.target);
			const path = findPath(node);

			if (Editor.hasPath(editor, path)) {
				const lookupNode = SlateNode.get(editor, path);

				if (lookupNode === node) {
					const start = Editor.start(editor, path);
					const end = Editor.end(editor, path);

					const startVoid = Editor.void(editor, { at: start });
					const endVoid = Editor.void(editor, { at: end });

					if (startVoid && endVoid && Path.equals(startVoid[1], endVoid[1])) {
						const range = Editor.range(editor, start);
						Transforms.select(editor, range);
					}
				}
			}
		}
	}

	function onCompositionEnd(event: Event) {
		if (hasEditableTarget(editor, event.target)) {
			state.isComposing = false;
			const eventData = (event as any).data;

			if (!IS_SAFARI && !IS_FIREFOX_LEGACY && !IS_IOS && !IS_QQBROWSER && eventData) {
				Editor.insertText(editor, eventData);
			}

			if (editor.selection && Range.isCollapsed(editor.selection)) {
				const leafPath = editor.selection.anchor.path;
				const currentTextNode = SlateNode.leaf(editor, leafPath);
				if (state.hasInsertPrefixInCompositon) {
					state.hasInsertPrefixInCompositon = false;
					Editor.withoutNormalizing(editor, () => {
						const text = currentTextNode.text.replace(/^\uFEFF/, '');
						Transforms.delete(editor, {
							distance: currentTextNode.text.length,
							reverse: true
						});
						Transforms.insertText(editor, text);
					});
				}
			}
		}
	}

	function onCompositionUpdate(event: Event) {
		if (hasEditableTarget(editor, event.target)) {
			state.isComposing = true;
		}
	}

	function onCompositionStart(event: Event) {
		if (hasEditableTarget(editor, event.target)) {
			if (editor.selection) {
				if (Range.isExpanded(editor.selection)) {
					Editor.deleteFragment(editor);
					return;
				}
				const inline = Editor.above(editor, {
					match: (n) => Editor.isInline(editor, n),
					mode: 'highest'
				});
				if (inline) {
					const [, inlinePath] = inline;
					if (Editor.isEnd(editor, editor.selection.anchor, inlinePath)) {
						const point = Editor.after(editor, inlinePath)!;
						Transforms.setSelection(editor, {
							anchor: point,
							focus: point
						});
					}
				}
				if (editor.marks) {
					state.hasInsertPrefixInCompositon = true;
					Transforms.insertNodes(
						editor,
						{
							text: '\uFEFF',
							...editor.marks
						},
						{
							select: true
						}
					);
				}
			}
		}
	}

	function onPaste(event: ClipboardEvent) {
		if (!state.readOnly && hasEditableTarget(editor, event.target)) {
			if (!HAS_BEFORE_INPUT_SUPPORT || isPlainTextOnlyPaste(event)) {
				event.preventDefault();
				if (event.clipboardData) {
					editor.insertData(event.clipboardData);
				}
			}
		}
	}

	function onCopy(event: ClipboardEvent) {
		if (hasEditableTarget(editor, event.target)) {
			event.preventDefault();
			editor.setFragmentData((event as any).clipboardData);
		}
	}

	function onCut(event: ClipboardEvent) {
		if (!state.readOnly && hasEditableTarget(editor, event.target)) {
			event.preventDefault();
			editor.setFragmentData((event as any).clipboardData);

			if (editor.selection) {
				if (Range.isExpanded(editor.selection)) {
					Editor.deleteFragment(editor);
				} else {
					const node = SlateNode.parent(editor, editor.selection.anchor.path);
					if (Editor.isVoid(editor, node)) {
						Transforms.delete(editor);
					}
				}
			}
		}
	}

	function onDragOver(event: Event) {
		if (hasTarget(editor, event.target)) {
			const node = toSlateNode(event.target);

			if (Editor.isVoid(editor, node)) {
				event.preventDefault();
			}
		}
	}

	function onDragStart(event: Event) {
		if (!state.readOnly && hasTarget(editor, event.target)) {
			const node = toSlateNode(event.target);
			const path = findPath(node);
			const voidMatch =
				Editor.isVoid(editor, node) || Editor.void(editor, { at: path, voids: true });

			if (voidMatch) {
				const range = Editor.range(editor, path);
				Transforms.select(editor, range);
			}

			state.isDraggingInternally = true;

			editor.setFragmentData((event as any).dataTransfer);
		}
	}

	function onDrop(event: DragEvent) {
		if (!state.readOnly && hasTarget(editor, event.target)) {
			event.preventDefault();

			const draggedRange = editor.selection;
			const range = findEventRange(editor, event);
			const data = (event as any).dataTransfer;

			Transforms.select(editor, range);

			if (state.isDraggingInternally) {
				if (
					draggedRange &&
					!Range.equals(draggedRange, range) &&
					!Editor.void(editor, { at: range, voids: true })
				) {
					Transforms.delete(editor, {
						at: draggedRange
					});
				}

				state.isDraggingInternally = false;
			}

			editor.insertData(data);

			if (!isFocused(editor)) {
				focus(editor);
			}
		}
	}

	function onDragEnd(event: Event) {
		if (!state.readOnly && state.isDraggingInternally && hasTarget(editor, event.target)) {
			state.isDraggingInternally = false;
		}
	}
</script>

<div
	{...$$restProps}
	bind:this={ref}
	role={state.readOnly ? undefined : 'textbox'}
	{spellcheck}
	{autocorrect}
	{autocapitalize}
	data-svelte-editor
	data-slate-node="value"
	contenteditable={!state.readOnly}
	z-index={-1}
	on:beforeinput={onBeforeInput}
	on:keydown={onKeyDownInternal}
	on:input={onInput}
	on:focus={onFocus}
	on:blur={onBlur}
	on:click={onClick}
	on:compositionend={onCompositionEnd}
	on:compositionupdate={onCompositionUpdate}
	on:compositionstart={onCompositionStart}
	on:paste={onPaste}
	on:copy={onCopy}
	on:cut={onCut}
	on:dragover={onDragOver}
	on:dragstart={onDragStart}
	on:drop={onDrop}
	on:dragend={onDragEnd}
>
	<Children node={$editorContext} selection={$selectionContext} {decorations} />
</div>

<style>
	div {
		position: relative;
		outline: none;
		word-wrap: break-word;
		white-space: pre-wrap;
	}
</style>
