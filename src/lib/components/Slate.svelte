<script lang="ts" context="module">
	const EDITOR_CONTEXT_KEY = {};
	const READ_ONLY_CONTEXT_KEY = {};
	const FOCUSED_CONTEXT_KEY = {};
	const DECORATE_CONTEXT_KEY = {};
	const SELECTION_CONTEXT_KEY = {};

	export function getEditorContext() {
		const context = getContext<Writable<SvelteEditor>>(EDITOR_CONTEXT_KEY);
		if (!context) {
			throw new Error(
				`The \`getEditorContext\` must be used inside the Slate component's context.`
			);
		}
		return context;
	}
	export function getReadOnlyContext() {
		const context = getContext<Writable<boolean>>(READ_ONLY_CONTEXT_KEY);
		if (!context) {
			throw new Error(
				`The \`getReadOnlyContext\` must be used inside the Slate component's context.`
			);
		}
		return context;
	}
	export function getFocusedContext() {
		const context = getContext<Writable<boolean>>(FOCUSED_CONTEXT_KEY);
		if (!context) {
			throw new Error(
				`The \`getFocusedContext\` must be used inside the Slate component's context.`
			);
		}
		return context;
	}
	export function getDecorateContext() {
		const context = getContext<Writable<(entry: NodeEntry) => Range[]>>(DECORATE_CONTEXT_KEY);
		if (!context) {
			throw new Error(
				`The \`getDecorateContext\` must be used inside the Slate component's context.`
			);
		}
		return context;
	}
	export function getSelectionContext() {
		const context = getContext<Writable<Selection>>(SELECTION_CONTEXT_KEY);
		if (!context) {
			throw new Error(
				`The \`getSelectionContext\` must be used inside the Slate component's context.`
			);
		}
		return context;
	}

	export function defaultDecorate(_entry: NodeEntry): Range[] {
		return [];
	}
</script>

<script lang="ts">
	import { EDITOR_TO_ON_CHANGE } from '$lib/weakMaps';
	import type { SvelteEditor } from '$lib/withSvelte';
	import type { Descendant, Range, Editor, NodeEntry, Selection } from 'slate';
	import { setContext, getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { writable } from 'svelte/store';
	import { deepEqual } from 'fast-equals';

	export let editor: Editor;
	export let value: Descendant[] = editor.children;
	export let selection = editor.selection;

	const editorContext = writable(editor);
	setContext(EDITOR_CONTEXT_KEY, editorContext);

	const readOnlyContext = writable(true);
	setContext(READ_ONLY_CONTEXT_KEY, readOnlyContext);

	const focusedContext = writable(false);
	setContext(FOCUSED_CONTEXT_KEY, focusedContext);

	const decorateContext = writable(defaultDecorate);
	setContext(DECORATE_CONTEXT_KEY, decorateContext);

	const selectionContext = writable(editor.selection);
	setContext(SELECTION_CONTEXT_KEY, selectionContext);

	function onChange() {
		value = editor.children;
		selection = editor.selection;
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
	$: if (!deepEqual(prevSelection, selection)) {
		editorContext.set(editor);
		selectionContext.set(selection);
		prevSelection = selection;
	}
</script>

<slot />
