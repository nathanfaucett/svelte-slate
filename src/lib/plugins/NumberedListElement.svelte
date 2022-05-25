<svelte:options immutable />

<script lang="ts" context="module">
	import type { IElement } from './Element.svelte';

	export const NUMBERED_LIST_TYPE: string = 'numbered-list';

	export interface INumberedListItemElement extends IElement {
		type: 'numbered-list';
		children: Array<IListItemElement>;
	}

	export function isNumberedListItemElement(
		element: IElement
	): element is INumberedListItemElement {
		return element.type === NUMBERED_LIST_TYPE;
	}
</script>

<script lang="ts">
	import type { IListItemElement } from './ListItemElement.svelte';

	// svelte-ignore unused-export-let
	export let element: INumberedListItemElement;
	export let isInline: boolean;
	export let isVoid: boolean;
	export let contenteditable: boolean;
	export let ref: HTMLElement = undefined;
	export let dir: 'rtl' | 'ltr' = undefined;
</script>

<ul
	bind:this={ref}
	data-slate-node="element"
	data-slate-inline={isInline}
	data-slate-void={isVoid}
	{dir}
	{contenteditable}
>
	<slot />
</ul>

<style>
	ul {
		position: relative;
		margin: 0;
		padding-inline-start: 1.5rem;
	}
</style>
