<script lang="ts">
	import { getSelectionContext, getEditor } from '$lib/components/Slate.svelte';
	import Button from './Button.svelte';
	import { isBlockActive, toggleBlock } from './utils';

	export let format: string;

	const editor = getEditor();

	const selectionContext = getSelectionContext();
	$: selection = $selectionContext;

	$: active = isBlockActive(editor, selection, format);
	$: onMouseDown = (event: MouseEvent) => {
		event.preventDefault();
		toggleBlock(editor, selection, format);
	};
</script>

<Button {active} {onMouseDown}>
	<slot />
</Button>
