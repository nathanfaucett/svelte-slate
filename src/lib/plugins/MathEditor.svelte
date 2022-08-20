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
	import Hovering from './Hovering.svelte';
	import { getContainerContext } from '$lib/components/Slate.svelte';

	export let open = false;
	export let title: string = 'LaTeX Editor';
	export let math: string = '';
	export let inline: boolean = true;
	export let isNew: boolean = true;
	export let onDone: (math: string, inline: boolean) => void;

	const containerContext = getContainerContext();
	$: container = $containerContext;

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
		<div class="math-editor-title">{title}</div>
		<div class="math-editor-content">
			<div class="math-editor-math">
				<div class="math-editor-latexinput">
					<textarea bind:this={textareaElement} bind:value={math} />
				</div>
				<div class="math-editor-buttons">
					<button class:active={!math} on:click={onDoneInternal}
						>{#if isNew}Insert{:else}Update{/if}</button
					>
					<button class:active={!inline} on:click={onInlineChange}
						>{#if inline}Block{:else}Inline{/if}</button
					>
				</div>
				<div class="math-editor-rendering">
					<span bind:this={mathDisplayElement} />
				</div>
			</div>
		</div>
	</div></Hovering
>

<style>
	.math-editor-title {
		margin: 4px 0px;
	}
	.math-editor-body {
		border: 1px solid black;
		padding: 0.25rem;
		display: block;
		background-color: white;
	}
	.math-editor-latexinput textarea {
		border: 1px solid #333;
		padding: 0.25rem;
		min-height: 110px;
	}
	.math-editor-rendering {
		border: 1px solid #333;
		padding: 0.5rem;
	}
	.math-editor-math span {
		padding: 0.25rem;
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
		padding: 0 6px;
		margin: 0.25rem;
		height: 1.5rem;
		background-color: white;
	}
	button.active {
		opacity: 0.8;
	}
</style>
