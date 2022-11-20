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

		// if (rect.left + window.pageXOffset - ref.offsetWidth / 2 < viewRect.left) {
		// 	ref.style.left = `${rect.left - viewRect.left + window.pageXOffset}px`;
		// } else if (rect.right + window.pageXOffset + ref.offsetWidth / 2 > viewRect.right) {
		// 	ref.style.left = `${viewRect.right - rect.right + window.pageXOffset - ref.offsetWidth}px`;
		// } else {
		// 	ref.style.left = `${
		// 		rect.left - viewRect.left + window.pageXOffset - ref.offsetWidth / 2 + rect.width / 2
		// 	}px`;
		// }
		// if (rect.top + window.pageYOffset - ref.offsetHeight < viewRect.top) {
		// 	ref.style.top = `${viewRect.bottom - rect.bottom + window.pageYOffset + offsetY}px`;
		// } else {
		// 	ref.style.top = `${
		// 		rect.top - viewRect.top + window.pageYOffset - ref.offsetHeight - offsetY
		// 	}px`;
		// }
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
	<div bind:this={ref} class="hovering-menu">
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
