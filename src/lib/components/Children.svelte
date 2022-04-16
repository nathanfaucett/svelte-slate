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
	import { getEditor } from './Slate.svelte';
	import ChildElement from './ChildElement.svelte';
	import ChildText from './ChildText.svelte';

	export let node: Ancestor;
	export let decorations: Range[];
	export let selection: Selection = null;

	const editor = getEditor();

	let currentNode = node;
	$: if (currentNode !== node || node === editor) {
		currentNode = node;
	}

	$: path = findPath(currentNode);
	$: isLeafBlock =
		SlateElement.isElement(currentNode) &&
		!editor.isInline(currentNode) &&
		Editor.hasInlines(editor, currentNode);
</script>

{#each currentNode.children as child, index (findKey(child))}{#if SlateElement.isElement(child)}<ChildElement
			{decorations}
			{selection}
			element={child}
			parent={currentNode}
			{index}
			{path}
		/>{:else}<ChildText
			{decorations}
			parent={currentNode}
			text={child}
			{index}
			{path}
			{isLeafBlock}
		/>{/if}{/each}
