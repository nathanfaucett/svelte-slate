<svelte:options immutable />

<script lang="ts">
	import type { Text } from 'slate';

	export const leaf: Text = {
		text: "default",
	};
</script>

<span data-slate-leaf="true"><slot /></span>
