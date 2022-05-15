<svelte:options immutable />

<script lang="ts" context="module">
	export const PLUGINS_CONTEXT_KEY = createContextKey<IPluginsContext>();

	export function getPluginsContext() {
		return getFromContext(PLUGINS_CONTEXT_KEY);
	}

	export type IWithFn<E extends ISvelteEditor = ISvelteEditor> = (editor: E) => E;

	export type IPlugin<
		T extends ISvelteComponent<IElementProps> = ISvelteComponent<IElementProps>,
		E extends ISvelteEditor = ISvelteEditor
	> = T | [component: T, withFn?: IWithFn<E>];

	export interface IPlugins<
		T extends ISvelteComponent<IElementProps> = ISvelteComponent<IElementProps>,
		E extends ISvelteEditor = ISvelteEditor
	> {
		[type: string]: IPlugin<T, E>;
	}

	export interface IPluginsContext {
		[type: string]: ISvelteComponent<IElementProps>;
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
	import type { Descendant } from 'slate';
	import { DEFAULT_PLUGINS } from './DEFAULT_PLUGINS';

	export let plugins: IPlugins = DEFAULT_PLUGINS;
	export let editor: ISvelteEditor;
	export let value: Descendant[] = editor.children;
	export let selection = editor.selection;

	let originalEditor = editor;
	let currentEditor = Object.values(plugins).reduce(
		(editor, plugin) => (Array.isArray(plugin) ? plugin[1](editor) : editor),
		originalEditor
	);
	let currentPlugins = Object.entries(plugins).reduce((plugins, [type, plugin]) => {
		plugins[type] = Array.isArray(plugin) ? plugin[0] : plugin;
		return plugins;
	}, {} as IPlugins);

	$: if (originalEditor !== editor) {
		originalEditor = editor;
	}

	let prevPlugins = plugins;
	$: if (prevPlugins !== plugins) {
		prevPlugins = plugins;
		currentPlugins = Object.entries(plugins).reduce((plugins, [type, plugin]) => {
			plugins[type] = Array.isArray(plugin) ? plugin[0] : plugin;
			return plugins;
		}, {} as IPlugins);
		currentEditor = Object.values(plugins).reduce(
			(editor, plugin) => (Array.isArray(plugin) ? plugin[1](editor) : editor),
			originalEditor
		);
	}

	const pluginsContext = createContext(PLUGINS_CONTEXT_KEY, currentPlugins);

	$: pluginsContext.set(currentPlugins);
</script>

<Slate bind:editor={currentEditor} bind:value bind:selection><slot /></Slate>
