<svelte:options immutable />

<script lang="ts" context="module">
	export const PLUGINS_CONTEXT_KEY = createContextKey<IPlugins>();

	export function getPluginsContext() {
		return getFromContext(PLUGINS_CONTEXT_KEY);
	}

	export type IPlugin<T extends ISvelteComponent<IElementProps> = ISvelteComponent<IElementProps>> =
		T;
	export type IPlugins<
		T extends ISvelteComponent<IElementProps> = ISvelteComponent<IElementProps>
	> = { [type: string]: IPlugin<T> };
</script>

<script lang="ts">
	import {
		createContext,
		createContextKey,
		getFromContext,
		type ISvelteComponent
	} from '$lib/utils';
	import DefaultPlaceholder from '../components/DefaultPlaceholder.svelte';
	import Editable from '../components/Editable.svelte';
	import type { IElementProps } from '../components/InternalElement.svelte';
	import type { IPlaceholderProps } from '../components/InternalLeaf.svelte';
	import PluginElement from './PluginElement.svelte';
	import PluginLeaf from './PluginLeaf.svelte';

	export let plugins: IPlugins = {};
	export let Placeholder: ISvelteComponent<IPlaceholderProps> = DefaultPlaceholder;
	export let placeholder: string = undefined;
	export let readOnly = false;
	export let autoFocus = false;
	export let decorate = undefined;
	export let scrollSelectionIntoView = undefined;
	export let ref: HTMLDivElement = undefined;
	export let spellcheck = true;
	export let autocorrect: string = 'true';
	export let autocapitalize: string = 'true';
	export let onKeyDown: (event: KeyboardEvent) => void | false = () => undefined;

	const pluginsContext = createContext(PLUGINS_CONTEXT_KEY, plugins);

	$: pluginsContext.set(plugins);
</script>

<Editable
	Element={PluginElement}
	Leaf={PluginLeaf}
	Placeholder={DefaultPlaceholder}
	bind:ref
	{placeholder}
	{readOnly}
	{autoFocus}
	bind:decorate
	bind:scrollSelectionIntoView
	{spellcheck}
	{autocorrect}
	{autocapitalize}
	{onKeyDown}
/>
