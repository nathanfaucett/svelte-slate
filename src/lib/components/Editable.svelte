<script lang="ts" context="module">
	import scrollIntoView from 'scroll-into-view-if-needed';

	type DeferredOperation = () => void;

	export function hasTarget(editor: SvelteEditor, target: EventTarget | null): target is Node {
		return isDOMNode(target) && hasDOMNode(editor, target);
	}

	export function hasEditableTarget(
		editor: SvelteEditor,
		target: EventTarget | null
	): target is DOMNode {
		return isDOMNode(target) && hasDOMNode(editor, target, { editable: true });
	}

	export function isTargetInsideNonReadonlyVoid(
		editor: SvelteEditor,
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
	import { onMount, SvelteComponent, tick } from 'svelte';
	import { afterUpdate } from 'svelte';
	import * as direction from 'direction';
	import { throttle } from 'throttle-debounce';
	import Children from './Children.svelte';
	import DefaultElement from './DefaultElement.svelte';
	import DefaultLeaf from './DefaultLeaf.svelte';
	import DefaultPlaceholder from './DefaultPlaceholder.svelte';
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
		findDocumentOrShadowRoot,
		findEventRange,
		findPath,
		focus,
		hasDOMNode,
		hasRange,
		isFocused,
		toDOMNode,
		toDOMRange,
		toSlateNode,
		toSlateRange
	} from '../utils';
	import type { SvelteEditor } from '../withSvelte';
	import {
		EDITOR_TO_ELEMENT,
		EDITOR_TO_WINDOW,
		ELEMENT_TO_NODE,
		IS_FOCUSED,
		IS_READ_ONLY,
		NODE_TO_ELEMENT,
		PLACEHOLDER_SYMBOL
	} from '../weakMaps';

	export let Element: typeof SvelteComponent = DefaultElement;
	export let Leaf: typeof SvelteComponent = DefaultLeaf;
	export let Placeholder: typeof SvelteComponent = DefaultPlaceholder;
	export let placeholder: string | undefined;
	export let readOnly = false;
	export let autoFocus = false;
	export let decorate = defaultDecorate;
	export let scrollSelectionIntoView = defaultScrollSelectionIntoView;
	export let ref: HTMLDivElement = undefined;
	export let onKeyDown: (event: KeyboardEvent) => void | false = () => undefined;

	const editorContext = getEditorContext();
	const readOnlyContext = getReadOnlyContext();
	const focusedContext = getFocusedContext();
	const decorateContext = getDecorateContext();
	const selectionContext = getSelectionContext();
	$: editor = $editorContext;
	$: selection = $selectionContext;

	const state = {
		isComposing: false,
		hasInsertPrefixInCompositon: true,
		isUpdatingSelection: false,
		isDraggingInternally: false,
		latestElement: null as Element
	};

	$: decorations = decorate([editor, []]);
	$: IS_READ_ONLY.set(editor, readOnly);
	$: readOnlyContext.set(readOnly);
	$: decorateContext.set(decorate);

	$: if (
		editor.children.length === 1 &&
		Array.from(SlateNode.texts(editor)).length === 1 &&
		SlateNode.string(editor) === '' &&
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
	}

	let deferredOperations: DeferredOperation[] = [];
	let prevAutoFocus: boolean;
	$: if (prevAutoFocus !== autoFocus && ref) {
		if (autoFocus) {
			ref.focus();
		}
		prevAutoFocus = autoFocus;
	}

	function scheduleOnDOMSelectionChange() {
		onDOMSelectionChange();
	}

	onMount(() => {
		const window = getDefaultView(ref);
		if (window) {
			EDITOR_TO_WINDOW.set(editor, window);
			window.document.addEventListener('selectionchange', scheduleOnDOMSelectionChange);
		}

		EDITOR_TO_ELEMENT.set(editor, ref);
		NODE_TO_ELEMENT.set(editor, ref);
		ELEMENT_TO_NODE.set(ref, editor);

		return () => {
			EDITOR_TO_ELEMENT.delete(editor);
			NODE_TO_ELEMENT.delete(editor);

			if (window) {
				EDITOR_TO_WINDOW.delete(editor);
				window.document.removeEventListener('selectionchange', scheduleOnDOMSelectionChange);
			}
		};
	});

	afterUpdate(async () => {
		const root = findDocumentOrShadowRoot(editor);
		const domSelection = root ? (root as Document).getSelection() : null;

		if (state.isComposing || !domSelection || !isFocused(editor)) {
			return;
		}

		const hasDomSelection = domSelection.type !== 'None';

		if (!hasDomSelection) {
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

		if (hasDomSelection && hasDomSelectionInEditor && selection) {
			const slateRange = toSlateRange(editor, domSelection, {
				exactMatch: true,

				suppressThrow: true
			});
			if (slateRange && Range.equals(slateRange, selection)) {
				return;
			}
		}

		if (selection && !hasRange(editor, selection)) {
			editor.selection = toSlateRange(editor, domSelection, {
				exactMatch: false,
				suppressThrow: false
			});
			selection = editor.selection;
			selectionContext.set(selection);
			return;
		}

		state.isUpdatingSelection = true;
		await tick();

		const newDomRange = selection && toDOMRange(editor, selection);

		if (newDomRange) {
			if (Range.isBackward(selection!)) {
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

		if (newDomRange && IS_FIREFOX) {
			const el = toDOMNode(editor, editor);
			el.focus();
		}
		state.isUpdatingSelection = false;
	});

	$: onDOMSelectionChange = throttle(100, () => {
		if (!state.isComposing && !state.isUpdatingSelection && !state.isDraggingInternally) {
			const root = findDocumentOrShadowRoot(editor);
			const { activeElement } = root;
			const el = toDOMNode(editor, editor);
			const domSelection = (root as Document).getSelection();

			if (activeElement === el) {
				state.latestElement = activeElement;
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

			const anchorNode = domSelection.anchorNode;
			const focusNode = domSelection.focusNode;

			const anchorNodeSelectable =
				hasEditableTarget(editor, anchorNode) || isTargetInsideNonReadonlyVoid(editor, anchorNode);

			const focusNodeSelectable =
				hasEditableTarget(editor, focusNode) || isTargetInsideNonReadonlyVoid(editor, focusNode);

			if (anchorNodeSelectable && focusNodeSelectable) {
				const range = toSlateRange(editor, domSelection, {
					exactMatch: false,
					suppressThrow: true
				});
				Transforms.select(editor, range);
			}
		}
	});

	$: onBeforeInput = (event: InputEvent) => {
		if (!readOnly && hasEditableTarget(editor, event.target)) {
			const type = event.inputType;
			const data = (event as any).dataTransfer || event.data || undefined;

			if (type === 'insertCompositionText' || type === 'deleteCompositionText') {
				return;
			}

			let native = false;
			if (
				type === 'insertText' &&
				selection &&
				Range.isCollapsed(selection) &&
				event.data &&
				event.data.length === 1 &&
				/[a-z ]/i.test(event.data) &&
				selection.anchor.offset !== 0
			) {
				native = true;

				if (editor.marks) {
					native = false;
				}

				const inline = Editor.above(editor, {
					at: selection.anchor,
					match: (n) => Editor.isInline(editor, n),
					mode: 'highest'
				});
				if (inline) {
					const [, inlinePath] = inline;

					if (Editor.isEnd(editor, selection.anchor, inlinePath)) {
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

					if (!selection || !Range.equals(selection, range)) {
						Transforms.select(editor, range);
					}
				}
			}

			if (selection && Range.isExpanded(selection) && type.startsWith('delete')) {
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

				case 'insertLineBreak':
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
	};

	$: onInput = (_event: Event) => {
		for (const op of deferredOperations) {
			op();
		}
		deferredOperations.length = 0;
	};

	$: onKeyDownInternal = (event: KeyboardEvent) => {
		if (!readOnly && !state.isComposing && hasEditableTarget(editor, event.target)) {
			const element = editor.children[selection !== null ? selection.focus.path[0] : 0];
			const isRTL = direction.direction(SlateNode.string(element)) === 'rtl';

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

				if (selection && Range.isCollapsed(selection)) {
					Transforms.move(editor, { reverse: !isRTL });
				} else {
					Transforms.collapse(editor, { edge: 'start' });
				}
			} else if (hotkeys.isMoveForward(event)) {
				event.preventDefault();

				if (selection && Range.isCollapsed(selection)) {
					Transforms.move(editor, { reverse: isRTL });
				} else {
					Transforms.collapse(editor, { edge: 'end' });
				}
			} else if (hotkeys.isMoveWordBackward(event)) {
				event.preventDefault();

				if (selection && Range.isExpanded(selection)) {
					Transforms.collapse(editor, { edge: 'focus' });
				}

				Transforms.move(editor, { unit: 'word', reverse: !isRTL });
			} else if (hotkeys.isMoveWordForward(event)) {
				event.preventDefault();

				if (selection && Range.isExpanded(selection)) {
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

					if (selection && Range.isExpanded(selection)) {
						Editor.deleteFragment(editor, { direction: 'backward' });
					} else {
						Editor.deleteBackward(editor);
					}
				} else if (hotkeys.isDeleteForward(event)) {
					event.preventDefault();

					if (selection && Range.isExpanded(selection)) {
						Editor.deleteFragment(editor, { direction: 'forward' });
					} else {
						Editor.deleteForward(editor);
					}
				} else if (hotkeys.isDeleteLineBackward(event)) {
					event.preventDefault();

					if (selection && Range.isExpanded(selection)) {
						Editor.deleteFragment(editor, { direction: 'backward' });
					} else {
						Editor.deleteBackward(editor, { unit: 'line' });
					}
				} else if (hotkeys.isDeleteLineForward(event)) {
					event.preventDefault();

					if (selection && Range.isExpanded(selection)) {
						Editor.deleteFragment(editor, { direction: 'forward' });
					} else {
						Editor.deleteForward(editor, { unit: 'line' });
					}
				} else if (hotkeys.isDeleteWordBackward(event)) {
					event.preventDefault();

					if (selection && Range.isExpanded(selection)) {
						Editor.deleteFragment(editor, { direction: 'backward' });
					} else {
						Editor.deleteBackward(editor, { unit: 'word' });
					}
				} else if (hotkeys.isDeleteWordForward(event)) {
					event.preventDefault();

					if (selection && Range.isExpanded(selection)) {
						Editor.deleteFragment(editor, { direction: 'forward' });
					} else {
						Editor.deleteForward(editor, { unit: 'word' });
					}
				}
			} else {
				if (IS_CHROME || IS_SAFARI) {
					if (
						selection &&
						(hotkeys.isDeleteBackward(event) || hotkeys.isDeleteForward(event)) &&
						Range.isCollapsed(selection)
					) {
						const currentNode = SlateNode.parent(editor, selection.anchor.path);

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
	};

	$: onFocus = (event: FocusEvent) => {
		if (!readOnly && !state.isUpdatingSelection && hasEditableTarget(editor, event.target)) {
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
	};

	$: onBlur = (event: FocusEvent) => {
		if (readOnly || state.isUpdatingSelection || !hasEditableTarget(editor, event.target)) {
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
	};

	$: onClick = (event: Event) => {
		if (!readOnly && hasTarget(editor, event.target) && isDOMNode(event.target)) {
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
	};

	$: onCompositionEnd = (event: Event) => {
		if (hasEditableTarget(editor, event.target)) {
			state.isComposing = false;
			const eventData = (event as any).data;

			if (!IS_SAFARI && !IS_FIREFOX_LEGACY && !IS_IOS && !IS_QQBROWSER && eventData) {
				Editor.insertText(editor, eventData);
			}

			if (selection && Range.isCollapsed(selection)) {
				const leafPath = selection.anchor.path;
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
	};

	$: onCompositionUpdate = (event: Event) => {
		if (hasEditableTarget(editor, event.target)) {
			state.isComposing = true;
		}
	};

	$: onCompositionStart = (event: Event) => {
		if (hasEditableTarget(editor, event.target)) {
			const { selection, marks } = editor;
			if (selection) {
				if (Range.isExpanded(selection)) {
					Editor.deleteFragment(editor);
					return;
				}
				const inline = Editor.above(editor, {
					match: (n) => Editor.isInline(editor, n),
					mode: 'highest'
				});
				if (inline) {
					const [, inlinePath] = inline;
					if (Editor.isEnd(editor, selection.anchor, inlinePath)) {
						const point = Editor.after(editor, inlinePath)!;
						Transforms.setSelection(editor, {
							anchor: point,
							focus: point
						});
					}
				}
				if (marks) {
					state.hasInsertPrefixInCompositon = true;
					Transforms.insertNodes(
						editor,
						{
							text: '\uFEFF',
							...marks
						},
						{
							select: true
						}
					);
				}
			}
		}
	};

	$: onPaste = (event: ClipboardEvent) => {
		if (!readOnly && hasEditableTarget(editor, event.target)) {
			if (!HAS_BEFORE_INPUT_SUPPORT || isPlainTextOnlyPaste(event)) {
				event.preventDefault();
				editor.insertData(event.clipboardData);
			}
		}
	};

	$: onCopy = (event: ClipboardEvent) => {
		if (hasEditableTarget(editor, event.target)) {
			event.preventDefault();
			editor.setFragmentData((event as any).clipboardData);
		}
	};

	$: onCut = (event: ClipboardEvent) => {
		if (!readOnly && hasEditableTarget(editor, event.target)) {
			event.preventDefault();
			editor.setFragmentData((event as any).clipboardData);

			if (selection) {
				if (Range.isExpanded(selection)) {
					Editor.deleteFragment(editor);
				} else {
					const node = SlateNode.parent(editor, selection.anchor.path);
					if (Editor.isVoid(editor, node)) {
						Transforms.delete(editor);
					}
				}
			}
		}
	};

	$: onDragOver = (event: Event) => {
		if (hasTarget(editor, event.target)) {
			const node = toSlateNode(event.target);

			if (Editor.isVoid(editor, node)) {
				event.preventDefault();
			}
		}
	};

	$: onDragStart = (event: Event) => {
		if (!readOnly && hasTarget(editor, event.target)) {
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
	};

	$: onDrop = (event: DragEvent) => {
		if (!readOnly && hasTarget(editor, event.target)) {
			event.preventDefault();

			const draggedRange = selection;
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
	};

	$: onDragEnd = (event: Event) => {
		if (!readOnly && state.isDraggingInternally && hasTarget(editor, event.target)) {
			state.isDraggingInternally = false;
		}
	};
</script>

<div
	{...$$restProps}
	bind:this={ref}
	role={readOnly ? undefined : 'textbox'}
	spellcheck={$$restProps.spellcheck || 'true'}
	autocorrect={$$restProps.autocorrect || 'true'}
	autocapitalize={$$restProps.autocapitalize || 'true'}
	data-svelte-editor
	data-slate-node="value"
	contenteditable={!readOnly}
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
	<Children node={editor} {selection} {decorations} {Element} {Leaf} {Placeholder} />
</div>

<style>
	div {
		position: relative;
		outline: none;
		word-wrap: break-word;
		white-space: pre-wrap;
	}
</style>
