<svelte:options immutable />

<script lang="ts" context="module">
	export function addLongPress(node: HTMLElement, threshold = 500, callback: () => void) {
		let timeoutId: ReturnType<typeof setTimeout> | null = null;

		function onDown() {
			timeoutId = setTimeout(callback, threshold);
		}

		function onUp() {
			if (timeoutId !== null) {
				clearTimeout(timeoutId);
				timeoutId = null;
			}
		}

		node.addEventListener('mousedown', onDown);
		node.addEventListener('touchstart', onDown);
		node.addEventListener('mouseup', onUp);
		node.addEventListener('mousemove', onUp);
		node.addEventListener('mouseleave', onUp);
		node.addEventListener('touchend', onUp);
		node.addEventListener('touchmove', onUp);

		return () => {
			onUp();
			node.removeEventListener('mousedown', onDown);
			node.removeEventListener('touchstart', onDown);
			node.removeEventListener('mouseup', onUp);
			node.removeEventListener('mousemove', onUp);
			node.removeEventListener('mouseleave', onUp);
			node.removeEventListener('touchend', onUp);
			node.removeEventListener('touchmove', onUp);
		};
	}
</script>

<script lang="ts">
	import {
		getEditorContext,
		getFocusedContext,
		getReadOnlyContext,
		getSelectionContext
	} from '../components/Slate.svelte';
	import { Editor, Range, type BaseRange } from 'slate';
	import Hovering from './Hovering.svelte';
	import type { IBaseElement } from './Element.svelte';

	export let container: HTMLElement | undefined = undefined;
	export let threshold = 500;

	const editorContext = getEditorContext();
	const selectionContext = getSelectionContext();
	const focusContext = getFocusedContext();
	const readOnlyContext = getReadOnlyContext();
	$: editor = $editorContext;
	$: selection = $selectionContext;
	$: focus = $focusContext;
	$: readOnly = $readOnlyContext;

	let ref: HTMLElement;
	let open: number | false = false;
	$: if (ref) {
		if (
			!selection ||
			!focus ||
			Range.isCollapsed(selection) ||
			Editor.string(editor, selection) === ''
		) {
			open = false;
		} else {
			checkCanOpen();
		}
	}

	function checkCanOpen() {
		if (!readOnly && editor.selection) {
			const [match] = Editor.nodes(editor, {
				at: Editor.unhangRange(editor, editor.selection as BaseRange),
				match: (e) => !editor.hasOwnContext(e as IBaseElement)
			});
			if (!match) {
				open = Date.now();
			}
		}
	}
	let prevContainer: HTMLElement;
	let removeLongpress: (() => void) | undefined;
	$: if (container && container !== prevContainer) {
		if (removeLongpress) {
			removeLongpress();
		}
		removeLongpress = addLongPress(container, threshold, checkCanOpen);
		prevContainer = container;
	}
</script>

<Hovering bind:open bind:ref {container}>
	<slot />
</Hovering>
