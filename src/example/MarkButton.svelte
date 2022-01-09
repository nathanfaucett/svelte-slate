<script lang="ts">
	import { getEditorContext } from '$lib/components/Slate.svelte';
	import Button from './Button.svelte';
	import { isMarkActive, toggleMark } from './utils';

	export let format: string;

	const editorContext = getEditorContext();
	$: editor = $editorContext;
	$: active = isMarkActive(editor, format);
	$: onMouseDown = (event) => {
		event.preventDefault();
		toggleMark(editor, format);
	};
</script>

<Button {active} {onMouseDown}>
	<slot />
</Button>
