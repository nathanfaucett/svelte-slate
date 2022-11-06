<svelte:options immutable />

<script lang="ts">
	import { ELEMENT_CONTEXT_KEY } from '$lib/components/Editable.svelte';
	import { getFromContext, setInContext } from '$lib/utils';
	import TableDataElement, {
		isTableDataElement,
		type ITableDataElement
	} from './TableDataElement.svelte';
	import { TABLE_ELEMENT_CONTEXT_KEY } from './TableElement.svelte';
	import TableHeaderElement, {
		isTableHeaderElement,
		type ITableHeaderElement
	} from './TableHeaderElement.svelte';

	// svelte-ignore unused-export-let
	export let element: ITableDataElement | ITableHeaderElement;
	export let isInline: boolean;
	export let isVoid: boolean;
	export let contenteditable: boolean;
	export let ref: HTMLElement | undefined = undefined;
	export let dir: 'rtl' | 'ltr' | undefined = undefined;

	const Element = getFromContext(TABLE_ELEMENT_CONTEXT_KEY);
	setInContext(ELEMENT_CONTEXT_KEY, Element);
</script>

{#if isTableDataElement(element)}<TableDataElement
		bind:ref
		{element}
		{isInline}
		{isVoid}
		{dir}
		{contenteditable}><slot /></TableDataElement
	>{:else if isTableHeaderElement(element)}<TableHeaderElement
		bind:ref
		{element}
		{isInline}
		{isVoid}
		{dir}
		{contenteditable}><slot /></TableHeaderElement
	>{/if}
