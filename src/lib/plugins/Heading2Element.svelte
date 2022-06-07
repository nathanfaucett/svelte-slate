<svelte:options immutable />

<script lang="ts" context="module">
	import type { IElement } from './Element.svelte';

	export const HEADING2_TYPE: string = 'heading2';

	export interface IHeading2Element extends IElement {
		type: 'heading2';
	}

	export function isHeading2Element(element: IElement): element is IHeading2Element {
		return element.type === HEADING2_TYPE;
	}
</script>

<script lang="ts">
	// svelte-ignore unused-export-let
	export let element: IHeading2Element;
	export let isInline: boolean;
	export let isVoid: boolean;
	export let contenteditable: boolean;
	export let ref: HTMLElement | undefined = undefined;
	export let dir: 'rtl' | 'ltr' | undefined = undefined;
</script>

<h2
	bind:this={ref}
	data-slate-node="element"
	data-slate-inline={isInline}
	data-slate-void={isVoid}
	{dir}
	{contenteditable}
>
	<slot />
</h2>

<style>
	h2 {
		position: relative;
		margin: 0;
	}
</style>
