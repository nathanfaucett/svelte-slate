<script lang="ts">
	import { withSvelte } from 'svelte-slate';
	import Slate from 'svelte-slate/plugins/Slate.svelte';
	import Editable from 'svelte-slate/plugins/Editable.svelte';
	import { createEditor } from 'slate';
	import { withHistory } from 'slate-history';
	import { DEFAULT_PLUGINS } from 'svelte-slate/plugins/DEFAULT_PLUGINS';
	import ImageElement, { IMAGE_TYPE, withImages } from '$lib/plugins/ImageElement.svelte';
	import { CHECK_LIST_ITEM_TYPE } from '$lib/plugins/CheckListItemElement.svelte';
	import { CheckListItemElement } from '$lib/plugins';
	import CodeElement, { CODE_TYPE, withCode } from '$lib/plugins/CodeElement.svelte';

	const editor = withHistory(withSvelte(createEditor()));
	let plugins = {
		...DEFAULT_PLUGINS,
		[IMAGE_TYPE]: [ImageElement, withImages],
		[CHECK_LIST_ITEM_TYPE]: CheckListItemElement,
		[CODE_TYPE]: [CodeElement, withCode]
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
</script>

<p>
	<a
		target="_blank"
		href="https://github.com/nathanfaucett/svelte-slate/blob/main/src/routes/plugins.svelte"
		>Source</a
	>
</p>

<Slate {editor} {plugins} bind:value>
	<div class="editor">
		<Editable placeholder="Enter some plain text..." />
	</div>
</Slate>

<style>
	.editor {
		padding: 0.25rem 0;
	}
</style>
