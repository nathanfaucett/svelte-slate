<script lang="ts">
	import { findPath } from '$lib/utils';
	import type { SvelteEditor } from '$lib/withSvelte';
	import type { Text as SlateText, Element as SlateElement } from 'slate';
	import { Node, Editor, Path } from 'slate';
	import TextString from './TextString.svelte';
	import ZeroWidthString from './ZeroWidthString.svelte';

	export let editor: SvelteEditor;
	export let isLast: boolean;
	export let leaf: SlateText;
	export let parent: SlateElement;
	export let text: SlateText;

	let currentEditor: SvelteEditor;
	let prevEditor: SvelteEditor;
	$: if (prevEditor !== editor) {
		currentEditor = editor;
		prevEditor = editor;
	}
	let currentLeaf: SlateText;
	let prevLeaf: SlateText;
	$: if (prevLeaf !== leaf) {
		currentLeaf = leaf;
		prevLeaf = leaf;
	}
	let currentText: SlateText;
	let prevText: SlateText;
	$: if (prevText !== text) {
		currentText = text;
		prevText = text;
	}

	$: isTrailing = isLast && currentLeaf.text.slice(-1) === '\n';
	$: path = findPath(currentText);
	$: parentPath = Path.parent(path);
</script>

{#if currentEditor.isVoid(parent)}<ZeroWidthString
		length={Node.string(parent).length}
	/>{:else if currentLeaf.text === '' && parent.children[parent.children.length - 1] === text && !currentEditor.isInline(parent) && Editor.string(currentEditor, parentPath) === ''}<ZeroWidthString
		isLineBreak
	/>{:else if currentLeaf.text === ''}<ZeroWidthString />{:else}<TextString
		{isTrailing}
		text={currentLeaf.text}
	/>{/if}
