<svelte:options immutable={true} />

<script lang="ts">
	export let text: string;
	export let isTrailing = false;
</script>

<span data-slate-string="true"
	>{text}{#if isTrailing}{'\n'}{/if}</span
>
