<svelte:options immutable={true} />

<script lang="ts">
	export let clientHeight: number;
</script>

<span bind:clientHeight><slot /></span>
