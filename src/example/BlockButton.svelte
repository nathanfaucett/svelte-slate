<script lang="ts">
	import { getEditorContext } from '$lib';
	import Button from './Button.svelte';
	import { isBlockActive, toggleBlock } from '$lib/plugins/utils';

	export let format: string;

	const editorContext = getEditorContext();

	$: editor = $editorContext;
	$: active = isBlockActive(editor, format);
	$: onMouseDown = (event: MouseEvent) => {
		event.preventDefault();
		toggleBlock(editor, format);
	};
</script>

<Button {active} {onMouseDown}>
	<slot />
</Button>
