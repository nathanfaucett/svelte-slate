<svelte:options immutable />

<script lang="ts" context="module">
	export const PLUGINS_CONTEXT_KEY = createContextKey<IPluginsContext>();

	export function getPluginsContext() {
		return getFromContext(PLUGINS_CONTEXT_KEY);
	}

	export type IWithFn<E extends ISvelteEditor = ISvelteEditor, O extends object = object> = (
		editor: E,
		config?: O
	) => E;

	export type IPluginWithFn<
		C extends ISvelteComponent<IElementProps> = ISvelteComponent<IElementProps>,
		E extends ISvelteEditor = ISvelteEditor,
		O extends object = object
	> = {
		component: C;
		withFn?: IWithFn<E, O>;
		options?: O;
	};

	export type IPlugin<
		C extends ISvelteComponent<IElementProps> = ISvelteComponent<IElementProps>,
		E extends ISvelteEditor = ISvelteEditor,
		O extends object = object
	> = C | IPluginWithFn<C, E, O>;

	export function isPluginWithFn<
		C extends ISvelteComponent<IElementProps> = ISvelteComponent<IElementProps>,
		E extends ISvelteEditor = ISvelteEditor,
		O extends object = object
	>(plugin: IPlugin<C, E, O>): plugin is IPluginWithFn<C, E, O> {
		return 'component' in plugin;
	}

	export interface IPlugins<
		C extends ISvelteComponent<IElementProps> = ISvelteComponent<IElementProps>,
		E extends ISvelteEditor = ISvelteEditor,
		O extends object = object
	> {
		[type: string]: IPlugin<C, E, O>;
	}

	export interface IPluginsContext {
		[type: string]: ISvelteComponent<IElementProps>;
	}

	function getCurrentEditor<
		C extends ISvelteComponent<IElementProps>,
		E extends ISvelteEditor,
		O extends object = object
	>(originalEditor: E, plugins: IPlugins<C, E, O>) {
		return Object.values(plugins).reduce(
			(editor, plugin) =>
				isPluginWithFn(plugin) && plugin.withFn ? plugin.withFn(editor, plugin.options) : editor,
			originalEditor
		);
	}
	function getCurrentPlugins<
		C extends ISvelteComponent<IElementProps>,
		E extends ISvelteEditor,
		O extends object = object
	>(plugins: IPlugins<C, E, O>) {
		return Object.entries(plugins).reduce((plugins, [type, plugin]) => {
			plugins[type] = isPluginWithFn(plugin) ? plugin.component : plugin;
			return plugins;
		}, {} as IPluginsContext);
	}
</script>

<script lang="ts">
	import type { IElementProps } from '../components/InternalElement.svelte';
	import Slate from '../components/Slate.svelte';
	import { createContext, createContextKey, getFromContext, type ISvelteComponent } from '../utils';
	import type { ISvelteEditor } from '../withSvelte';
	import type { BaseSelection, Descendant } from 'slate';
	import { createEventDispatcher } from 'svelte';
	import { DEFAULT_PLUGINS } from './DEFAULT_PLUGINS';

	export let plugins: IPlugins = DEFAULT_PLUGINS;
	export let editor: ISvelteEditor;
	export let value: Descendant[] = editor.children;
	export let selection = editor.selection;

	const dispatch = createEventDispatcher<{ value: Descendant[]; selection: BaseSelection }>();

	function onValue(e: CustomEvent<Descendant[]>) {
		dispatch('value', e.detail);
	}
	function onSelection(e: CustomEvent<BaseSelection>) {
		dispatch('selection', e.detail);
	}

	let originalEditor = editor;
	$: editor = getCurrentEditor(originalEditor, plugins);
	$: currentPlugins = getCurrentPlugins(plugins);

	const pluginsContext = createContext(PLUGINS_CONTEXT_KEY, currentPlugins);

	$: pluginsContext.set(currentPlugins);
</script>

<Slate bind:editor bind:value bind:selection on:value={onValue} on:selection={onSelection}>
	<slot />
</Slate>
