<script lang="ts">
	import type { Ancestor, Text as SlateText, Path, NodeEntry, Range } from 'slate';
	import { Editor } from 'slate';
	import type { SvelteComponent } from 'svelte';
	import Text from './Text.svelte';
	import { NODE_TO_INDEX, NODE_TO_PARENT } from '../weakMaps';
	import { getChildDecorations } from './Children.svelte';
	import { isDecoratorRangeListEqual } from '$lib/utils';
	import { getEditor } from './Slate.svelte';

	export let parent: Ancestor;
	export let text: SlateText;
	export let path: Path;
	export let index: number;
	export let isLeafBlock: boolean;
	export let decorations: Range[];
	export let decorate: (entry: NodeEntry) => Range[];
	export let Leaf: typeof SvelteComponent;
	export let Placeholder: typeof SvelteComponent;

	const editor = getEditor();

	let currentIndex = index;
	$: if (currentIndex !== index) {
		currentIndex = index;
	}
	let currentText = text;
	$: if (currentText !== text) {
		currentText = text;
	}
	let currentParent = parent;
	$: if (currentParent !== parent) {
		currentParent = parent;
	}
	let currentDecorations = decorations;
	$: if (!isDecoratorRangeListEqual(currentDecorations, decorations)) {
		currentDecorations = decorations;
	}

	$: NODE_TO_INDEX.set(currentText, currentIndex);
	$: NODE_TO_PARENT.set(currentText, currentParent);
	$: childPath = path.concat(currentIndex);
	$: isLast = isLeafBlock && currentIndex === currentParent.children.length - 1;
	$: range = Editor.range(editor, childPath);
	$: childDecorations = getChildDecorations(
		decorate([currentText, childPath]),
		range,
		currentDecorations
	);
</script>

<svelte:component
	this={Text}
	{Placeholder}
	{Leaf}
	decorations={childDecorations}
	{isLast}
	{parent}
	{text}
/>
