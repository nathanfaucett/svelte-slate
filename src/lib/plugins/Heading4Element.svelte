<svelte:options immutable />

<script lang="ts" context="module">
	import type { IElement } from './Element.svelte';

	export const HEADING4_TYPE: string = 'heading4';

	export interface IHeading4Element extends IElement {
		type: 'heading4';
	}

	export function isHeading4Element(element: IElement): element is IHeading4Element {
		return element.type === HEADING4_TYPE;
	}
</script>

<script lang="ts">
	// svelte-ignore unused-export-let
	export let element: IHeading4Element;
	export let isInline: boolean;
	export let isVoid: boolean;
	export let contenteditable: boolean;
	export let ref: HTMLElement = undefined;
	export let dir: 'rtl' | 'ltr' = undefined;
</script>

<h4
	bind:this={ref}
	data-slate-node="element"
	data-slate-inline={isInline}
	data-slate-void={isVoid}
	{dir}
	{contenteditable}
>
	<slot />
</h4>

<style>
	h4 {
		position: relative;
		margin: 0;
	}
</style>
