<svelte:options immutable />

<script lang="ts" context="module">
	function isDescendant(parent: Node, child?: Node): boolean {
		if (child) {
			let parentNode = child.parentNode;

			while (parentNode) {
				if (parent === parentNode) {
					return true;
				}
				parentNode = parentNode.parentNode;
			}
		}
		return false;
	}
</script>

<script lang="ts">
	import katex from 'katex';
	import { tick } from 'svelte';
	import { clickoutside } from './clickoutside';
	import MdDelete from 'svelte-icons/md/MdDelete.svelte';
	import MdCheck from 'svelte-icons/md/MdCheck.svelte';
	import MdFormatIndentIncrease from 'svelte-icons/md/MdFormatIndentIncrease.svelte';
	import MdFormatAlignJustify from 'svelte-icons/md/MdFormatAlignJustify.svelte';
	import Hovering from './Hovering.svelte';

	export let container: HTMLElement | undefined = undefined;
	export let open = false;
	export let math: string = '';
	export let inline: boolean = true;
	export let onDone: (math: string, inline: boolean) => void;
	export let onDelete: (() => void) | undefined = undefined;

	let openedAt = Date.now();
	let prevOpen = open;
	$: if (prevOpen !== open) {
		openedAt = Date.now();
		prevOpen = open;
	}

	function onDoneInternal() {
		open = false;
		onDone(math, inline);
	}
	function onInlineChange() {
		inline = !inline;
	}

	let rootElement: HTMLDivElement;
	function onClickOutside() {
		if (
			openedAt + 500 < Date.now() &&
			!isDescendant(rootElement, window.getSelection()?.focusNode as Node)
		) {
			open = false;
		}
	}

	let textareaElement: HTMLTextAreaElement;
	let mathDisplayElement: HTMLElement;
	$: if (open && mathDisplayElement) {
		katex.render(math, mathDisplayElement, {
			displayMode: !inline,
			output: 'html',
			throwOnError: false
		});
	}
	$: if (open && textareaElement) {
		tick().then(() => {
			textareaElement.focus();
		});
	}
</script>

<Hovering {container} bind:open>
	<div
		bind:this={rootElement}
		class="math-editor-body"
		use:clickoutside
		on:clickoutside={onClickOutside}
	>
		<div class="math-editor-content">
			<div class="math-editor-math">
				<div>
					<textarea bind:this={textareaElement} bind:value={math} />
				</div>
				<div>
					<span bind:this={mathDisplayElement} />
				</div>
			</div>
			<div class="math-editor-buttons">
				<div>
					<button class:active={!math} on:click={onDoneInternal}><MdCheck /></button>
				</div>
				<div>
					<button class:active={!inline} on:click={onInlineChange}
						>{#if inline}<MdFormatAlignJustify />{:else}<MdFormatIndentIncrease />{/if}</button
					>
				</div>
				{#if onDelete}
					<div>
						<button on:click={onDelete}><MdDelete /></button>
					</div>
				{/if}
			</div>
		</div>
	</div></Hovering
>

<style>
	.math-editor-body {
		border: 1px solid black;
		padding: 0.25rem;
		display: block;
		background-color: white;
	}
	.math-editor-content {
		display: flex;
	}
	.math-editor-math {
		flex-direction: column;
		flex-grow: 1;
	}
	.math-editor-math span {
		padding: 0.25rem;
	}
	.math-editor-buttons {
		flex-direction: row;
		flex-grow: 0;
	}
	textarea {
		border: none;
		border-bottom: 1px solid black;
		padding: 0;
		min-width: 384px;
		min-height: 64px;
		outline: none;
	}
	button {
		cursor: pointer;
		border: 1px solid black;
		padding: 0;
		margin: 0.25rem;
		width: 1.5rem;
		height: 1.5rem;
		background-color: white;
	}
	button.active {
		opacity: 0.8;
	}
</style>
