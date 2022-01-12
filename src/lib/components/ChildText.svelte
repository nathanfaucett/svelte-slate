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

	let currentText: SlateText;
	let prevText: SlateText;
	$: if (prevText !== text) {
		currentText = text;
		prevText = text;
	}
	let currentParent: Ancestor;
	let prevParent: Ancestor;
	$: if (prevParent !== parent) {
		currentParent = parent;
		prevParent = parent;
	}
	let currentDecorations: Range[];
	let prevDecorations: Range[];
	$: if (isDecoratorRangeListEqual(prevDecorations, decorations)) {
		currentDecorations = decorations;
		prevDecorations = decorations;
	}

	$: NODE_TO_INDEX.set(currentText, index);
	$: NODE_TO_PARENT.set(currentText, currentParent);
	$: childPath = path.concat(index);
	$: isLast = isLeafBlock && index === currentParent.children.length - 1;
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
