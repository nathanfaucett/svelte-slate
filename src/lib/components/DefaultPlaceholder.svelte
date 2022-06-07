<svelte:options immutable />

<script lang="ts">
	export let clientHeight: number | undefined = undefined;
</script>

<span bind:clientHeight data-slate-placeholder="true" contenteditable="false"><slot /></span>

<style>
	span {
		position: absolute;
		pointer-events: none;
		width: 100%;
		max-width: 100%;
		display: block;
		opacity: 0.333;
		user-select: none;
		text-decoration: none;
	}
</style>
