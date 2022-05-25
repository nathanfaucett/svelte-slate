<svelte:options immutable={true} />

<script lang="ts">
	import { Editor, Range } from 'slate';
	import { getEditorContext, getFocusedContext, getSelectionContext } from 'svelte-slate';
	import { isCodeElement } from './CodeElement.svelte';
	import Hovering, { repositionElement } from './Hovering.svelte';

	export let container: HTMLElement = undefined;
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
					at: Editor.unhangRange(editor, editor.selection),
					match: isCodeElement
				})
			);
			if (!match) {
				repositionElement(ref, container, offsetY);
				open = true;
			}
		}
	}
</script>

<Hovering bind:open bind:ref>
	<slot />
</Hovering>
