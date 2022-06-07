<svelte:options immutable />

<script lang="ts" context="module">
	import type { IElement } from './Element.svelte';

	export const HEADING5_TYPE: string = 'heading5';

	export interface IHeading5Element extends IElement {
		type: 'heading5';
	}

	export function isHeading5Element(element: IElement): element is IHeading5Element {
		return element.type === HEADING5_TYPE;
	}
</script>

<script lang="ts">
	// svelte-ignore unused-export-let
	export let element: IHeading5Element;
	export let isInline: boolean;
	export let isVoid: boolean;
	export let contenteditable: boolean;
	export let ref: HTMLElement | undefined = undefined;
	export let dir: 'rtl' | 'ltr' | undefined = undefined;
</script>

<h5
	bind:this={ref}
	data-slate-node="element"
	data-slate-inline={isInline}
	data-slate-void={isVoid}
	{dir}
	{contenteditable}
>
	<slot />
</h5>

<style>
	h5 {
		position: relative;
		margin: 0;
	}
</style>
