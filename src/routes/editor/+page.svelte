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
			maxHeight: 256,
			children: [
				{
					type: 'code-line',
					children: [{ text: '' }]
				}
			]
		}
	];

	let readOnly = false;
</script>

<p>
	<a
		target="_blank"
		href="https://github.com/nathanfaucett/svelte-slate/blob/main/src/routes/editor/+page.svelte"
	>
		Source
	</a>
</p>

<div>
	<label for="readOnly">Read Only?</label>
	<input type="checkbox" name="readOnly" bind:checked={readOnly} />
</div>

<Slate {editor} bind:value>
	<div class="editor">
		<Editable {Element} {Leaf} placeholder="Enter some plain text..." {readOnly} />
	</div>
</Slate>

<style>
	.editor {
		padding: 0.25rem 0;
	}
</style>
