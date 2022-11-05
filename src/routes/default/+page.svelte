<script lang="ts">
	import { withSvelte } from 'svelte-slate';
	import { Slate, Editable } from 'svelte-slate/plugins';
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
		href="https://github.com/nathanfaucett/svelte-slate/blob/main/src/routes/default/+page.svelte"
	>
		Source
	</a>
</p>

<Slate {editor} bind:value>
	<Editable placeholder="Enter some plain text..." />
</Slate>
