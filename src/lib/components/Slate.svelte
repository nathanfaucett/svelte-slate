<svelte:options immutable />

<script lang="ts" context="module">
	import type { ISvelteEditor } from '../withSvelte';
	import type { Descendant, Range, NodeEntry, Selection, BaseSelection } from 'slate';
	import { get, type Writable } from 'svelte/store';
	import { getFromContext, createContextKey, isSelectionEqual, createContext } from '../utils';
	import { onMount, createEventDispatcher } from 'svelte';
	import { EDITOR_TO_ON_CHANGE } from '../weakMaps';

	export const EDITOR_CONTEXT_KEY = createContextKey<ISvelteEditor>();
	export const READ_ONLY_CONTEXT_KEY = createContextKey<boolean>();
	export const FOCUSED_CONTEXT_KEY = createContextKey<boolean>();
	export const DECORATE_CONTEXT_KEY = createContextKey<(entry: NodeEntry) => Range[]>();
	export const SELECTION_CONTEXT_KEY = createContextKey<Selection | null>();
	export const VALUE_CONTEXT_KEY = createContextKey<Descendant[]>();
	export const EVENTS_CONTEXT_KEY = createContextKey<Partial<IEvents>>();
	export const CONTAINER_CONTEXT_KEY = createContextKey<HTMLDivElement | undefined>();

	export type IEvents = {
		onBeforeInput: svelteHTML.EventHandler<InputEvent, HTMLElement>[];
		onKeyDown: svelteHTML.KeyboardEventHandler<HTMLElement>[];
		onKeyUp: svelteHTML.KeyboardEventHandler<HTMLElement>[];
		onKeyPress: svelteHTML.KeyboardEventHandler<HTMLElement>[];
		onInput: svelteHTML.EventHandler<InputEvent, HTMLElement>[];
		onFocus: svelteHTML.EventHandler<FocusEvent, HTMLElement>[];
		onBlur: svelteHTML.EventHandler<FocusEvent, HTMLElement>[];
		onClick: svelteHTML.MouseEventHandler<HTMLElement>[];
		onCompositionEnd: svelteHTML.EventHandler<CompositionEvent, HTMLElement>[];
		onCompositionUpdate: svelteHTML.EventHandler<CompositionEvent, HTMLElement>[];
		onCompositionStart: svelteHTML.EventHandler<CompositionEvent, HTMLElement>[];
		onPaste: svelteHTML.EventHandler<ClipboardEvent, HTMLElement>[];
		onCopy: svelteHTML.EventHandler<ClipboardEvent, HTMLElement>[];
		onCut: svelteHTML.EventHandler<ClipboardEvent, HTMLElement>[];
		onDragOver: svelteHTML.EventHandler<DragEvent, HTMLElement>[];
		onDragStart: svelteHTML.EventHandler<DragEvent, HTMLElement>[];
		onDrop: svelteHTML.EventHandler<DragEvent, HTMLElement>[];
		onDragEnd: svelteHTML.EventHandler<DragEvent, HTMLElement>[];
	};
	export type IEventType<K extends keyof IEvents> = IEvents[K] extends svelteHTML.EventHandler<
		infer E
	>[]
		? E
		: Event;

	export function addEventListener<K extends keyof IEvents>(
		name: K,
		handler: svelteHTML.EventHandler<IEventType<K>, HTMLElement>,
		onRemove?: () => void
	) {
		const eventsContext = getEventsContext();
		onMount(() => {
			eventsContext.update((state) => {
				const handlers: IEvents[K] = state[name] || ([] as any);
				return { ...state, [name]: [...handlers, handler] };
			});
			return () => {
				eventsContext.update((state) => {
					const handlers: IEvents[K] = state[name] || ([] as any);
					const index = handlers.indexOf(handler as any);

					if (index === -1) {
						return state;
					} else {
						const newHandlers = handlers.slice();
						newHandlers.splice(index, 1);
						return { ...state, [name]: newHandlers };
					}
				});
				if (onRemove) {
					onRemove();
				}
			};
		});
	}

	export function handleEvent<K extends keyof IEvents, T extends Event>(
		eventsContext: Writable<Partial<IEvents>>,
		name: K,
		event: T
	) {
		const events = get(eventsContext);
		const handlers = events[name] || ([] as any);

		for (const handler of handlers) {
			const returnValue = handler(event as any);
			if (returnValue === false || event.cancelBubble) {
				return returnValue;
			}
		}
	}

	export function getEditorContext() {
		return getFromContext(EDITOR_CONTEXT_KEY);
	}
	export function getEditor() {
		return get(getEditorContext());
	}
	export function getReadOnlyContext() {
		return getFromContext(READ_ONLY_CONTEXT_KEY);
	}
	export function getFocusedContext() {
		return getFromContext(FOCUSED_CONTEXT_KEY);
	}
	export function getDecorateContext() {
		return getFromContext(DECORATE_CONTEXT_KEY);
	}
	export function getSelectionContext() {
		return getFromContext(SELECTION_CONTEXT_KEY);
	}
	export function getValueContext() {
		return getFromContext(VALUE_CONTEXT_KEY);
	}
	export function getEventsContext() {
		return getFromContext(EVENTS_CONTEXT_KEY);
	}
	export function getContainerContext() {
		return getFromContext(CONTAINER_CONTEXT_KEY);
	}
	export function defaultDecorate(_entry: NodeEntry): Range[] {
		return [];
	}
</script>

<script lang="ts">
	export let editor: ISvelteEditor;
	export let value: Descendant[] = editor.children;
	export let selection = editor.selection;

	const dispatch = createEventDispatcher<{ value: Descendant[]; selection: BaseSelection }>();

	const editorContext = createContext(EDITOR_CONTEXT_KEY, editor);
	const selectionContext = createContext(SELECTION_CONTEXT_KEY, editor.selection);
	const valueContext = createContext(VALUE_CONTEXT_KEY, editor.children);
	createContext(READ_ONLY_CONTEXT_KEY, true);
	createContext(FOCUSED_CONTEXT_KEY, false);
	createContext(DECORATE_CONTEXT_KEY, defaultDecorate);
	createContext(EVENTS_CONTEXT_KEY, {});
	createContext(CONTAINER_CONTEXT_KEY, undefined);

	function onChange() {
		selection = editor.selection;
		value = editor.children;

    const isValueChange = editor.operations.some(op => 'set_selection' !== op.type);

    if (isValueChange) {
		  dispatch('value', value);
    }

		dispatch('selection', selection);
	}
	EDITOR_TO_ON_CHANGE.set(editor, onChange);

	let currentEditor = editor;
	$: if (currentEditor !== editor) {
		currentEditor = editor;
		EDITOR_TO_ON_CHANGE.set(editor, onChange);
		editorContext.set(editor);
	}

	let currentValue: Descendant[];
	$: if (currentValue !== value) {
		editorContext.update((editor) => {
			editor.children = value;
			return editor;
		});
		currentValue = value;
		valueContext.set(value);
		dispatch('value', value);
	}

	let currentSelection: Selection;
	$: if (!isSelectionEqual(currentSelection, selection)) {
		selectionContext.set(selection);
		editorContext.set(editor);
		currentSelection = selection;
		dispatch('selection', selection);
	}
</script>

<slot />
