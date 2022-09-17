<script lang="ts">
	import { Slate, Editable, withSvelte } from '../';
	import { createEditor } from 'slate';
	import { withHistory } from 'slate-history';
	import Element from '../../example/Element.svelte';
	import Leaf from '../plugins/Leaf.svelte';
	import { withCode } from '../plugins/CodeElement.svelte';

	const editor = withHistory(withCode(withSvelte(createEditor())));
	let value = [
		{
			type: 'code',
			language: 'javascript',
			children: [
				{
					type: 'code-line',
					children: [{ text: '' }]
				}
			]
		}
	];
</script>

<p>
	<a
		target="_blank"
		href="https://github.com/nathanfaucett/svelte-slate/blob/main/src/routes/editor.svelte"
		>Source</a
	>
</p>

<Slate {editor} bind:value>
	<div class="editor">
		<Editable {Element} {Leaf} placeholder="Enter some plain text..." />
	</div>
</Slate>

<style>
	.editor {
		padding: 0.25rem 0;
	}
</style>
