<script lang="ts">
	import { getEditorContext } from 'svelte-slate';
	import MdTexture from 'svelte-icons/md/MdTexture.svelte';
	import Button from './Button.svelte';
	import { insertVoid } from './VoidElement.svelte';
	import { isBlockActive } from 'svelte-slate/plugins';

	const editorContext = getEditorContext();

	$: editor = $editorContext;
	$: active = isBlockActive(editor, 'void');

	$: onMouseDown = () => insertVoid(editor);
</script>

<Button {active} {onMouseDown}>
	<MdTexture />
</Button>
