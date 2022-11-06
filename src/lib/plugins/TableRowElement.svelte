<svelte:options immutable />

<script lang="ts" context="module">
	import type { IElement } from './Element.svelte';
	import type { ITableDataElement } from './TableDataElement.svelte';
	import type { ITableHeaderElement } from './TableHeaderElement.svelte';

	export const TABLE_ROW_TYPE: string = 'table-row';

	export interface ITableRowElement extends IElement {
		type: 'table-row';
		children: Array<ITableDataElement | ITableHeaderElement>;
	}

	export function isTableRowElement(element: IElement): element is ITableRowElement {
		return element.type === TABLE_ROW_TYPE;
	}
</script>

<script lang="ts">
	import { ELEMENT_CONTEXT_KEY } from '$lib/components/Editable.svelte';
	import { createContext } from '$lib/utils';
	import TableRowChildElement from './TableRowChildElement.svelte';

	// svelte-ignore unused-export-let
	export let element: ITableRowElement;
	export let isInline: boolean;
	export let isVoid: boolean;
	export let contenteditable: boolean;
	export let ref: HTMLElement | undefined = undefined;
	export let dir: 'rtl' | 'ltr' | undefined = undefined;

	createContext(ELEMENT_CONTEXT_KEY, TableRowChildElement);
</script>

<tr
	bind:this={ref}
	data-slate-node="element"
	data-slate-inline={isInline}
	data-slate-void={isVoid}
	{dir}
	{contenteditable}
>
	<slot />
</tr>
