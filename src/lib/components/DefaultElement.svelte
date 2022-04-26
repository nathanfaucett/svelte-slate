<svelte:options immutable />

<script lang="ts">
	import type { Element } from 'slate';

	// svelte-ignore unused-export-let
	export let element: Element;
	export let isInline: boolean;
	export let isVoid: boolean;
	export let contenteditable: boolean;
	export let ref: HTMLElement = undefined;
	export let dir: 'rtl' | 'ltr' = undefined;
</script>

{#if isInline}<span
		bind:this={ref}
		data-slate-node="element"
		data-slate-inline={isInline}
		data-slate-void={isVoid}
		{dir}
		{contenteditable}><slot /></span
	>{:else}<div
		bind:this={ref}
		data-slate-node="element"
		data-slate-void={isVoid}
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
