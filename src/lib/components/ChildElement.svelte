<script lang="ts" context="module">
	import { createContextKey, getFromContext } from '../utils';

	const SELECTED_CONTEXT_KEY = createContextKey<boolean>();

	export function getSelectedContext() {
		return getFromContext(SELECTED_CONTEXT_KEY);
	}
</script>

<script lang="ts">
	import type { Ancestor, Element as SlateElement, Path, Selection } from 'slate';
	import { Range, Editor } from 'slate';
	import InternalElement from './InternalElement.svelte';
	import { NODE_TO_INDEX, NODE_TO_PARENT } from '../weakMaps';
	import { getChildDecorations } from './Children.svelte';
	import { createContext, isDecoratorRangeListEqual, isSelectionEqual } from '../utils';
	import { getDecorateContext, getEditor } from './Slate.svelte';

	export let parent: Ancestor;
	export let element: SlateElement;
	export let path: Path;
	export let index: number;
	export let decorations: Range[];
	export let selection: Selection = null;

	const decorateContext = getDecorateContext();
	const selectedContext = createContext(SELECTED_CONTEXT_KEY, false);
	const editor = getEditor();

	let currentIndex = index;
	$: if (currentIndex !== index) {
		currentIndex = index;
	}
	let currentParent = parent;
	$: if (currentParent !== parent) {
		currentParent = parent;
	}
	let currentElement = element;
	$: if (currentElement !== element) {
		currentElement = element;
	}
	let currentPath = path;
	$: if (currentPath !== path) {
		currentPath = path;
	}
	let currentDecorations = decorations;
	$: if (!isDecoratorRangeListEqual(currentDecorations, decorations)) {
		currentDecorations = decorations;
	}
	let currentSelection = selection;
	$: if (!isSelectionEqual(currentSelection, selection)) {
		currentSelection = selection;
	}

	$: NODE_TO_INDEX.set(currentElement, currentIndex);
	$: NODE_TO_PARENT.set(currentElement, currentParent);
	$: childPath = currentPath.concat(currentIndex);
	$: range = Editor.range(editor, childPath);
	$: decorate = $decorateContext;
	$: childDecorations = getChildDecorations(
		decorate([currentElement, childPath]),
		range,
		currentDecorations
	);
	$: childSelection = currentSelection && Range.intersection(range, currentSelection);
	$: selectedContext.set(!!childSelection);
</script>

<svelte:component
	this={InternalElement}
	decorations={childDecorations}
	element={currentElement}
	selection={childSelection}
/>
