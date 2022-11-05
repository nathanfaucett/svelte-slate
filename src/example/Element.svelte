<svelte:options immutable />

<script lang="ts">
	import BlockQuoteElement, { isBlockQuoteElement } from '$lib/plugins/BlockQuoteElement.svelte';
	import Heading1Element from '$lib/plugins/Heading1Element.svelte';
	import Heading2Element from '$lib/plugins/Heading2Element.svelte';
	import ListItemElement from '$lib/plugins/ListItemElement.svelte';
	import NumberedListElement from '$lib/plugins/NumberedListElement.svelte';
	import {
		type IElement,
		isImageElement,
		ImageElement,
		CheckListItemElement,
		isCheckListItemElement,
		CodeElement,
		isCodeElement,
		isBulletedListItemElement,
		BulletedListElement,
		isHeading1Element,
		isHeading2Element,
		isListItemElement,
		isNumberedListItemElement
	} from 'svelte-slate/plugins';
	import VoidElement, { isVoidElement } from './VoidElement.svelte';

	export let element: IElement;
	export let isInline: boolean;
	export let isVoid: boolean;
	export let contenteditable: boolean;
	export let ref: HTMLElement | undefined = undefined;
	export let dir: 'rtl' | 'ltr' | undefined = undefined;
</script>

{#if isBlockQuoteElement(element)}<BlockQuoteElement
		bind:ref
		{element}
		{isInline}
		{isVoid}
		{dir}
		{contenteditable}><slot /></BlockQuoteElement
	>{:else if isBulletedListItemElement(element)}<BulletedListElement
		bind:ref
		{element}
		{isInline}
		{isVoid}
		{dir}
		{contenteditable}><slot /></BulletedListElement
	>{:else if isHeading1Element(element)}<Heading1Element
		bind:ref
		{element}
		{isInline}
		{isVoid}
		{dir}
		{contenteditable}><slot /></Heading1Element
	>{:else if isHeading2Element(element)}<Heading2Element
		bind:ref
		{element}
		{isInline}
		{isVoid}
		{dir}
		{contenteditable}><slot /></Heading2Element
	>{:else if isListItemElement(element)}<ListItemElement
		bind:ref
		{element}
		{isInline}
		{isVoid}
		{dir}
		{contenteditable}><slot /></ListItemElement
	>{:else if isNumberedListItemElement(element)}<NumberedListElement
		bind:ref
		{element}
		{isInline}
		{isVoid}
		{dir}
		{contenteditable}><slot /></NumberedListElement
	>{:else if isImageElement(element)}<ImageElement
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
