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
	import type { IElement } from '../example/Element.svelte';
	import type { IText } from '../example/Leaf.svelte';
	import Element from '../example/Element.svelte';
	import Leaf from '../example/Leaf.svelte';
	import { toggleMark } from '../example/utils';
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

	$: onKeyDown = (event: KeyboardEvent) => {
		for (const hotkey in HOTKEYS) {
			if (isHotkey(hotkey, event)) {
				event.preventDefault();
				const mark = HOTKEYS[hotkey];
				toggleMark(editor, mark);
			}
		}
	};
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
		<Editable {Element} {Leaf} {onKeyDown} placeholder="Enter some plain text..." />
	</div>
</Slate>

<style>
	.editor {
		padding: 0.25rem 0;
	}
</style>
