<svelte:options immutable />

<script lang="ts" context="module">
	export const PLUGINS_CONTEXT_KEY = createContextKey<IPluginsContext>();

	export function getPluginsContext() {
		return getFromContext(PLUGINS_CONTEXT_KEY);
	}

	export type IWithFn<E extends ISvelteEditor = ISvelteEditor> = (editor: E) => E;

	export type IBasePlugin<
		T extends ISvelteComponent<IElementProps> = ISvelteComponent<IElementProps>,
		E extends ISvelteEditor = ISvelteEditor
	> = {
		component: T;
		withFn?: IWithFn<E>;
	};

	export type IPlugin<
		T extends ISvelteComponent<IElementProps> = ISvelteComponent<IElementProps>,
		E extends ISvelteEditor = ISvelteEditor
	> = T | IBasePlugin<T, E>;

	export function isBasePlugin<
		T extends ISvelteComponent<IElementProps> = ISvelteComponent<IElementProps>,
		E extends ISvelteEditor = ISvelteEditor
	>(plugin: IPlugin<T, E>): plugin is IBasePlugin<T, E> {
		return 'component' in plugin;
	}

	export interface IPlugins<
		T extends ISvelteComponent<IElementProps> = ISvelteComponent<IElementProps>,
		E extends ISvelteEditor = ISvelteEditor
	> {
		[type: string]: IPlugin<T, E>;
	}

	export interface IPluginsContext {
		[type: string]: ISvelteComponent<IElementProps>;
	}

	function getCurrentEditor<T extends ISvelteComponent<IElementProps>, E extends ISvelteEditor>(
		originalEditor: E,
		plugins: IPlugins<T, E>
	) {
		return Object.values(plugins).reduce(
			(editor, plugin) => (isBasePlugin(plugin) && plugin.withFn ? plugin.withFn(editor) : editor),
			originalEditor
		);
	}
	function getCurrentPlugins<T extends ISvelteComponent<IElementProps>, E extends ISvelteEditor>(
		plugins: IPlugins<T, E>
	) {
		return Object.entries(plugins).reduce((plugins, [type, plugin]) => {
			plugins[type] = isBasePlugin(plugin) ? plugin.component : plugin;
			return plugins;
		}, {} as IPluginsContext);
	}
</script>

<script lang="ts">
	import type { IElementProps } from '$lib/components/InternalElement.svelte';
	import Slate from '$lib/components/Slate.svelte';
	import {
		createContext,
		createContextKey,
		getFromContext,
		type ISvelteComponent
	} from '$lib/utils';
	import type { ISvelteEditor } from '$lib/withSvelte';
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

<Slate bind:editor bind:value bind:selection on:value={onValue} on:selection={onSelection}
	><slot /></Slate
>
