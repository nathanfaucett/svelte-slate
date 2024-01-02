<script lang="ts">
	import { getEditorContext } from '$lib';
	import MdCode from 'svelte-icons/md/MdCode.svelte';
	import Button from './Button.svelte';
	import { isBlockActive } from '$lib/plugins/utils';
	import { insertCode } from '$lib/plugins/CodeElement.svelte';

	const editorContext = getEditorContext();
	$: editor = $editorContext;
	$: active = isBlockActive(editor, 'code');

	$: onMouseDown = () => !active && insertCode(editor);
</script>

<Button {active} {onMouseDown}>
	<MdCode />
</Button>
