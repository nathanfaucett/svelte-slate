<script lang="ts">
	import type { Location } from 'slate';
	import { onMount } from 'svelte';
	import { getEditorContext, getFocusedContext, isHotkey } from 'svelte-slate';
	import Button from './Button.svelte';
	import MdFunctions from 'svelte-icons/md/MdFunctions.svelte';
	import MathEditor from 'svelte-slate/plugins/MathEditor.svelte';
	import { insertMath, MATH_TYPE } from 'svelte-slate/plugins/MathElement.svelte';
	import { isBlockActive } from 'svelte-slate/plugins/utils';

	const editorContext = getEditorContext();
	const focusedContext = getFocusedContext();

	$: editor = $editorContext;
	$: focused = $focusedContext;
	$: active = isBlockActive(editor, MATH_TYPE);

	let at: Location;
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
			event.preventDefault();

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
