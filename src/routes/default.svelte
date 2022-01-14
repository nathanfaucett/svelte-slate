<script lang="ts">
	import { Slate, Editable, withSvelte } from 'svelte-slate';
	import { createEditor } from 'slate';
	import { withHistory } from 'slate-history';

	const editor = withHistory(withSvelte(createEditor()));
	let value = [
		{
			children: [{ text: 'This is editable' }]
		}
	];
</script>

<Slate {editor} bind:value>
	<Editable placeholder="Enter some plain text..." />
</Slate>
