<svelte:options immutable />

<script lang="ts">
	import type { Text } from 'slate';

	export const leaf: Text = {
		text: "example",
	};
</script>

<span data-slate-leaf="true"><slot /></span>
