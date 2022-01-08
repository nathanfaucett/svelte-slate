<script lang="ts">
	import type { Ancestor, Element as SlateElement, Path, NodeEntry, Selection } from 'slate';
	import { Range, Editor } from 'slate';
	import type { SvelteComponent } from 'svelte';
	import ElementComponent from './Element.svelte';
	import { NODE_TO_INDEX, NODE_TO_PARENT } from '$lib/weakMaps';
	import type { SvelteEditor } from '$lib/withSvelte';
	import { getChildDecorations } from './Children.svelte';

	export let editor: SvelteEditor;
	export let parent: Ancestor;
	export let element: SlateElement;
	export let path: Path;
	export let index: number;
	export let decorate: (entry: NodeEntry) => Range[];
	export let decorations: Range[];
	export let selection: Selection = null;
	export let Element: typeof SvelteComponent;
	export let Leaf: typeof SvelteComponent;
	export let Placeholder: typeof SvelteComponent;

	$: NODE_TO_INDEX.set(element, index);
	$: NODE_TO_PARENT.set(element, parent);
	$: childPath = path.concat(index);
	$: range = Editor.range(editor, childPath);
	$: childDecorations = decorate([element, childPath]);
	$: childSelection = selection && Range.intersection(range, selection);
	$: if (getChildDecorations(childDecorations, range, decorations)) {
		childDecorations = childDecorations;
	}
</script>

<svelte:component
	this={ElementComponent}
	{Element}
	{Placeholder}
	{Leaf}
	{editor}
	decorations={childDecorations}
	{element}
	selection={childSelection}
/>
