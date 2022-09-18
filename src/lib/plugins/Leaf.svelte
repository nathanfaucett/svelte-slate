<svelte:options immutable />

<script lang="ts" context="module">
	export interface IText extends Text {
		bold?: boolean;
		italic?: boolean;
		code?: boolean;
		underline?: boolean;
	}
</script>

<script lang="ts">
	import type { Text } from 'slate';

	export let leaf: IText;
</script>

<span
	data-slate-leaf="true"
	class:bold={leaf.bold}
	class:italic={leaf.italic}
	class:code={leaf.code}
	class:underline={leaf.underline}
>
	<slot />
</span>

<style>
	.bold {
		font-weight: 900;
	}
	.italic {
		font-style: italic;
	}
	.code {
		font-family: monospace;
		background-color: #eee;
		padding: 3px;
	}
	.underline {
		text-decoration: underline;
	}
</style>
