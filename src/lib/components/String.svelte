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

	$: isTrailing = isLast && leaf.text.slice(-1) === '\n';
	$: path = findPath(text);
	$: parentPath = Path.parent(path);
</script>

{#if editor.isVoid(parent)}<ZeroWidthString
		length={Node.string(parent).length}
	/>{:else if leaf.text === '' && parent.children[parent.children.length - 1] === text && !editor.isInline(parent) && Editor.string(editor, parentPath) === ''}<ZeroWidthString
		isLineBreak
	/>{:else if leaf.text === ''}<ZeroWidthString />{:else}<TextString
		{isTrailing}
		text={leaf.text}
	/>{/if}
