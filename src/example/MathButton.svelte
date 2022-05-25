<script lang="ts">
	import { getEditorContext, getFocusedContext } from '$lib/components/Slate.svelte';
	import Button from './Button.svelte';
	import { insertMath } from '$lib/plugins/MathElement.svelte';
	import { isBlockActive } from '$lib/plugins/utils';
	import MdFunctions from 'svelte-icons/md/MdFunctions.svelte';

	const editorContext = getEditorContext();
	const focusedContext = getFocusedContext();

	$: editor = $editorContext;
	$: active = isBlockActive(editor, 'math');

	function onMouseDown() {
		insertMath(
			editor,
			'',
			true,
			editor.selection ? editor.selection.anchor || editor.selection.focus : undefined
		);
	}
</script>

<Button {active} {onMouseDown}>
	<MdFunctions />
</Button>
