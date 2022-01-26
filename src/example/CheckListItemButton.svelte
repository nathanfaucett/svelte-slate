<script lang="ts">
	import { getSelectionContext, getEditor } from 'svelte-slate';
	import MdPlaylistAddCheck from 'svelte-icons/md/MdPlaylistAddCheck.svelte';
	import Button from './Button.svelte';
	import { insertCheckListItem } from './CheckListItemElement.svelte';
	import { isBlockActive } from './utils';

	const editor = getEditor();

	const selectionContext = getSelectionContext();
	$: selection = $selectionContext;
	$: active = isBlockActive(editor, selection, 'check-list-item');

	$: onMouseDown = () => insertCheckListItem(editor);
</script>

<Button {active} {onMouseDown}>
	<MdPlaylistAddCheck />
</Button>
