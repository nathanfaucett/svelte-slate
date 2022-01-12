<script lang="ts" context="module">
	const SELECTED_CONTEXT_KEY = {};

	export function getSelectedContext() {
		const context = getContext<Writable<boolean>>(SELECTED_CONTEXT_KEY);
		if (!context) {
			throw new Error(
				`The \`getSelectedContext\` must be used inside a Slate Element component's context.`
			);
		}
		return context;
	}
</script>

<script lang="ts">
	import type { Writable } from 'svelte/store';
	import { writable } from 'svelte/store';
	import type { Ancestor, Element as SlateElement, Path, NodeEntry, Selection } from 'slate';
	import { Range, Editor } from 'slate';
	import { getContext, setContext, SvelteComponent } from 'svelte';
	import ElementComponent from './Element.svelte';
	import { NODE_TO_INDEX, NODE_TO_PARENT } from '../weakMaps';
	import { getChildDecorations } from './Children.svelte';
	import { isDecoratorRangeListEqual, isSelectionEqual } from '$lib/utils';
	import { getEditor } from './Slate.svelte';

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

	const selectedContext = writable(false);
	setContext(SELECTED_CONTEXT_KEY, selectedContext);

	const editor = getEditor();

	let currentElement: SlateElement;
	let prevElement: SlateElement;
	$: if (prevElement !== element) {
		currentElement = element;
		prevElement = element;
	}
	let currentDecorations: Range[];
	let prevDecorations: Range[];
	$: if (isDecoratorRangeListEqual(prevDecorations, decorations)) {
		currentDecorations = decorations;
		prevDecorations = decorations;
	}
	let currentSelection: Selection;
	let prevSelection: Selection;
	$: if (isSelectionEqual(prevSelection, selection)) {
		currentSelection = selection;
		prevSelection = selection;
	}

	$: NODE_TO_INDEX.set(currentElement, index);
	$: NODE_TO_PARENT.set(currentElement, parent);
	$: childPath = path.concat(index);
	$: range = Editor.range(editor, childPath);
	$: childDecorations = getChildDecorations(
		decorate([currentElement, childPath]),
		range,
		currentDecorations
	);
	$: childSelection = currentSelection && Range.intersection(range, currentSelection);
	$: selectedContext.set(!!childSelection);
</script>

<svelte:component
	this={ElementComponent}
	{Element}
	{Placeholder}
	{Leaf}
	decorations={childDecorations}
	{element}
	selection={childSelection}
/>
