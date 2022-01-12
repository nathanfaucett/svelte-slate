<script lang="ts">
	import type { Element } from 'slate';
	import { getEditor } from './Slate.svelte';

	export let element: Element;
	export let ref: HTMLElement;

	const editor = getEditor();
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
