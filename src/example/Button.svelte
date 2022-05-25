<svelte:options immutable />

<script lang="ts">
	export let active = false;
	export let onMouseDown: (event: MouseEvent) => void = () => undefined;
</script>

<button class:active on:mousedown={onMouseDown}>
	<div>
		<slot />
	</div>
</button>

<style>
	button {
		cursor: pointer;
		color: black;
		background: white;
		border: 1px solid black;
		padding: 0.25rem;
		margin: 0;
	}
	button.active {
		background: #aaa;
	}
	div {
		width: 20px;
		height: 20px;
	}
</style>
