<svelte:options immutable />

<script lang="ts" context="module">
	import type { IElement } from './Element.svelte';

	export const BULLETED_LIST_TYPE: string = 'bulleted-list';

	export interface IBulletedListItemElement extends IElement {
		type: 'bulleted-list';
		children: Array<IListItemElement>;
	}

	export function isBulletedListItemElement(
		element: IElement
	): element is IBulletedListItemElement {
		return element.type === BULLETED_LIST_TYPE;
	}
</script>

<script lang="ts">
	import type { IListItemElement } from './ListItemElement.svelte';

	// svelte-ignore unused-export-let
	export let element: IBulletedListItemElement;
	export let isInline: boolean;
	export let isVoid: boolean;
	export let contenteditable: boolean;
	export let ref: HTMLElement | undefined = undefined;
	export let dir: 'rtl' | 'ltr' | undefined = undefined;
</script>

<ol
	bind:this={ref}
	data-slate-node="element"
	data-slate-inline={isInline}
	data-slate-void={isVoid}
	{dir}
	{contenteditable}
>
	<slot />
</ol>

<style>
	ol {
		position: relative;
		margin: 0;
		padding-inline-start: 1.5rem;
	}
</style>
