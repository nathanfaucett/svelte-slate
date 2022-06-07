<svelte:options immutable />

<script lang="ts" context="module">
	export const PLUGINS_CONTEXT_KEY = createContextKey<IPluginsContext>();
	export const ON_CLICK_CONTEXT_KEY = createContextKey<svelteHTML.MouseEventHandler<HTMLElement>>();
	export const ON_KEY_DOWN_CONTEXT_KEY =
		createContextKey<svelteHTML.KeyboardEventHandler<HTMLElement>>();

	export function getPluginsContext() {
		return getFromContext(PLUGINS_CONTEXT_KEY);
	}

	export function getOnClickContext() {
		return getFromContext(ON_CLICK_CONTEXT_KEY);
	}

	export function getOnKeyDownContext() {
		return getFromContext(ON_KEY_DOWN_CONTEXT_KEY);
	}

	export type IWithFn<E extends ISvelteEditor = ISvelteEditor> = (editor: E) => E;

	export interface IPluginEvents {
		onClick: svelteHTML.MouseEventHandler<HTMLElement>;
		onKeyDown: svelteHTML.KeyboardEventHandler<HTMLElement>;
	}

	export type IBasePlugin<
		T extends ISvelteComponent<IElementProps> = ISvelteComponent<IElementProps>,
		E extends ISvelteEditor = ISvelteEditor
	> = {
		component: T;
		withFn?: IWithFn<E>;
	} & Partial<IPluginEvents>;

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
			plugins[type] = Array.isArray(plugin) ? plugin[0] : plugin;
			return plugins;
		}, {} as IPluginsContext);
	}
	function getCurrentEvent<
		K extends keyof IPluginEvents,
		T extends ISvelteComponent<IElementProps>,
		E extends ISvelteEditor
	>(name: K, plugins: IPlugins<T, E>): IPluginEvents[K] {
		const handlers = Object.values(plugins)
			.map((plugin) => (isBasePlugin(plugin) ? plugin[name] : undefined))
			.filter((plugin) => !!plugin) as Array<IPluginEvents[K]>;

		return (event: any) => {
			let returnValue = undefined;
			for (const handler of handlers) {
				returnValue = handler(event);
				if (event.defaultPrevented || returnValue === false) {
					break;
				}
			}
			return returnValue;
		};
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
	$: editor = getCurrentEditor(originalEditor, plugins);
	$: currentPlugins = getCurrentPlugins(plugins);
	$: onClick = getCurrentEvent('onClick', plugins);
	$: onKeyDown = getCurrentEvent('onKeyDown', plugins);

	const pluginsContext = createContext(PLUGINS_CONTEXT_KEY, currentPlugins);
	const onClickContext = createContext(ON_CLICK_CONTEXT_KEY, onClick);
	const onKeyDownContext = createContext(ON_KEY_DOWN_CONTEXT_KEY, onKeyDown);

	$: pluginsContext.set(currentPlugins);
	$: onClickContext.set(onClick);
	$: onKeyDownContext.set(onKeyDown);
</script>

<Slate bind:editor bind:value bind:selection><slot /></Slate>
