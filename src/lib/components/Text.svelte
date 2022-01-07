<script lang="ts">
	import type { Element, Range } from 'slate';
	import { Text as SlateText } from 'slate';
	import { beforeUpdate, SvelteComponent } from 'svelte';
	import { onMount } from 'svelte';
	import LeafComponent from './Leaf.svelte';
	import type { Key } from '../Key';
	import { findKey, isDecoratorRangeListEqual } from '$lib/utils';
	import { EDITOR_TO_KEY_TO_ELEMENT, ELEMENT_TO_NODE, NODE_TO_ELEMENT } from '$lib/weakMaps';
	import type { SvelteEditor } from '$lib/withSvelte';

	export let editor: SvelteEditor;
	export let decorations: Range[] = [];
	export let isLast: boolean;
	export let parent: Element;
	export let text: SlateText;
	export let Placeholder: typeof SvelteComponent;
	export let Leaf: typeof SvelteComponent;

	let currentEditor: SvelteEditor;
	let prevEditor: SvelteEditor;
	$: if (prevEditor !== editor) {
		currentEditor = editor;
		prevEditor = editor;
	}
	let currentText: SlateText;
	let prevText: SlateText;
	$: if (prevText !== text) {
		currentText = text;
		prevText = text;
	}
	let currentDecorations: Range[];
	let prevDecorations: Range[];
	$: if (!isDecoratorRangeListEqual(prevDecorations, decorations)) {
		currentDecorations = decorations;
		prevDecorations = decorations;
	}

	$: leaves = SlateText.decorations(currentText, currentDecorations);
	$: key = findKey(currentText);

	let currentKey: Key;
	let prevKey: Key;
	$: if (prevKey !== key) {
		currentKey = key;
		prevKey = key;
	}

	let ref: HTMLSpanElement;
	$: if (ref) {
		EDITOR_TO_KEY_TO_ELEMENT.get(editor)?.set(currentKey, ref);
		NODE_TO_ELEMENT.set(currentText, ref);
		ELEMENT_TO_NODE.set(ref, currentText);
	}
	onMount(() => {
		EDITOR_TO_KEY_TO_ELEMENT.get(editor)?.set(currentKey, ref);
		NODE_TO_ELEMENT.set(currentText, ref);
		ELEMENT_TO_NODE.set(ref, currentText);
	});
</script>

<span bind:this={ref} data-slate-node="text"
	>{#each leaves as leaf, index (`${currentKey}-${index}`)}<svelte:component
			this={LeafComponent}
			{Placeholder}
			{Leaf}
			editor={currentEditor}
			isLast={isLast && index === leaves.length - 1}
			{parent}
			{leaf}
			text={currentText}
		/>{/each}</span
>
