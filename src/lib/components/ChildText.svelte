<script lang="ts">
	import type { Ancestor, Text as SlateText, Path, NodeEntry, Range } from 'slate';
	import { Editor } from 'slate';
	import type { SvelteComponent } from 'svelte';
	import Text from './Text.svelte';
	import { NODE_TO_INDEX, NODE_TO_PARENT } from '$lib/weakMaps';
	import type { SvelteEditor } from '$lib/withSvelte';
	import { getChildDecorations } from './Children.svelte';

	export let editor: SvelteEditor;
	export let parent: Ancestor;
	export let text: SlateText;
	export let path: Path;
	export let index: number;
	export let isLeafBlock: boolean;
	export let decorate: (entry: NodeEntry) => Range[];
	export let decorations: Range[] = [];
	export let isLast: boolean = false;
	export let Leaf: typeof SvelteComponent;
	export let Placeholder: typeof SvelteComponent;

	$: NODE_TO_INDEX.set(text, index);
	$: NODE_TO_PARENT.set(text, parent);
	$: childPath = path.concat(index);
	$: isLast = isLeafBlock && index === parent.children.length - 1;
	$: range = Editor.range(editor, childPath);
	$: childDecorations = decorate([text, childPath]);
	$: if (getChildDecorations(childDecorations, range, decorations)) {
		childDecorations = childDecorations;
	}
</script>

<svelte:component
	this={Text}
	{Placeholder}
	{Leaf}
	{editor}
	decorations={childDecorations}
	{isLast}
	{parent}
	{text}
/>
