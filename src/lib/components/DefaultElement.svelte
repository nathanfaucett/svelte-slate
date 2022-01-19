<svelte:options immutable={true} />

<script lang="ts">
	import type { Element } from 'slate';
	import { getEditor } from './Slate.svelte';

	export let element: Element;
	export let ref: HTMLElement;
	export let dir: 'rtl' | 'ltr';
	export let contenteditable: boolean | undefined;

	const editor = getEditor();
</script>

{#if editor.isInline(element)}<span
		bind:this={ref}
		data-slate-node="element"
		data-slate-inline="true"
		data-slate-void={$$props['data-slate-void']}
		{dir}
		{contenteditable}><slot /></span
	>{:else}<div
		bind:this={ref}
		data-slate-node="element"
		data-slate-void={$$props['data-slate-void']}
		{dir}
		{contenteditable}
	>
		<slot />
	</div>{/if}

<style>
	span,
	div {
		position: relative;
	}
</style>
