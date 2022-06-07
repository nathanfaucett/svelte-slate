<svelte:options immutable />

<script lang="ts">
	import { Editor, Range, type BaseRange } from 'slate';
	import { getEditorContext, getFocusedContext, getSelectionContext } from 'svelte-slate';
	import { isCodeElement } from './CodeElement.svelte';
	import Hovering, { repositionElement } from './Hovering.svelte';

	export let container: HTMLElement | undefined = undefined;
	export let open = false;
	export let offsetY = 4;

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
					at: Editor.unhangRange(editor, editor.selection as BaseRange),
					match: isCodeElement as any
				})
			);
			if (!match) {
				repositionElement(ref, container as HTMLElement, offsetY);
				open = true;
			}
		}
	}
</script>

<Hovering bind:open bind:ref>
	<slot />
</Hovering>
