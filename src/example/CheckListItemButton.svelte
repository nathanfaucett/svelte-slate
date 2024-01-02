<script lang="ts">
	import { getEditorContext } from '$lib';
	import MdPlaylistAddCheck from 'svelte-icons/md/MdPlaylistAddCheck.svelte';
	import Button from './Button.svelte';
	import { isBlockActive } from '$lib/plugins/utils';
	import { insertCheckListItem } from '$lib/plugins/CheckListItemElement.svelte';

	const editorContext = getEditorContext();

	$: editor = $editorContext;
	$: active = isBlockActive(editor, 'check-list-item');

	$: onMouseDown = () => insertCheckListItem(editor);
</script>

<Button {active} {onMouseDown}>
	<MdPlaylistAddCheck />
</Button>
