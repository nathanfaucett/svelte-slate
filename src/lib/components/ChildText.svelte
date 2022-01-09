<script lang="ts">
	import type { Ancestor, Text as SlateText, Path, NodeEntry, Range } from 'slate';
	import { Editor } from 'slate';
	import type { SvelteComponent } from 'svelte';
	import Text from './Text.svelte';
	import { NODE_TO_INDEX, NODE_TO_PARENT } from '../weakMaps';
	import type { SvelteEditor } from '../withSvelte';
	import { getChildDecorations } from './Children.svelte';

	export let editor: SvelteEditor;
	export let parent: Ancestor;
	export let text: SlateText;
	export let path: Path;
	export let index: number;
	export let isLeafBlock: boolean;
	export let decorations: Range[];
	export let decorate: (entry: NodeEntry) => Range[];
	export let Leaf: typeof SvelteComponent;
	export let Placeholder: typeof SvelteComponent;

	$: NODE_TO_INDEX.set(text, index);
	$: NODE_TO_PARENT.set(text, parent);
	$: childPath = path.concat(index);
	$: isLast = isLeafBlock && index === parent.children.length - 1;
	$: range = Editor.range(editor, childPath);
	$: childDecorations = getChildDecorations(decorate([text, childPath]), range, decorations);
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
