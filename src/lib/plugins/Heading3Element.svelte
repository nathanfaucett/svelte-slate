<svelte:options immutable />

<script lang="ts" context="module">
	import type { IElement } from './Element.svelte';

	export const HEADING3_TYPE: string = 'heading3';

	export interface IHeading3Element extends IElement {
		type: 'heading3';
	}

	export function isHeading3Element(element: IElement): element is IHeading3Element {
		return element.type === HEADING3_TYPE;
	}
</script>

<script lang="ts">
	// svelte-ignore unused-export-let
	export let element: IHeading3Element;
	export let isInline: boolean;
	export let isVoid: boolean;
	export let contenteditable: boolean;
	export let ref: HTMLElement = undefined;
	export let dir: 'rtl' | 'ltr' = undefined;
</script>

<h3
	bind:this={ref}
	data-slate-node="element"
	data-slate-inline={isInline}
	data-slate-void={isVoid}
	{dir}
	{contenteditable}
>
	<slot />
</h3>

<style>
	h3 {
		position: relative;
		margin: 0;
	}
</style>
