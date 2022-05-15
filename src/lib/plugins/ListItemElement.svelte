<svelte:options immutable />

<script lang="ts" context="module">
	import type { IElement } from './Element.svelte';

	export const LIST_ITEM_TYPE: string = 'list-item';

	export interface IListItemElement extends IElement {
		type: 'list-item';
	}

	export function isListItemElement(element: IElement): element is IListItemElement {
		return element.type === LIST_ITEM_TYPE;
	}
</script>

<script lang="ts">
	// svelte-ignore unused-export-let
	export let element: IListItemElement;
	export let isInline: boolean;
	export let isVoid: boolean;
	export let contenteditable: boolean;
	export let ref: HTMLElement = undefined;
	export let dir: 'rtl' | 'ltr' = undefined;
</script>

<li
	bind:this={ref}
	data-slate-node="element"
	data-slate-inline={isInline}
	data-slate-void={isVoid}
	{dir}
	{contenteditable}
>
	<slot />
</li>

<style>
	li {
		position: relative;
		margin: 0;
	}
</style>
