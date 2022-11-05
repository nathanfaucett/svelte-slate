<script lang="ts">
	import type { Location } from 'slate';
	import { onMount } from 'svelte';
	import { getEditorContext, getFocusedContext } from 'svelte-slate';
	import { isHotkey } from 'svelte-slate';
	import Button from './Button.svelte';
	import MdFunctions from 'svelte-icons/md/MdFunctions.svelte';
	import { MathEditor, insertMath, MATH_TYPE, isBlockActive } from 'svelte-slate/plugins';

	const editorContext = getEditorContext();
	const focusedContext = getFocusedContext();

	$: editor = $editorContext;
	$: focused = $focusedContext;
	$: active = isBlockActive(editor, MATH_TYPE);

	let at: Location | undefined;
	let open = false;
	let math = '';
	let inline = true;
	function onMouseDown() {
		at = editor.selection ? editor.selection.anchor || editor.selection.focus : undefined;
		math = '';
		inline = true;
		open = !open;
	}
	function onDone(math: string, inline: boolean) {
		insertMath(editor, math, inline, at);
	}

	function onKeyDown(event: KeyboardEvent) {
		if (isHotkey('ctrl+m', event)) {
			if (focused) {
				at = editor.selection ? editor.selection.anchor || editor.selection.focus : undefined;
				math = '';
				inline = true;
				open = true;
			} else {
				open = false;
			}
		}
	}

	onMount(() => {
		document.body.addEventListener('keydown', onKeyDown);

		return () => {
			document.body.removeEventListener('keydown', onKeyDown);
		};
	});
</script>

<MathEditor bind:open bind:math bind:inline {onDone} />

<Button {active} {onMouseDown}>
	<MdFunctions />
</Button>
