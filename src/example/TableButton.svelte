<script lang="ts">
	import { getEditorContext } from '$lib';
	import FaTable from 'svelte-icons/fa/FaTable.svelte';
	import Button from './Button.svelte';
	import { insertTable } from '$lib/plugins/TableElement.svelte';
	import { isBlockActive } from '$lib/plugins/utils';

	const editorContext = getEditorContext();

	$: editor = $editorContext;
	$: active = isBlockActive(editor, 'table');

	$: onMouseDown = () => insertTable(editor);
</script>

<Button {active} {onMouseDown}>
	<FaTable />
</Button>
