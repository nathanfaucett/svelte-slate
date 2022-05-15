<svelte:options immutable />

<script lang="ts" context="module">
	import type { IElement } from './Element.svelte';

	export const HEADING1_TYPE: string = 'heading1';

	export interface IHeading1Element extends IElement {
		type: 'heading1';
	}

	export function isHeading1Element(element: IElement): element is IHeading1Element {
		return element.type === HEADING1_TYPE;
	}
</script>

<script lang="ts">
	// svelte-ignore unused-export-let
	export let element: IHeading1Element;
	export let isInline: boolean;
	export let isVoid: boolean;
	export let contenteditable: boolean;
	export let ref: HTMLElement = undefined;
	export let dir: 'rtl' | 'ltr' = undefined;
</script>

<h1
	bind:this={ref}
	data-slate-node="element"
	data-slate-inline={isInline}
	data-slate-void={isVoid}
	{dir}
	{contenteditable}
>
	<slot />
</h1>

<style>
	h1 {
		position: relative;
		margin: 0;
	}
</style>
