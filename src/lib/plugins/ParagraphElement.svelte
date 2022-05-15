<svelte:options immutable />

<script lang="ts" context="module">
	import type { IElement } from './Element.svelte';

	export const PARAGRAPH_TYPE: string = 'paragraph';

	export interface IParagraphElement extends IElement {
		type: 'paragraph';
	}

	export function isParagraphElement(element: IElement): element is IParagraphElement {
		return element.type === PARAGRAPH_TYPE;
	}
</script>

<script lang="ts">
	// svelte-ignore unused-export-let
	export let element: IParagraphElement;
	export let isInline: boolean;
	export let isVoid: boolean;
	export let contenteditable: boolean;
	export let ref: HTMLElement = undefined;
	export let dir: 'rtl' | 'ltr' = undefined;
</script>

<p
	bind:this={ref}
	data-slate-node="element"
	data-slate-inline={isInline}
	data-slate-void={isVoid}
	{dir}
	{contenteditable}
>
	<slot />
</p>

<style>
	p {
		position: relative;
		margin: 0;
	}
</style>
