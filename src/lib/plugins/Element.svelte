<svelte:options immutable />

<script lang="ts" context="module">
	export interface IBaseElement extends ISlateElement {
		type: string;
	}

	export interface IElement extends IBaseElement {
		children: Array<IElement | IText>;
	}
</script>

<script lang="ts">
	import type { Element as ISlateElement } from 'slate';
	import DefaultElement from '../components/DefaultElement.svelte';
	import { getPluginsContext } from './Slate.svelte';
	import type { IText } from './Leaf.svelte';

	export let element: IElement;
	export let isInline: boolean;
	export let isVoid: boolean;
	export let contenteditable: boolean;
	export let ref: HTMLElement | undefined = undefined;
	export let dir: 'rtl' | 'ltr' | undefined = undefined;

	const pluginsContext = getPluginsContext();

	$: plugins = $pluginsContext;
	$: Element = plugins[element.type] || DefaultElement;
</script>

<svelte:component this={Element} bind:ref bind:dir {element} {isInline} {isVoid} {contenteditable}
	><slot /></svelte:component
>
