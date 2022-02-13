<svelte:options immutable={true} />

<script lang="ts" context="module">
	export interface IBaseElement {
		type: string;
		children: (IElement | IText)[];
	}

	export type IElement = IBaseElement | IImageElement | ICheckListItemElement | IVoidElement;
</script>

<script lang="ts">
	import type { IImageElement } from './ImageElement.svelte';
	import { isImageElement } from './ImageElement.svelte';
	import type { IText } from './Leaf.svelte';
	import ImageElement from './ImageElement.svelte';
	import type { ICheckListItemElement } from './CheckListItemElement.svelte';
	import CheckListItemElement, { isCheckListItemElement } from './CheckListItemElement.svelte';
	import type { IVoidElement } from './VoidElement.svelte';
	import VoidElement, { isVoidElement } from './VoidElement.svelte';

	export let element: IElement;
	export let isInline: boolean;
	export let isVoid: boolean;
	export let contenteditable: boolean;
	export let ref: HTMLElement = undefined;
	export let dir: 'rtl' | 'ltr' = undefined;
</script>

{#if element.type === 'block-quote'}<blockquote
		bind:this={ref}
		data-slate-node="element"
		data-slate-inline={isInline}
		data-slate-void={isVoid}
		{dir}
		{contenteditable}
	>
		<slot />
	</blockquote>{:else if element.type === 'bulleted-list'}<ul
		bind:this={ref}
		data-slate-node="element"
		data-slate-inline={isInline}
		data-slate-void={isVoid}
		{dir}
		{contenteditable}
	>
		<slot />
	</ul>{:else if element.type === 'heading-one'}<h1
		bind:this={ref}
		data-slate-node="element"
		data-slate-inline={isInline}
		data-slate-void={isVoid}
		{dir}
		{contenteditable}
	>
		<slot />
	</h1>{:else if element.type === 'heading-two'}<h2
		bind:this={ref}
		data-slate-node="element"
		data-slate-inline={isInline}
		data-slate-void={isVoid}
		{dir}
		{contenteditable}
	>
		<slot />
	</h2>{:else if element.type === 'list-item'}<li
		bind:this={ref}
		data-slate-node="element"
		data-slate-inline={isInline}
		data-slate-void={isVoid}
		{dir}
		{contenteditable}
	>
		<slot />
	</li>{:else if element.type === 'numbered-list'}<ol
		bind:this={ref}
		data-slate-node="element"
		data-slate-inline={isInline}
		data-slate-void={isVoid}
		{dir}
		{contenteditable}
	>
		<slot />
	</ol>{:else if isImageElement(element)}<ImageElement
		bind:ref
		{element}
		{isInline}
		{isVoid}
		{dir}
		{contenteditable}><slot /></ImageElement
	>{:else if isCheckListItemElement(element)}<CheckListItemElement
		bind:ref
		{element}
		{isInline}
		{isVoid}
		{dir}
		{contenteditable}><slot /></CheckListItemElement
	>{:else if isVoidElement(element)}<VoidElement
		bind:ref
		{element}
		{isInline}
		{isVoid}
		{dir}
		{contenteditable}><slot /></VoidElement
	>{:else}<p
		bind:this={ref}
		data-slate-node="element"
		data-slate-inline={isInline}
		data-slate-void={isVoid}
		{dir}
		{contenteditable}
	>
		<slot />
	</p>{/if}

<style>
	blockquote,
	ul,
	h1,
	h2,
	li,
	ol,
	p {
		position: relative;
		margin: 0;
	}

	blockquote {
		border-left: 2px solid #ddd;
		margin-left: 0;
		margin-right: 0;
		padding-left: 10px;
		color: #aaa;
		font-style: italic;
	}
</style>
