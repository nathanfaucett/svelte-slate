<svelte:options immutable />

<script lang="ts" context="module">
	export interface IBaseElement {
		type: string;
		children: (IBaseElement | IText)[];
	}
</script>

<script lang="ts">
	import DefaultElement from '../components/DefaultElement.svelte';
	import { getPluginsContext } from './PluginEditable.svelte';
	import type { IText } from './PluginLeaf.svelte';

	export let element: IBaseElement;
	export let isInline: boolean;
	export let isVoid: boolean;
	export let contenteditable: boolean;
	export let ref: HTMLElement = undefined;
	export let dir: 'rtl' | 'ltr' = undefined;

	const pluginsContext = getPluginsContext();

	$: plugins = $pluginsContext;
	$: Element = plugins[element.type] || DefaultElement;
</script>

<svelte:component
	this={Element}
	bind:ref
	bind:dir
	{element}
	{isInline}
	{isVoid}
	{contenteditable}
/>
