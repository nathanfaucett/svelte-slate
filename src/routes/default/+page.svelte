<svelte:options immutable />

<script lang="ts">
	import { withSvelte } from '$lib';
	import { createEditor } from 'slate';
	import { withHistory } from 'slate-history';
	import Editable from '$lib/components/Editable.svelte';
	import Slate from '$lib/components/Slate.svelte';

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
