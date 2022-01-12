<script lang="ts" context="module">
	export function getChildDecorations(
		childDecorations: Range[],
		range: Range,
		decorations: Range[] = []
	): Range[] {
		for (const decoration of decorations) {
			const intersection = Range.intersection(decoration, range);

			if (intersection) {
				childDecorations.push(intersection);
			}
		}
		return childDecorations;
	}
</script>

<script lang="ts">
	import type { Ancestor, Selection } from 'slate';
	import { Element as SlateElement, Editor, Range } from 'slate';
	import type { SvelteComponent } from 'svelte';
	import { findKey, findPath } from '../utils';
	import { getDecorateContext, getEditor } from './Slate.svelte';
	import ChildElement from './ChildElement.svelte';
	import ChildText from './ChildText.svelte';

	export let node: Ancestor;
	export let decorations: Range[];
	export let selection: Selection = null;
	export let Element: typeof SvelteComponent;
	export let Leaf: typeof SvelteComponent;
	export let Placeholder: typeof SvelteComponent;

	const editor = getEditor();

	const decorateContext = getDecorateContext();
	$: decorate = $decorateContext;

	$: path = findPath(node);
	$: isLeafBlock =
		SlateElement.isElement(node) && !editor.isInline(node) && Editor.hasInlines(editor, node);
</script>

{#each node.children as child, index (findKey(child))}{#if SlateElement.isElement(child)}<ChildElement
			{Element}
			{Placeholder}
			{Leaf}
			{decorations}
			{selection}
			element={child}
			parent={node}
			{decorate}
			{index}
			{path}
		/>{:else}<ChildText
			{Placeholder}
			{Leaf}
			{decorations}
			parent={node}
			text={child}
			{decorate}
			{index}
			{path}
			{isLeafBlock}
		/>{/if}{/each}
