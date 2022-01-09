<script lang="ts">
	export let active: boolean;
	export let onMouseDown: (event: MouseEvent) => void;
</script>

<button class:active on:mousedown={onMouseDown}>
	<div>
		<slot />
	</div>
</button>

<style>
	button {
		cursor: pointer;
		color: #333;
		background: #fff;
		border: 1px solid #888;
		padding: 0.25rem;
		margin: 0;
	}
	button.active {
		color: #888;
		background: #aaa;
	}
	div {
		width: 20px;
		height: 20px;
	}
</style>
