<svelte:options immutable />

<script lang="ts" context="module">
	export function repositionElement(
		ref: HTMLElement,
		container: HTMLElement,
		retired = 2,
		offsetY = 4
	) {
		const domSelection = window.getSelection();

		if (!domSelection || domSelection.type.toLowerCase() === 'none') {
			if (retired > 0) {
				setTimeout(() => {
					repositionElement(ref, container, retired - 1);
				}, 100);
			}
			return;
		}
		const domRange = domSelection.getRangeAt(0);
		const rect = domRange.getBoundingClientRect();
		const viewRect = container.getBoundingClientRect();
		if (rect.left + window.pageXOffset - ref.offsetWidth / 2 < viewRect.left) {
			ref.style.left = `${viewRect.left + window.pageXOffset}px`;
		} else if (rect.right + window.pageXOffset + ref.offsetWidth / 2 > viewRect.right) {
			ref.style.left = `${viewRect.right + window.pageXOffset - ref.offsetWidth}px`;
		} else {
			ref.style.left = `${rect.left + window.pageXOffset - ref.offsetWidth / 2 + rect.width / 2}px`;
		}
		if (rect.top + window.pageYOffset - ref.offsetHeight < viewRect.top) {
			ref.style.top = `${rect.bottom + window.pageYOffset + offsetY}px`;
		} else {
			ref.style.top = `${rect.top + window.pageYOffset - ref.offsetHeight - offsetY}px`;
		}
		ref.style.opacity = '1';
	}
</script>

<script lang="ts">
	import Portal from 'svelte-portal/src/Portal.svelte';

	export let container: HTMLElement | undefined = undefined;
	export let ref: HTMLElement | undefined = undefined;
	export let open = false;
	export let offsetY = 4;

	$: if (container === undefined && typeof document !== 'undefined') {
		container = document.body;
	}
	$: if (ref) {
		if (open) {
			repositionElement(ref, container as HTMLElement, offsetY);
		} else {
			ref.removeAttribute('style');
		}
	}
</script>

<Portal>
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
