<script lang="ts">
	import { isReadOnly, withSvelte } from 'svelte-slate';
	import Slate from 'svelte-slate/plugins/Slate.svelte';
	import Editable from 'svelte-slate/plugins/Editable.svelte';
	import { createEditor, Editor, type BaseRange } from 'slate';
	import { withHistory } from 'slate-history';
	import { DEFAULT_PLUGINS } from 'svelte-slate/plugins/DEFAULT_PLUGINS';
	import ImageElement, { IMAGE_TYPE, withImages } from '$lib/plugins/ImageElement.svelte';
	import { longpress } from '$lib/plugins/longpress';
	import ImageButton from '../example/ImageButton.svelte';
	import CodeButton from '../example/CodeButton.svelte';
	import CheckListItemButton from '../example/CheckListItemButton.svelte';
	import MarkButton from '../example/MarkButton.svelte';
	import BlockButton from '../example/BlockButton.svelte';
	import CodeElement, { CODE_TYPE, isCodeElement, withCode } from '$lib/plugins/CodeElement.svelte';
	import HoveringToolbar from '$lib/plugins/HoveringToolbar.svelte';
	import MdFormatBold from 'svelte-icons/md/MdFormatBold.svelte';
	import MdCode from 'svelte-icons/md/MdCode.svelte';
	import MdLooksOne from 'svelte-icons/md/MdLooksOne.svelte';
	import MdLooksTwo from 'svelte-icons/md/MdLooksTwo.svelte';
	import MdFormatItalic from 'svelte-icons/md/MdFormatItalic.svelte';
	import MdFormatUnderlined from 'svelte-icons/md/MdFormatUnderlined.svelte';
	import MdFormatListNumbered from 'svelte-icons/md/MdFormatListNumbered.svelte';
	import MdFormatListBulleted from 'svelte-icons/md/MdFormatListBulleted.svelte';
	import MdFormatQuote from 'svelte-icons/md/MdFormatQuote.svelte';
	import MathButton from '../example/MathButton.svelte';
	import MathElement, { MATH_TYPE, withMath } from '$lib/plugins/MathElement.svelte';

	const editor = withHistory(withSvelte(createEditor()));
	let plugins = {
		...DEFAULT_PLUGINS,
		[IMAGE_TYPE]: { component: ImageElement, withFn: withImages },
		[CODE_TYPE]: { component: CodeElement, withFn: withCode },
		[MATH_TYPE]: { component: MathElement, withFn: withMath }
	};
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
			type: 'math',
			inline: false,
			math: '\\frac{\\pi}{2}',
			children: [{ text: '' }]
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
		},
		{
			type: 'heading3',
			children: [{ text: 'Numbered Lists' }]
		},
		{
			type: 'numbered-list',
			children: [
				{
					type: 'list-item',
					children: [{ text: 'One' }]
				},
				{
					type: 'list-item',
					children: [{ text: 'Two' }]
				}
			]
		},
		{
			type: 'heading3',
			children: [{ text: 'Bulleted Lists' }]
		},
		{
			type: 'bulleted-list',
			children: [
				{
					type: 'list-item',
					children: [{ text: 'One' }]
				},
				{
					type: 'list-item',
					children: [{ text: 'Two' }]
				}
			]
		}
	];

	let open = false;
	let ref: HTMLDivElement;

	function onLongPress() {
		if (!isReadOnly(editor)) {
			const [match] = Array.from(
				Editor.nodes(editor, {
					at: Editor.unhangRange(editor, editor.selection as BaseRange),
					match: isCodeElement as any
				})
			);
			if (!match) {
				open = true;
			}
		}
	}
</script>

<p>
	<a
		target="_blank"
		href="https://github.com/nathanfaucett/svelte-slate/blob/main/src/routes/plugins.svelte"
		>Source</a
	>
</p>

<Slate {editor} {plugins} bind:value>
	<HoveringToolbar container={ref} bind:open>
		<div class="toolbar">
			<MarkButton format="bold"><MdFormatBold /></MarkButton>
			<MarkButton format="italic"><MdFormatItalic /></MarkButton>
			<MarkButton format="underline"><MdFormatUnderlined /></MarkButton>
			<MarkButton format="code"><MdCode /></MarkButton>
			<BlockButton format="heading1"><MdLooksOne /></BlockButton>
			<BlockButton format="heading2"><MdLooksTwo /></BlockButton>
			<BlockButton format="block-quote"><MdFormatQuote /></BlockButton>
			<BlockButton format="numbered-list"><MdFormatListNumbered /></BlockButton>
			<BlockButton format="bulleted-list"><MdFormatListBulleted /></BlockButton>
			<ImageButton />
			<CheckListItemButton />
			<CodeButton />
			<MathButton />
		</div>
	</HoveringToolbar>
	<div class="editor" use:longpress on:longpress={onLongPress}>
		<Editable bind:ref placeholder="Enter some plain text..." />
	</div>
</Slate>

<style>
	.editor {
		padding: 0.25rem 0;
	}
	.toolbar {
		background-color: white;
		border: 1px solid black;
		padding: 0.25rem;
	}
</style>
