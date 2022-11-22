<script lang="ts">
	import { withSvelte } from 'svelte-slate';
	import { createEditor } from 'slate';
	import { withHistory } from 'slate-history';
	import Editable from '$lib/plugins/Editable.svelte';
	import Slate from '$lib/plugins/Slate.svelte';

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
		rel="noreferrer"
		href="https://github.com/nathanfaucett/svelte-slate/blob/main/src/routes/default/+page.svelte"
	>
		Source
	</a>
</p>

<Slate {editor} bind:value>
	<Editable placeholder="Enter some plain text..." />
</Slate>
