<script lang="ts" context="module">
	import type { Element } from 'slate';

	export interface IElementProps extends svelte.JSX.HTMLAttributes<HTMLElement> {
		editor: SvelteEditor;
		element: Element;
		'data-slate-node': 'element';
		'data-slate-inline'?: true;
		'data-slate-void'?: true;
		dir?: 'rtl' | 'ltr';
	}
</script>

<script lang="ts">
	import { Editor, Node } from 'slate';
	import type { Element as SlateElement, Range, Selection, Text as SlateText } from 'slate';
	import type { SvelteComponent } from 'svelte';
	import { onMount } from 'svelte';
	import { direction } from 'direction';
	import Children from './Children.svelte';
	import type { Key } from '$lib/Key';
	import Text from './Text.svelte';
	import { findKey, isDecoratorRangeListEqual } from '$lib/utils';
	import {
		EDITOR_TO_KEY_TO_ELEMENT,
		ELEMENT_TO_NODE,
		NODE_TO_ELEMENT,
		NODE_TO_INDEX,
		NODE_TO_PARENT
	} from '$lib/weakMaps';
	import type { SvelteEditor } from '$lib/withSvelte';
	import { getReadOnlyContext } from './Slate.svelte';
	import { deepEqual } from 'fast-equals';

	export let editor: SvelteEditor;
	export let element: SlateElement;
	export let decorations: Range[] = [];
	export let selection: Selection = null;
	export let Element: typeof SvelteComponent;
	export let Leaf: typeof SvelteComponent;
	export let Placeholder: typeof SvelteComponent;

	const readOnlyContext = getReadOnlyContext();
	$: readOnly = $readOnlyContext;

	let currentEditor: SvelteEditor;
	let prevEditor: SvelteEditor;
	$: if (prevEditor !== editor) {
		currentEditor = editor;
		prevEditor = editor;
	}
	let currentElement: SlateElement;
	let prevElement: SlateElement;
	$: if (prevElement !== element) {
		currentElement = element;
		prevElement = element;
	}
	let currentDecorations: Range[];
	let prevDecorations: Range[];
	$: if (!isDecoratorRangeListEqual(prevDecorations, decorations)) {
		currentDecorations = decorations;
		prevDecorations = decorations;
	}
	let currentSelection: Selection;
	let prevSelection: Selection;
	$: if (!deepEqual(prevSelection, selection)) {
		currentSelection = selection;
		prevSelection = selection;
	}

	$: isInline = currentEditor.isInline(currentElement);
	$: key = findKey(currentElement);

	let currentKey: Key;
	let prevKey: Key;
	$: if (prevKey !== key) {
		currentKey = key;
		prevKey = key;
	}

	let dir: string;
	$: if (!isInline && Editor.hasInlines(currentEditor, currentElement)) {
		const d = direction(Node.string(currentElement));

		if (d === 'rtl') {
			dir = d;
		}
	}

	$: isVoid = Editor.isVoid(currentEditor, currentElement);
	$: contentEditable = !readOnly;
	let voidText: SlateText;
	$: if (isVoid) {
		if (!readOnly && isInline) {
			contentEditable = false;
		}

		const [[text]] = Node.texts(currentElement);
		voidText = text;

		NODE_TO_INDEX.set(text, 0);
		NODE_TO_PARENT.set(text, currentElement);
	}

	let ref: HTMLElement;
	$: if (ref) {
		EDITOR_TO_KEY_TO_ELEMENT.get(editor)?.set(currentKey, ref);
		NODE_TO_ELEMENT.set(currentElement, ref);
		ELEMENT_TO_NODE.set(ref, currentElement);
	}
	onMount(() => {
		EDITOR_TO_KEY_TO_ELEMENT.get(editor)?.set(currentKey, ref);
		NODE_TO_ELEMENT.set(currentElement, ref);
		ELEMENT_TO_NODE.set(ref, currentElement);
	});
</script>

<svelte:component
	this={Element}
	bind:ref
	data-slate-node="element"
	data-slate-void={isVoid}
	data-slate-inline={isInline}
	contenteditable={contentEditable}
	editor={currentEditor}
	element={currentElement}
	{dir}
	>{#if isVoid}{#if isInline}<span data-slate-spacer
				><svelte:component
					this={Text}
					{Placeholder}
					{Leaf}
					editor={currentEditor}
					decorations={currentDecorations}
					isLast={false}
					parent={currentElement}
					text={voidText}
				/></span
			>{:else}<div data-slate-spacer>
				<svelte:component
					this={Text}
					{Placeholder}
					{Leaf}
					editor={currentEditor}
					decorations={currentDecorations}
					isLast={false}
					parent={currentElement}
					text={voidText}
				/>
			</div>{/if}{:else}<svelte:component
			this={Children}
			node={currentElement}
			editor={currentEditor}
			selection={currentSelection}
			{Element}
			{Placeholder}
			{Leaf}
		/>{/if}</svelte:component
>

<style>
	div,
	span {
		height: 0;
		color: transparent;
		outline: none;
		position: absolute;
	}
</style>
