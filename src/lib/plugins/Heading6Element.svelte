<svelte:options immutable />

<script lang="ts" context="module">
	import type { IElement } from './Element.svelte';

	export const HEADING6_TYPE: string = 'heading6';

	export interface IHeading6Element extends IElement {
		type: 'heading6';
	}

	export function isHeading6Element(element: IElement): element is IHeading6Element {
		return element.type === HEADING6_TYPE;
	}
</script>

<script lang="ts">
	// svelte-ignore unused-export-let
	export let element: IHeading6Element;
	export let isInline: boolean;
	export let isVoid: boolean;
	export let contenteditable: boolean;
	export let ref: HTMLElement | undefined = undefined;
	export let dir: 'rtl' | 'ltr' | undefined = undefined;
</script>

<h6
	bind:this={ref}
	data-slate-node="element"
	data-slate-inline={isInline}
	data-slate-void={isVoid}
	{dir}
	{contenteditable}
>
	<slot />
</h6>

<style>
	h6 {
		position: relative;
		margin: 0;
	}
</style>
