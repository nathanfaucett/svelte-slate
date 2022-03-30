<script lang="ts" context="module">
	export const EDITOR_CONTEXT_KEY = createContextKey<ISvelteEditor>();
	export const READ_ONLY_CONTEXT_KEY = createContextKey<boolean>();
	export const FOCUSED_CONTEXT_KEY = createContextKey<boolean>();
	export const DECORATE_CONTEXT_KEY = createContextKey<(entry: NodeEntry) => Range[]>();
	export const SELECTION_CONTEXT_KEY = createContextKey<Selection | null>();

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
	export function defaultDecorate(_entry: NodeEntry): Range[] {
		return [];
	}
</script>

<script lang="ts">
	import { EDITOR_TO_ON_CHANGE } from '../weakMaps';
	import type { ISvelteEditor } from '../withSvelte';
	import type { Descendant, Range, NodeEntry, Selection } from 'slate';
	import { get } from 'svelte/store';
	import { getFromContext, createContextKey, isSelectionEqual, createContext } from '$lib/utils';

	export let editor: ISvelteEditor;
	export let value: Descendant[] = editor.children;
	export let selection = editor.selection;

	const editorContext = createContext(EDITOR_CONTEXT_KEY, editor);
	const selectionContext = createContext(SELECTION_CONTEXT_KEY, editor.selection);
	createContext(READ_ONLY_CONTEXT_KEY, true);
	createContext(FOCUSED_CONTEXT_KEY, false);
	createContext(DECORATE_CONTEXT_KEY, defaultDecorate);

	function onChange() {
		selection = editor.selection;
		value = editor.children;
	}
	EDITOR_TO_ON_CHANGE.set(editor, onChange);

	let prevEditor = editor;
	$: if (editor !== prevEditor) {
		prevEditor = editor;
		editorContext.set(editor);
	}

	let prevValue: Descendant[];
	$: if (prevValue !== value) {
		editorContext.update((state) => {
			state.children = value;
			return state;
		});
		prevValue = value;
	}

	let prevSelection: Selection;
	$: if (!isSelectionEqual(prevSelection, selection)) {
		selectionContext.set(selection);
		editorContext.set(editor);
		prevSelection = selection;
	}
</script>

<slot />
