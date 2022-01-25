<svelte:options immutable={true} />

<script lang="ts">
	import type { Element } from 'slate';

	export let element: Element;
	export let ref: HTMLElement;
	export let isInline: boolean;
	export let isVoid: boolean;
	export let contenteditable: boolean;
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
