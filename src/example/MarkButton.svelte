<script lang="ts">
	import { getSelectionContext, getEditor } from '$lib/components/Slate.svelte';
	import Button from './Button.svelte';
	import { isMarkActive, toggleMark } from './utils';

	export let format: string;

	const editor = getEditor();

	const selectionContext = getSelectionContext();
	$: selection = $selectionContext;

	$: active = isMarkActive(editor, selection, format);
	$: onMouseDown = (event: MouseEvent) => {
		event.preventDefault();
		toggleMark(editor, selection, format);
	};
</script>

<Button {active} {onMouseDown}>
	<slot />
</Button>
