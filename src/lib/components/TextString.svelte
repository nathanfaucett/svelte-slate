<script lang="ts">
	import type { Text } from 'slate';
	import { beforeUpdate } from 'svelte';

	export let leaf: Text;
	export let isTrailing = false;

	let ref: HTMLSpanElement;
	beforeUpdate(() => {
		if (ref) {
			ref.textContent = leaf.text;
		}
	});
</script>

<span bind:this={ref} data-slate-string="true"
	>{leaf.text}{#if isTrailing}{'\n'}{/if}</span
>
