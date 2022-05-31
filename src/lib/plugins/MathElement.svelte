<svelte:options immutable />

<script lang="ts" context="module">
	import 'katex/dist/katex.min.css';
	import type { IElement } from './Element.svelte';

	export const MATH_TYPE: string = 'math';

	export interface IMathElement extends IElement {
		type: 'math';
		math: string;
		inline: boolean;
	}

	export function isMathElement(element: IElement): element is IMathElement {
		return element.type === MATH_TYPE;
	}

	export function withMath<T extends ISvelteEditor = ISvelteEditor>(editor: T): T {
		const { isVoid, isInline, insertBreak } = editor;

		editor.isInline = (element) =>
			isMathElement(element as IElement) ? !!element['inline'] : isInline(element);

		editor.isVoid = (element) => (isMathElement(element as IElement) ? true : isVoid(element));

		editor.insertBreak = () => {
			if (!editor.selection || !Range.isCollapsed(editor.selection)) {
				insertBreak();
			} else {
				if (Editor.isVoid(editor, Node.get(editor, Path.parent(editor.selection.anchor.path)))) {
					Editor.insertNode(editor, {
						type: PARAGRAPH_TYPE,
						children: [{ text: '' }]
					} as any);
				} else {
					insertBreak();
				}
			}
		};

		return editor;
	}

	export function insertMath(editor: Editor, math: string, inline: boolean, at?: Location) {
		const node = { type: MATH_TYPE, math, inline, children: [{ text: '' }] };
		if (inline) {
			Editor.withoutNormalizing(editor, () => {
				Transforms.insertNodes(editor, node, { at });
			});
		} else {
			Transforms.insertNodes(editor, node, { at });
		}
	}
</script>

<script lang="ts">
	import {
		isReadOnly,
		findPath,
		getEditor,
		getSelectedContext,
		getFocusedContext,
		getReadOnlyContext,
		type ISvelteEditor
	} from 'svelte-slate';
	import { Editor, Location, Range, Node, Path, Transforms } from 'slate';
	import katex from 'katex';
	import MathEditor from './MathEditor.svelte';
	import { PARAGRAPH_TYPE } from './ParagraphElement.svelte';
	import MdEdit from 'svelte-icons/md/MdEdit.svelte';
	import { setSelection } from './utils';

	export let element: IMathElement;
	export let isInline: boolean;
	export let isVoid: boolean;
	export let contenteditable: boolean;
	export let ref: HTMLElement = undefined;
	export let dir: 'rtl' | 'ltr' = undefined;

	const editor = getEditor();
	const selectedContext = getSelectedContext();
	const focusedContext = getFocusedContext();
	const readOnlyContext = getReadOnlyContext();

	$: readOnly = $readOnlyContext;
	$: selected = readOnly ? false : $selectedContext && $focusedContext;
	$: path = findPath(element);
	let currentMath = element.math;
	$: if (currentMath !== element.math) {
		currentMath = element.math;
	}
	let currentInline = element.inline;
	$: if (currentInline !== element.inline) {
		currentInline = element.inline;
	}

	let open = false;
	function onDone(math: string, inline: boolean) {
		if (element.inline !== inline) {
			onDelete();
			const node = { type: 'math', math, inline, children: [{ text: '' }] };
			if (inline) {
				Transforms.insertNodes(
					editor,
					{
						type: PARAGRAPH_TYPE,
						children: [node]
					} as any,
					{ at: path }
				);
			} else {
				Transforms.insertNodes(editor, node, { at: path.slice(0, -1) });
			}
		} else {
			Transforms.setNodes(editor, { math, inline } as any, { at: path });
			open = false;
		}
	}
	function onDelete() {
		open = false;
		Transforms.delete(editor, { at: path });
	}

	let mathEditElement: HTMLElement;
	let math = currentMath;
	let inline = currentInline;
	function onEdit() {
		if (!isReadOnly(editor)) {
			math = currentMath;
			inline = currentInline;
			setSelection(mathEditElement);
			open = true;
		}
	}

	let mathElement: HTMLElement;
	$: if (mathElement) {
		katex.render(currentMath, mathElement, {
			displayMode: !currentInline,
			output: 'html',
			throwOnError: false
		});
	}
</script>

<MathEditor container={ref} bind:open bind:math bind:inline {onDone} {onDelete} />

<div
	class="math-element"
	class:math-inline={currentInline}
	bind:this={ref}
	data-slate-node="element"
	data-slate-inline={isInline}
	data-slate-void={isVoid}
	{dir}
	{contenteditable}
>
	<div
		class="math-value"
		class:math-selectable={!readOnly}
		contenteditable={false}
		class:math-inline={currentInline}
		class:math-selected={selected}
	>
		<span bind:this={mathElement} />
		<div class="math-edit" bind:this={mathEditElement} class:math-selected={selected}>
			<button on:mousedown={onEdit} on:touchstart={onEdit}><MdEdit /></button>
		</div>
	</div>
	<slot />
</div>

<style>
	:global(.katex-display) {
		margin: 0;
	}

	.math-element {
		word-wrap: initial !important;
		white-space: initial !important;
		position: relative;
		margin: 0;
	}
	.math-element.math-inline {
		margin: 0 0 0 -3px;
	}

	.math-value {
		word-wrap: initial !important;
		white-space: initial !important;
		display: block;
		position: relative;
	}
	.math-value.math-selectable {
		cursor: pointer;
	}
	.math-value.math-selectable:hover {
		box-shadow: 0 0 0 1px black;
	}
	.math-value.math-selected {
		box-shadow: 0 0 0 1px black;
	}

	.math-inline {
		display: inline-block;
	}

	.math-edit {
		display: none;
		position: absolute;
		top: -2rem;
		left: calc(50% - 1rem);
		background-color: white;
	}
	.math-edit.math-selected {
		display: inline;
	}

	button {
		cursor: pointer;
		border: 1px solid black;
		padding: 0;
		width: 2rem;
		height: 2rem;
		background-color: white;
	}
</style>
