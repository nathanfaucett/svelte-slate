<script lang="ts">
	import { getEditorContext } from 'svelte-slate';
	import MdPlaylistAddCheck from 'svelte-icons/md/MdPlaylistAddCheck.svelte';
	import Button from './Button.svelte';
	import { insertCheckListItem } from './CheckListItemElement.svelte';
	import { isBlockActive } from './utils';

	const editorContext = getEditorContext();

	$: editor = $editorContext;
	$: active = isBlockActive(editor, 'check-list-item');

	$: onMouseDown = () => insertCheckListItem(editor);
</script>

<Button {active} {onMouseDown}>
	<MdPlaylistAddCheck />
</Button>
