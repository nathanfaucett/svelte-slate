<script lang="ts">
	import { getEditorContext } from 'svelte-slate/components/Slate.svelte';
	import MdPlaylistAddCheck from 'svelte-icons/md/MdPlaylistAddCheck.svelte';
	import Button from './Button.svelte';
	import { insertCheckListItem } from 'svelte-slate/plugins/CheckListItemElement.svelte';
	import { isBlockActive } from 'svelte-slate/plugins/utils';

	const editorContext = getEditorContext();

	$: editor = $editorContext;
	$: active = isBlockActive(editor, 'check-list-item');

	$: onMouseDown = () => insertCheckListItem(editor);
</script>

<Button {active} {onMouseDown}>
	<MdPlaylistAddCheck />
</Button>
