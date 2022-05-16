<script lang="ts">
	import { getEditorContext } from 'svelte-slate';
	import MdCode from 'svelte-icons/md/MdCode.svelte';
	import Button from './Button.svelte';
	import { insertCode } from '$lib/plugins/CodeElement.svelte';
	import { isBlockActive } from '$lib/plugins//utils';

	const editorContext = getEditorContext();
	$: editor = $editorContext;
	$: active = isBlockActive(editor, 'code');

	$: onMouseDown = () => !active && insertCode(editor);
</script>

<Button {active} {onMouseDown}>
	<MdCode />
</Button>
