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
	import { findKey, findPath } from '../utils';
	import type { ISvelteComponent } from './Slate.svelte';
	import { getDecorateContext, getEditor } from './Slate.svelte';
	import ChildElement from './ChildElement.svelte';
	import ChildText from './ChildText.svelte';
	import type { IElementProps } from './Element.svelte';
	import type { ILeafProps, IPlaceholderProps } from './Leaf.svelte';

	export let node: Ancestor;
	export let decorations: Range[];
	export let selection: Selection = null;
	export let Element: ISvelteComponent<IElementProps>;
	export let Leaf: ISvelteComponent<ILeafProps>;
	export let Placeholder: ISvelteComponent<IPlaceholderProps>;

	const editor = getEditor();

	const decorateContext = getDecorateContext();
	$: decorate = $decorateContext;

	let currentNode = node;
	$: if (currentNode !== node || node === editor) {
		currentNode = node;
	}
	let currentChildren = node.children;
	$: if (currentChildren !== node.children) {
		currentChildren = node.children;
	}

	$: path = findPath(currentNode);
	$: isLeafBlock =
		SlateElement.isElement(currentNode) &&
		!editor.isInline(currentNode) &&
		Editor.hasInlines(editor, currentNode);
</script>

{#each currentChildren as child, index (findKey(child))}{#if SlateElement.isElement(child)}<ChildElement
			{Element}
			{Placeholder}
			{Leaf}
			{decorations}
			{selection}
			element={child}
			parent={currentNode}
			{decorate}
			{index}
			{path}
		/>{:else}<ChildText
			{Placeholder}
			{Leaf}
			{decorations}
			parent={currentNode}
			text={child}
			{decorate}
			{index}
			{path}
			{isLeafBlock}
		/>{/if}{/each}
