<script lang="ts" context="module">
	const HOTKEYS = {
		'mod+b': 'bold',
		'mod+i': 'italic',
		'mod+u': 'underline',
		'mod+`': 'code'
	};
</script>

<script lang="ts">
	import { Slate, Editable, withSvelte } from 'svelte-slate';
	import { createEditor } from 'slate';
	import { withHistory } from 'slate-history';
	import type { IElement } from '../example/Element.svelte';
	import type { IText } from '../example/Leaf.svelte';
	import Element from '../example/Element.svelte';
	import Leaf from '../example/Leaf.svelte';
	import MarkButton from '../example/MarkButton.svelte';
	import BlockButton from '../example/BlockButton.svelte';
	import CodeButton from '../example/CodeButton.svelte';
	import { toggleMark } from '../example/utils';
	import MdFormatBold from 'svelte-icons/md/MdFormatBold.svelte';
	import MdCode from 'svelte-icons/md/MdCode.svelte';
	import MdLooksOne from 'svelte-icons/md/MdLooksOne.svelte';
	import MdLooksTwo from 'svelte-icons/md/MdLooksTwo.svelte';
	import MdFormatItalic from 'svelte-icons/md/MdFormatItalic.svelte';
	import MdFormatUnderlined from 'svelte-icons/md/MdFormatUnderlined.svelte';
	import MdFormatListNumbered from 'svelte-icons/md/MdFormatListNumbered.svelte';
	import MdFormatListBulleted from 'svelte-icons/md/MdFormatListBulleted.svelte';
	import MdFormatQuote from 'svelte-icons/md/MdFormatQuote.svelte';
	import isHotkey from 'is-hotkey';

	const editor = withHistory(withSvelte(createEditor()));
	let value: Array<IText | IElement> = [
		// {
		// 	type: 'paragraph',
		// 	children: [
		// 		{ text: 'This is editable ' },
		// 		{ text: 'rich', bold: true },
		// 		{ text: ' text, ' },
		// 		{ text: 'much', italic: true },
		// 		{ text: ' better than a ' },
		// 		{ text: '<textarea>', code: true },
		// 		{ text: '!' }
		// 	]
		// },
		// {
		// 	type: 'paragraph',
		// 	children: [
		// 		{
		// 			text: "Since it's rich text, you can do things like turn a selection of text "
		// 		},
		// 		{ text: 'bold', bold: true },
		// 		{
		// 			text: ', or add a semantically rendered block quote in the middle of the page, like this:'
		// 		}
		// 	]
		// },
		// {
		// 	type: 'block-quote',
		// 	children: [{ text: 'A wise quote.' }]
		// },
		// {
		// 	type: 'paragraph',
		// 	children: [{ text: 'Try it out for yourself!' }]
		// },
		{
			type: 'code',
			language: 'js',
			children: [{ text: 'const fac = (x) => x > 0 ? 1 : x * fac(x - 1);' }]
		}
	];

	function onKeyDown(event: KeyboardEvent) {
		for (const hotkey in HOTKEYS) {
			if (isHotkey(hotkey, event)) {
				event.preventDefault();
				const mark = HOTKEYS[hotkey];
				toggleMark(editor, mark);
			}
		}
	}
</script>

<div class="container">
	<Slate {editor} bind:value>
		<div class="toolbar">
			<MarkButton format="bold"><MdFormatBold /></MarkButton>
			<MarkButton format="italic"><MdFormatItalic /></MarkButton>
			<MarkButton format="underline"><MdFormatUnderlined /></MarkButton>
			<MarkButton format="code"><MdCode /></MarkButton>
			<BlockButton format="heading-one"><MdLooksOne /></BlockButton>
			<BlockButton format="heading-two"><MdLooksTwo /></BlockButton>
			<BlockButton format="block-quote"><MdFormatQuote /></BlockButton>
			<BlockButton format="numbered-list"><MdFormatListNumbered /></BlockButton>
			<BlockButton format="bulleted-list"><MdFormatListBulleted /></BlockButton>
			<CodeButton />
		</div>
		<div class="editor">
			<Editable {Element} {Leaf} {onKeyDown} placeholder="Enter some plain text..." />
		</div>
	</Slate>
</div>

<style>
	.container {
		max-width: 768px;
		margin: 0 auto;
	}
	.toolbar {
		border-bottom: 1px solid #888;
		padding: 0.25rem 0;
	}
	.editor {
		padding: 0.25rem 0;
	}
</style>
