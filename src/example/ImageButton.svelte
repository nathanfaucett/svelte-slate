<script lang="ts">
	import { getEditor } from '$lib/components/Slate.svelte';
	import MdImage from 'svelte-icons/md/MdImage.svelte';
	import MdCheck from 'svelte-icons/md/MdCheck.svelte';
	import Button from './Button.svelte';
	import isUrl from 'is-url';
	import { insertImage } from './ImageElement.svelte';
	import Modal from './Modal.svelte';

	const editor = getEditor();

	let url: string;
	let entering = false;

	$: onMouseDown = () => {
		entering = true;
	};
	$: onEnter = () => {
		if (isUrl(url)) {
			insertImage(editor, url);
			url = '';
			entering = false;
		}
	};
</script>

<Button {onMouseDown}>
	<MdImage />
</Button>

<Modal bind:open={entering}>
	<div class="body">
		<div class="url">
			<input type="text" bind:value={url} />
			<div class="button">
				<Button active={!isUrl(url)} onMouseDown={onEnter}><MdCheck /></Button>
			</div>
		</div>
	</div>
</Modal>

<style>
	.body {
		min-width: 256px;
	}
	.url {
		display: flex;
		background-color: white;
	}
	.button {
		flex-grow: 0;
	}
	input {
		flex-grow: 1;
		border: 1px solid #888;
		border-right: none;
		padding: 0.25rem 0.5rem;
		width: 100%;
		outline: none;
	}
</style>
