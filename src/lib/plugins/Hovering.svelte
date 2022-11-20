<svelte:options immutable />

<script lang="ts" context="module">
	function repositionElement(ref: HTMLElement, container: HTMLElement, retires: number) {
		const domSelection = window.getSelection();

		if (!domSelection || domSelection.type.toLowerCase() === 'none') {
			if (retires > 0) {
				setTimeout(() => {
					repositionElement(ref, container, retires - 1);
				}, 100);
			}
			return;
		}
		const domRange = domSelection.getRangeAt(0);
		const rect = domRange.getBoundingClientRect();
		const viewRect = container.getBoundingClientRect();
		let x = rect.left - viewRect.left - (ref.offsetWidth - rect.width) / 2;
		let y = rect.top - viewRect.top - ref.offsetHeight;
		const top = y;
		const right = x + ref.offsetWidth;
		const bottom = y + ref.offsetHeight;
		const left = x;

		if (left < 0) {
			x = 0;
		} else if (right > viewRect.width) {
			x = viewRect.width - ref.offsetWidth;
		}
		if (top < 0) {
			y = rect.bottom - viewRect.top;
		} else if (bottom > viewRect.height) {
			y = viewRect.height - ref.offsetHeight;
		}

		ref.style.left = `${x}px`;
		ref.style.top = `${y}px`;
		ref.style.opacity = '1';
	}
</script>

<script lang="ts">
	import Portal from 'svelte-portal/src/Portal.svelte';

	export let container: HTMLElement | undefined = undefined;
	export let ref: HTMLElement | undefined = undefined;
	export let open = false;
	export let retires = 2;

	$: if (container === undefined && typeof document !== 'undefined') {
		container = document.body;
	}
	$: if (ref) {
		if (open) {
			repositionElement(ref, container as HTMLElement, retires);
		} else {
			ref.removeAttribute('style');
		}
	}
</script>

<Portal target={container}>
	<div bind:this={ref} class="hovering-menu" contenteditable={false}>
		<slot />
	</div>
</Portal>

<style>
	.hovering-menu {
		background: transparent;
		position: absolute;
		z-index: 10000;
		top: -10000px;
		left: -10000px;
		opacity: 0;
	}
</style>
