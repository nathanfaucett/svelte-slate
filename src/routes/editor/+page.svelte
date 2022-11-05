<script lang="ts">
	import { withSvelte, Slate, Editable } from 'svelte-slate';
	import { Leaf, withCode } from 'svelte-slate/plugins';
	import { createEditor } from 'slate';
	import { withHistory } from 'slate-history';
	import Element from '../../example/Element.svelte';

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
		href="https://github.com/nathanfaucett/svelte-slate/blob/main/src/routes/editor/+page.svelte"
	>
		Source
	</a>
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
