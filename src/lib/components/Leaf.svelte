<svelte:options immutable={true} />

<script lang="ts" context="module">
	export interface ILeafProps extends svelte.JSX.HTMLAttributes<HTMLElement> {
		leaf: SlateText;
	}

	export interface IPlaceholderProps extends svelte.JSX.HTMLAttributes<HTMLElement> {
		clientHeight?: number;
	}
</script>

<script lang="ts">
	import { CAN_USE_DOM } from '../environment';
	import { PLACEHOLDER_SYMBOL } from '../weakMaps';
	import type { Text as SlateText, Element as SlateElement } from 'slate';
	import { onDestroy } from 'svelte';
	import String from './String.svelte';
	import type { ISvelteComponent } from './Slate.svelte';

	export let isLast: boolean;
	export let leaf: SlateText;
	export let parent: SlateElement;
	export let text: SlateText;
	export let Leaf: ISvelteComponent<ILeafProps>;
	export let Placeholder: ISvelteComponent<IPlaceholderProps>;

	let clientHeight: number;
	let currentClientHeight: number;
	$: if (currentClientHeight !== clientHeight && CAN_USE_DOM) {
		const editorEl = document.querySelector<HTMLDivElement>('[data-svelte-editor="true"]');

		if (editorEl) {
			editorEl.style.minHeight = `${clientHeight}px`;
		}
		currentClientHeight = clientHeight;
	}

	onDestroy(() => {
		if (CAN_USE_DOM) {
			const editorEl = document.querySelector<HTMLDivElement>('[data-svelte-editor="true"]');

			if (editorEl) {
				editorEl.style.minHeight = 'auto';
			}
		}
	});
</script>

<svelte:component this={Leaf} {leaf}
	>{#if PLACEHOLDER_SYMBOL in leaf}<svelte:component this={Placeholder} bind:clientHeight
			>{leaf['placeholder']}</svelte:component
		>{/if}<String {isLast} {leaf} {parent} {text} /></svelte:component
>
