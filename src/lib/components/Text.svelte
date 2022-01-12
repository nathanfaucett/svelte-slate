<script lang="ts">
	import type { Element, Range } from 'slate';
	import { Text as SlateText } from 'slate';
	import type { SvelteComponent } from 'svelte';
	import { onMount } from 'svelte';
	import LeafComponent from './Leaf.svelte';
	import type { Key } from '../Key';
	import { findKey } from '../utils';
	import { EDITOR_TO_KEY_TO_ELEMENT, ELEMENT_TO_NODE, NODE_TO_ELEMENT } from '../weakMaps';
	import { getEditor } from './Slate.svelte';

	export let decorations: Range[];
	export let isLast: boolean;
	export let parent: Element;
	export let text: SlateText;
	export let Placeholder: typeof SvelteComponent;
	export let Leaf: typeof SvelteComponent;

	const editor = getEditor();

	$: leaves = SlateText.decorations(text, decorations);
	$: key = findKey(text);

	let currentKey: Key;
	let prevKey: Key;
	$: if (prevKey !== key) {
		currentKey = key;
		prevKey = key;
	}

	let ref: HTMLSpanElement;
	$: if (ref) {
		EDITOR_TO_KEY_TO_ELEMENT.get(editor)?.set(currentKey, ref);
		NODE_TO_ELEMENT.set(text, ref);
		ELEMENT_TO_NODE.set(ref, text);
	}
	onMount(() => {
		EDITOR_TO_KEY_TO_ELEMENT.get(editor)?.set(currentKey, ref);
		NODE_TO_ELEMENT.set(text, ref);
		ELEMENT_TO_NODE.set(ref, text);
	});
</script>

<span bind:this={ref} data-slate-node="text"
	>{#each leaves as leaf, index (`${currentKey}-${index}`)}<svelte:component
			this={LeafComponent}
			{Placeholder}
			{Leaf}
			isLast={isLast && index === leaves.length - 1}
			{parent}
			{leaf}
			{text}
		/>{/each}</span
>
