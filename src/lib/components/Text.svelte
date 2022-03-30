<script lang="ts">
	import type { Element, Range } from 'slate';
	import { Text as SlateText } from 'slate';
	import Leaf from './Leaf.svelte';
	import { findKey } from '../utils';
	import { EDITOR_TO_KEY_TO_ELEMENT, ELEMENT_TO_NODE, NODE_TO_ELEMENT } from '../weakMaps';
	import { getEditor } from './Slate.svelte';

	export let decorations: Range[];
	export let isLast: boolean;
	export let parent: Element;
	export let text: SlateText;

	const editor = getEditor();

	$: leaves = SlateText.decorations(text, decorations);
	$: key = findKey(text);

	let ref: HTMLSpanElement;
	$: if (ref) {
		EDITOR_TO_KEY_TO_ELEMENT.get(editor)?.set(key, ref);
		NODE_TO_ELEMENT.set(text, ref);
		ELEMENT_TO_NODE.set(ref, text);
	}
</script>

<span bind:this={ref} data-slate-node="text"
	>{#each leaves as leaf, index (`${key}-${index}`)}<svelte:component
			this={Leaf}
			isLast={isLast && index === leaves.length - 1}
			{parent}
			{leaf}
			{text}
		/>{/each}</span
>
