<svelte:options immutable />

<script lang="ts" context="module">
	import type { IElement } from './Element.svelte';

	export const BLOCK_QUOTE_TYPE: string = 'block-quote';

	export interface IBlockQuoteElement extends IElement {
		type: 'block-quote';
	}

	export function isBlockQuoteElement(element: IElement): element is IBlockQuoteElement {
		return element.type === BLOCK_QUOTE_TYPE;
	}
</script>

<script lang="ts">
	// svelte-ignore unused-export-let
	export let element: IBlockQuoteElement;
	export let isInline: boolean;
	export let isVoid: boolean;
	export let contenteditable: boolean;
	export let ref: HTMLElement = undefined;
	export let dir: 'rtl' | 'ltr' = undefined;
</script>

<blockquote
	bind:this={ref}
	data-slate-node="element"
	data-slate-inline={isInline}
	data-slate-void={isVoid}
	{dir}
	{contenteditable}
>
	<slot />
</blockquote>

<style>
	blockquote {
		border-left: 2px solid #ddd;
		position: relative;
		margin-left: 0;
		margin-right: 0;
		padding-left: 10px;
		color: #aaa;
		font-style: italic;
	}
</style>
