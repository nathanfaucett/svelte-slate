<svelte:options immutable />

<script lang="ts" context="module">
	import type { IElement } from './Element.svelte';

	export const TABLE_HEADER_TYPE: string = 'table-row-header';

	export interface ITableHeaderElement extends IElement {
		type: 'table-row-header';
	}

	export function isTableHeaderElement(element: IElement): element is ITableHeaderElement {
		return element.type === TABLE_HEADER_TYPE;
	}
</script>

<script lang="ts">
	// svelte-ignore unused-export-let
	export let element: ITableHeaderElement;
	export let isInline: boolean;
	export let isVoid: boolean;
	export let contenteditable: boolean;
	export let ref: HTMLElement | undefined = undefined;
	export let dir: 'rtl' | 'ltr' | undefined = undefined;
</script>

<th
	bind:this={ref}
	data-slate-node="element"
	data-slate-inline={isInline}
	data-slate-void={isVoid}
	{dir}
	{contenteditable}
>
	<slot />
</th>

<style>
	th {
		border: 1px solid;
		text-align: left;
	}
</style>
