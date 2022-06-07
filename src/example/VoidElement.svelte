<svelte:options immutable />

<script lang="ts" context="module">
	import type { IElement } from 'svelte-slate/plugins/Element.svelte';

	export interface IVoidElement extends IElement {
		type: 'void';
		value: string;
	}

	export function isVoidElement(element: IElement): element is IVoidElement {
		return element.type === 'void';
	}

	export function withVoids<T extends ISvelteEditor = ISvelteEditor>(editor: T): T {
		const { isVoid, isInline } = editor;

		editor.isVoid = (element) => (isVoidElement(element as IElement) ? true : isVoid(element));

		editor.isInline = (element) => (isVoidElement(element as IElement) ? true : isInline(element));

		return editor;
	}

	export function insertVoid(editor: Editor) {
		Transforms.insertNodes(editor, {
			type: 'void',
			children: [{ text: '' }]
		} as any);
	}
</script>

<script lang="ts">
	import type { ISvelteEditor } from 'svelte-slate/withSvelte';
	import { Editor, Transforms } from 'slate';
	import { findPath, getEditor } from 'svelte-slate';

	export let element: IVoidElement;
	export let isInline: boolean;
	export let isVoid: boolean;
	export let contenteditable: boolean;
	export let ref: HTMLElement | undefined = undefined;
	export let dir: 'rtl' | 'ltr' | undefined = undefined;

	let editor = getEditor();

	function onUpdate(e: Event) {
		Transforms.setNodes(editor, { value: (e.target as HTMLInputElement).value } as any, {
			at: findPath(element)
		});
	}
</script>

<div
	class="container"
	bind:this={ref}
	data-slate-node="element"
	data-slate-inline={isInline}
	data-slate-void={isVoid}
	{dir}
	{contenteditable}
>
	<div contenteditable={false} class="void">
		<input value={element.value} on:input={onUpdate} />
		<h1>Hello, {element.value || 'world'}!</h1>
	</div>
	<slot />
</div>

<style>
	.container {
		position: relative;
		margin: 0;
		padding: 0 0.25rem;
	}
	.container[data-slate-inline='true'] {
		display: inline-block;
	}
	.container[data-slate-inline='true'] .void {
		display: inline-block;
	}
	.void input {
		display: inline-block;
		min-width: 32px;
	}
	h1 {
		display: inline-block;
		margin: 0;
	}
</style>
