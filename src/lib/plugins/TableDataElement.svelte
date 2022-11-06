<svelte:options immutable />

<script lang="ts" context="module">
	import type { IElement } from './Element.svelte';

	export const TABLE_DATA_TYPE: string = 'table-row-data';

	export interface ITableDataElement extends IElement {
		type: 'table-row-data';
	}

	export function isTableDataElement(element: IElement): element is ITableDataElement {
		return element.type === TABLE_DATA_TYPE;
	}
</script>

<script lang="ts">
	// svelte-ignore unused-export-let
	export let element: ITableDataElement;
	export let isInline: boolean;
	export let isVoid: boolean;
	export let contenteditable: boolean;
	export let ref: HTMLElement | undefined = undefined;
	export let dir: 'rtl' | 'ltr' | undefined = undefined;
</script>

<td
	bind:this={ref}
	data-slate-node="element"
	data-slate-inline={isInline}
	data-slate-void={isVoid}
	{dir}
	{contenteditable}
>
	<slot />
</td>
