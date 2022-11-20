<script lang="ts">
	import { getEditorContext } from 'svelte-slate';
	import FaTable from 'svelte-icons/fa/FaTable.svelte';
	import Button from './Button.svelte';
	import { insertTable, isBlockActive } from 'svelte-slate/plugins';

	const editorContext = getEditorContext();

	$: editor = $editorContext;
	$: active = isBlockActive(editor, 'void');

	$: onMouseDown = () => insertTable(editor);
</script>

<Button {active} {onMouseDown}>
	<FaTable />
</Button>
