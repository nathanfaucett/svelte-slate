<script lang="ts">
	import { PluginSlate, PluginEditable, withSvelte } from 'svelte-slate';
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

<PluginSlate {editor} bind:value>
	<PluginEditable placeholder="Enter some plain text..." />
</PluginSlate>
