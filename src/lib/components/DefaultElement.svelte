<script lang="ts">
	import type { SvelteEditor } from '../withSvelte';
	import type { Element } from 'slate';

	export let editor: SvelteEditor;
	export let element: Element;
	export let ref: HTMLElement;
</script>

{#if editor.isInline(element)}<span bind:this={ref} {...$$restProps}><slot /></span>{:else}<div
		bind:this={ref}
		{...$$restProps}
	>
		<slot />
	</div>{/if}

<style>
	span,
	div {
		position: relative;
	}
</style>
