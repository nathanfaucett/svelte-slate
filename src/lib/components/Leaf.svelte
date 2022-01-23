<svelte:options immutable={true} />

<script lang="ts" context="module">
	export interface ILeafProps extends svelte.JSX.HTMLAttributes<HTMLElement> {
		editor: SvelteEditor;
		leaf: SlateText;
		'data-slate-leaf': true;
	}
</script>

<script lang="ts">
	import { CAN_USE_DOM } from '../environment';
	import { PLACEHOLDER_SYMBOL } from '../weakMaps';
	import type { SvelteEditor } from '../withSvelte';
	import type { Text as SlateText, Element as SlateElement } from 'slate';
	import { onDestroy, SvelteComponent } from 'svelte';
	import String from './String.svelte';

	export let isLast: boolean;
	export let leaf: SlateText;
	export let parent: SlateElement;
	export let text: SlateText;
	export let Placeholder: typeof SvelteComponent;
	export let Leaf: typeof SvelteComponent;

	let clientHeight: number;
	let prevClientHeight: number;
	$: if (clientHeight !== prevClientHeight && CAN_USE_DOM) {
		const editorEl = document.querySelector<HTMLDivElement>('[data-svelte-editor="true"]');

		if (editorEl) {
			editorEl.style.minHeight = `${clientHeight}px`;
		}
	}

	onDestroy(() => {
		if (CAN_USE_DOM) {
			const editorEl = document.querySelector<HTMLDivElement>('[data-svelte-editor="true"]');

			if (editorEl) {
				editorEl.style.minHeight = '';
			}
		}
	});
</script>

<svelte:component this={Leaf} {leaf} data-slate-leaf="true"
	>{#if PLACEHOLDER_SYMBOL in leaf}<svelte:component
			this={Placeholder}
			style="position: absolute; pointer-events: none; width: 100%; max-width: 100%; display: block; opacity: 0.333; user-select: none; text-decoration: none;"
			contenteditable="false"
			bind:clientHeight>{leaf['placeholder']}</svelte:component
		>{/if}<String {isLast} {leaf} {parent} {text} /></svelte:component
>
