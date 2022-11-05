<svelte:options immutable />

<script lang="ts">
	import type { IElement } from 'svelte-slate';
	import {
		isImageElement,
		ImageElement,
		CheckListItemElement,
		isCheckListItemElement,
		CodeElement,
		isCodeElement
	} from 'svelte-slate';
	import VoidElement, { isVoidElement } from './VoidElement.svelte';

	export let element: IElement;
	export let isInline: boolean;
	export let isVoid: boolean;
	export let contenteditable: boolean;
	export let ref: HTMLElement | undefined = undefined;
	export let dir: 'rtl' | 'ltr' | undefined = undefined;
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
		{contenteditable}
	>
		<slot />
	</ImageElement>{:else if isCheckListItemElement(element)}<CheckListItemElement
		bind:ref
		{element}
		{isInline}
		{isVoid}
		{dir}
		{contenteditable}
	>
		<slot />
	</CheckListItemElement>{:else if isVoidElement(element)}<VoidElement
		bind:ref
		{element}
		{isInline}
		{isVoid}
		{dir}
		{contenteditable}
	>
		<slot />
	</VoidElement>{:else if isCodeElement(element)}<CodeElement
		bind:ref
		{element}
		{isInline}
		{isVoid}
		{dir}
		{contenteditable}
	>
		<slot />
	</CodeElement>{:else}<p
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
