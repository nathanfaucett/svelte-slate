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
		getSelectionContext
	} from '../components/Slate.svelte';
	import { Editor, Range, type BaseRange } from 'slate';
	import Hovering from './Hovering.svelte';
	import { isCodeElement } from './CodeElement.svelte';
	import type { IElement } from './Element.svelte';
	import { isImageElement } from './ImageElement.svelte';

	export let container: HTMLElement | undefined = undefined;
	export let threshold = 500;
	export let open = false;

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
			open = false;
		} else {
			const [match] = Editor.nodes(editor, {
				at: Editor.unhangRange(editor, editor.selection as BaseRange),
				match: (e) => isCodeElement(e as IElement) || isImageElement(e as IElement)
			});
			if (!match) {
				open = true;
			}
		}
	}

	function onLongPress() {
		open = true;
	}

	let prevContainer: HTMLElement;
	let removeLongpress: (() => void) | undefined;
	$: if (container && container !== prevContainer) {
		if (removeLongpress) {
			removeLongpress();
		}
		removeLongpress = addLongPress(container, threshold, onLongPress);
		prevContainer = container;
	}
</script>

<Hovering bind:open bind:ref {container}>
	<slot />
</Hovering>
