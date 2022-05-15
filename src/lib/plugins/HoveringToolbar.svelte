<svelte:options immutable={true} />

<script lang="ts" context="module">
	function repositionElement(ref: HTMLElement, container: HTMLElement, retired = 2) {
		const domSelection = window.getSelection();

		if (domSelection.type.toLowerCase() === 'none') {
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
			ref.style.top = `${rect.bottom + window.pageYOffset + 4}px`;
		} else {
			ref.style.top = `${rect.top + window.pageYOffset - ref.offsetHeight - 4}px`;
		}
		ref.style.opacity = '1';
	}
</script>

<script lang="ts">
	import { Editor, Range } from 'slate';
	import Portal from 'svelte-portal/src/Portal.svelte';
	import { getEditorContext, getFocusedContext, getSelectionContext } from 'svelte-slate';
	import { isCodeElement } from './CodeElement.svelte';

	export let container: HTMLElement = undefined;
	export let open = false;

	$: if (container === undefined && typeof document !== 'undefined') {
		container = document.body;
	}

	const editorContext = getEditorContext();
	const selectionContext = getSelectionContext();
	const focusContext = getFocusedContext();
	$: editor = $editorContext;
	$: selection = $selectionContext;
	$: focus = $focusContext;

	let ref: HTMLElement;
	$: if (ref) {
		if (
			!selection ||
			!focus ||
			Range.isCollapsed(selection) ||
			Editor.string(editor, selection) === ''
		) {
			ref.removeAttribute('style');
			open = false;
		} else {
			const [match] = Array.from(
				Editor.nodes(editor, {
					at: Editor.unhangRange(editor, editor.selection),
					match: isCodeElement
				})
			);
			if (!match) {
				repositionElement(ref, container);
				open = true;
			}
		}
	}

	$: if (ref) {
		if (open) {
			repositionElement(ref, container);
		} else {
			ref.removeAttribute('style');
		}
	}
</script>

<Portal>
	<div bind:this={ref} class="menu">
		<slot />
	</div>
</Portal>

<style>
	.menu {
		background-color: #fff;
		border: 1px solid #888;
		padding: 0.25rem;
		position: absolute;
		z-index: 10000;
		top: -10000px;
		left: -10000px;
		opacity: 0;
	}
</style>
