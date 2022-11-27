<svelte:options immutable />

<script lang="ts">
	import Portal from 'svelte-portal/src/Portal.svelte';

	export let open = false;
	export let onClose: () => void = () => undefined;

	function onCloseInternal() {
		open = false;
		onClose();
	}
</script>

<Portal>
	<div class="background" class:open on:click={onCloseInternal} />
	<div class="modal" class:open>
		<slot />
	</div>
</Portal>

<style>
	.background {
		background-color: black;
		position: fixed;
		display: none;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		opacity: 0;
		transition: opacity 0.1s ease-in-out;
	}
	.background.open {
		display: inherit;
		z-index: 9999;
		opacity: 0.5;
	}
	.modal {
		position: fixed;
		display: none;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background: white;
		padding: 0.25rem;
		opacity: 0;
		transition: opacity 0.1s ease-in-out;
	}
	.modal.open {
		display: inherit;
		z-index: 10000;
		opacity: 1;
	}
</style>
