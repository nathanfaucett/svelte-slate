<svelte:options immutable />

<script lang="ts" context="module">
	import type { IElement } from './Element.svelte';

	export const CHECK_LIST_ITEM_TYPE: string = 'check-list-item';

	export interface ICheckListItemElement extends IElement {
		type: 'check-list-item';
		checked: boolean;
	}

	export function isCheckListItemElement(element: IElement): element is ICheckListItemElement {
		return element.type === CHECK_LIST_ITEM_TYPE;
	}

	export function insertCheckListItem(editor: Editor) {
		const isActive = isBlockActive(editor, CHECK_LIST_ITEM_TYPE);

		if (isActive) {
			Transforms.unwrapNodes(editor, {
				match: (n) =>
					!Editor.isEditor(n) &&
					SlateElement.isElement(n) &&
					(n as IElement).type === CHECK_LIST_ITEM_TYPE,
				split: true
			});
		} else {
			const block = { type: CHECK_LIST_ITEM_TYPE, checked: false, children: [] };
			Transforms.wrapNodes(editor, block);
		}
	}
</script>

<script lang="ts">
	import { getEditor, getReadOnlyContext } from '../components/Slate.svelte';
	import { findPath } from '../utils';
	import { Editor, Transforms, Element as SlateElement } from 'slate';
	import { isBlockActive } from './utils';

	export let element: ICheckListItemElement;
	export let isInline: boolean;
	export let isVoid: boolean;
	export let contenteditable: boolean;
	export let ref: HTMLElement | undefined = undefined;
	export let dir: 'rtl' | 'ltr' | undefined = undefined;

	const editor = getEditor();

	function onChange(event: Event) {
		if (contenteditable) {
			Transforms.setNodes(
				editor,
				{
					checked: (event.target as HTMLInputElement).checked
				} as any,
				{ at: findPath(element) }
			);
		}
	}
</script>

<div
	class="check-list-item"
	bind:this={ref}
	data-slate-node="element"
	data-slate-inline={isInline}
	data-slate-void={isVoid}
	{dir}
	{contenteditable}
>
	<span class="checkbox" contenteditable={false}>
		<input
			type="checkbox"
			checked={element.checked}
			disabled={!contenteditable}
			on:change={onChange}
		/>
	</span>
	<span class="content" class:checked={element.checked} {contenteditable}>
		<slot />
	</span>
</div>

<style>
	.check-list-item {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.checkbox {
		margin-right: 0.75rem;
	}
	.content {
		flex: 1;
		opacity: 1;
	}
	.content.checked {
		opacity: 0.666;
		text-decoration: line-through;
	}
	.content:focus {
		outline: none;
	}
</style>
