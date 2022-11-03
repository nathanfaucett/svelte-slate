<script lang="ts">
	import { withSvelte } from 'svelte-slate/withSvelte';
	import { createEditor } from 'slate';
	import { withHistory } from 'slate-history';
	import Element from '../../example/Element.svelte';
	import Leaf from 'svelte-slate/plugins/Leaf.svelte';
	import { withCode } from 'svelte-slate/plugins/CodeElement.svelte';
	import Slate from 'svelte-slate/components/Slate.svelte';
	import Editable from 'svelte-slate/components/Editable.svelte';

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
