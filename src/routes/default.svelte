<script context="module">
	export const prerender = true;
</script>

<script lang="ts">
	import { Slate, Editable, withSvelte } from 'svelte-slate';
	import { createEditor } from 'slate';
	import { withHistory } from 'slate-history';

	const editor = withHistory(withSvelte(createEditor()));
	let value = [
		{
			children: [{ text: 'This is editable.' }]
		}
	];
</script>

<p>
	<a
		target="_blank"
		href="https://github.com/nathanfaucett/svelte-slate/blob/main/src/routes/default.svelte"
		>Source</a
	>
</p>

<Slate {editor} bind:value>
	<Editable placeholder="Enter some plain text..." />
</Slate>
