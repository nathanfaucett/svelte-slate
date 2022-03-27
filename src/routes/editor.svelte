<script lang="ts" context="module">
	export const prerender = true;
</script>

<script lang="ts">
	import { Slate, Editable, withSvelte } from 'svelte-slate';
	import { createEditor } from 'slate';
	import { withHistory } from 'slate-history';
	import type { IElement } from '../example/Element.svelte';
	import type { IText } from '../example/Leaf.svelte';
	import Element from '../example/Element.svelte';
	import Leaf from '../example/Leaf.svelte';
	import { withCode } from '../example/CodeElement.svelte';

	const editor = withHistory(withCode(withSvelte(createEditor())));
	let value: Array<IText | IElement> = [
		{
			type: 'code',
			language: 'js',
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
