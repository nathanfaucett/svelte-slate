<script lang="ts" context="module">
	export const prerender = true;

	const HOTKEYS = {
		'mod+b': 'bold',
		'mod+i': 'italic',
		'mod+u': 'underline',
		'mod+`': 'code'
	};
</script>

<script lang="ts">
	import { Slate, Editable, withSvelte, isHotkey } from 'svelte-slate';
	import { createEditor } from 'slate';
	import { withHistory } from 'slate-history';
	import Element from '../example/Element.svelte';
	import Leaf from '$lib/plugins/Leaf.svelte';
	import { withCheckListItems } from '$lib/plugins/CheckListItemElement.svelte';
	import CheckListItemButton from '../example/CheckListItemButton.svelte';
	import { withImages } from '$lib/plugins/ImageElement.svelte';
	import ImageButton from '../example/ImageButton.svelte';
	import MarkButton from '../example/MarkButton.svelte';
	import BlockButton from '../example/BlockButton.svelte';
	import { toggleMark } from '$lib/plugins/utils';
	import VoidButton from '../example/VoidButton.svelte';
	import { withVoids } from '../example/VoidElement.svelte';
	import CodeButton from '../example/CodeButton.svelte';
	import { withCode } from '$lib/plugins/CodeElement.svelte';
	import MdFormatBold from 'svelte-icons/md/MdFormatBold.svelte';
	import MdCode from 'svelte-icons/md/MdCode.svelte';
	import MdLooksOne from 'svelte-icons/md/MdLooksOne.svelte';
	import MdLooksTwo from 'svelte-icons/md/MdLooksTwo.svelte';
	import MdFormatItalic from 'svelte-icons/md/MdFormatItalic.svelte';
	import MdFormatUnderlined from 'svelte-icons/md/MdFormatUnderlined.svelte';
	import MdFormatListNumbered from 'svelte-icons/md/MdFormatListNumbered.svelte';
	import MdFormatListBulleted from 'svelte-icons/md/MdFormatListBulleted.svelte';
	import MdFormatQuote from 'svelte-icons/md/MdFormatQuote.svelte';

	const editor = withHistory(
		withCode(withVoids(withImages(withCheckListItems(withSvelte(createEditor())))))
	);
	let value = [
		{
			type: 'paragraph',
			children: [
				{ text: 'This is editable ' },
				{ text: 'rich', bold: true },
				{ text: ' text, ' },
				{ text: 'much', italic: true },
				{ text: ' better than a ' },
				{ text: '<textarea>', code: true },
				{ text: '!' }
			]
		},
		{
			type: 'paragraph',
			children: [
				{
					text: "Since it's rich text, you can do things like turn a selection of text "
				},
				{ text: 'bold', bold: true },
				{
					text: ', or add a semantically rendered block quote in the middle of the page, like this:'
				}
			]
		},
		{
			type: 'block-quote',
			children: [{ text: 'A wise quote.' }]
		},
		{
			type: 'image',
			url: 'https://source.unsplash.com/kFrdX5IeQzI',
			children: [{ text: '' }]
		},
		{
			type: 'paragraph',
			children: [{ text: 'Try it out for yourself!' }]
		},
		{
			type: 'check-list-item',
			checked: true,
			children: [{ text: 'Checked list item' }]
		},
		{
			type: 'check-list-item',
			checked: false,
			children: [{ text: 'Todo' }]
		},
		{
			type: 'paragraph',
			children: [
				{ text: 'Test' },
				{
					type: 'void',
					value: '',
					children: [{ text: '' }]
				}
			]
		},
		{
			type: 'code',
			language: 'javascript',
			children: [
				{
					type: 'code-line',
					children: [{ text: 'console.log("Hello world!");' }]
				}
			]
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

<p>
	<a
		target="_blank"
		href="https://github.com/nathanfaucett/svelte-slate/blob/main/src/routes/richtext.svelte"
		>Source</a
	>
</p>

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
		<ImageButton />
		<CheckListItemButton />
		<VoidButton />
		<CodeButton />
	</div>
	<div class="editor">
		<Editable {Element} {Leaf} {onKeyDown} placeholder="Enter some plain text..." />
	</div>
</Slate>

<style>
	.toolbar {
		border-bottom: 1px solid black;
		padding: 0.25rem 0;
	}
	.editor {
		padding: 0.25rem 0;
	}
</style>
