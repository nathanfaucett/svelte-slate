<script lang="ts">
	import type { Ancestor, Selection } from 'slate';
	import { Element as SlateElement, Editor, Range } from 'slate';
	import type { SvelteComponent } from 'svelte';
	import { findKey, findPath, isDecoratorRangeListEqual } from '$lib/utils';
	import type { SvelteEditor } from '$lib/withSvelte';
	import { getDecorateContext } from './Slate.svelte';
	import { deepEqual } from 'fast-equals';
	import ChildElement from './ChildElement.svelte';
	import ChildText from './ChildText.svelte';

	export let editor: SvelteEditor;
	export let node: Ancestor;
	export let selection: Selection = null;
	export let decorations: Range[] = [];
	export let Element: typeof SvelteComponent;
	export let Leaf: typeof SvelteComponent;
	export let Placeholder: typeof SvelteComponent;

	const decorateContext = getDecorateContext();
	$: decorate = $decorateContext;

	let currentEditor: SvelteEditor;
	let prevEditor: SvelteEditor;
	$: if (prevEditor !== editor) {
		currentEditor = editor;
		prevEditor = editor;
	}
	let currentNode: Ancestor;
	let prevNode: Ancestor;
	$: if (prevNode !== node) {
		currentNode = node;
		prevNode = node;
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

	$: path = findPath(currentNode);
	$: isLeafBlock =
		SlateElement.isElement(currentNode) &&
		!currentEditor.isInline(currentNode) &&
		Editor.hasInlines(currentEditor, currentNode);
</script>

{#each node.children as child, index (findKey(child))}{#if SlateElement.isElement(child)}<ChildElement
			{Element}
			{Placeholder}
			{Leaf}
			editor={currentEditor}
			decorations={currentDecorations}
			selection={currentSelection}
			element={child}
			parent={node}
			{decorate}
			{index}
			{path}
		/>{:else}<ChildText
			{Placeholder}
			{Leaf}
			editor={currentEditor}
			decorations={currentDecorations}
			parent={node}
			text={child}
			{decorate}
			{index}
			{path}
			{isLeafBlock}
		/>{/if}{/each}
