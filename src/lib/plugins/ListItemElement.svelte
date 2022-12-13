<svelte:options immutable />

<script lang="ts" context="module">
	import type { ISvelteEditor } from '$lib/withSvelte';
	import { Editor, Range, Transforms } from 'slate';
	import type { IElement } from './Element.svelte';
	import { PARAGRAPH_TYPE } from './ParagraphElement.svelte';

	export const LIST_ITEM_TYPE: string = 'list-item';

	export interface IListItemElement extends IElement {
		type: 'list-item';
	}

	export function isListItemElement(element: IElement): element is IListItemElement {
		return element.type === LIST_ITEM_TYPE;
	}

	export function withListItem<T extends ISvelteEditor = ISvelteEditor>(editor: T): T {
		const { deleteBackward } = editor;

		editor.deleteBackward = (unit) => {
			// TODO: only insert paragraph if is last item in list
			if (editor.selection && Range.isCollapsed(editor.selection)) {
				const [listItemMatch] = Array.from(
					Editor.nodes(editor, {
						match: (n) => isListItemElement(n as any) && Editor.isEmpty(editor, n as any),
						at: editor.selection
					})
				);
				if (listItemMatch) {
					const [listItem, listItemPath] = listItemMatch;
					const [parent, parentPath] = Editor.parent(editor, listItemPath);
					if (parent.children[parent.children.length - 1] === listItem) {
						parentPath[parentPath.length - 1] += 1;
						deleteBackward(unit);
						Transforms.insertNodes(
							editor,
							{
								type: PARAGRAPH_TYPE,
								children: [{ text: '' }]
							} as any,
							{
								at: parentPath
							}
						);
						Transforms.setSelection(editor, {
							anchor: { path: [...parentPath, 0], offset: 0 },
							focus: { path: [...parentPath, 0], offset: 0 }
						});
						return;
					}
				}
			}
			deleteBackward(unit);
		};

		return editor;
	}
</script>

<script lang="ts">
	// svelte-ignore unused-export-let
	export let element: IListItemElement;
	export let isInline: boolean;
	export let isVoid: boolean;
	export let contenteditable: boolean;
	export let ref: HTMLElement | undefined = undefined;
	export let dir: 'rtl' | 'ltr' | undefined = undefined;
</script>

<li
	bind:this={ref}
	data-slate-node="element"
	data-slate-inline={isInline}
	data-slate-void={isVoid}
	{dir}
	{contenteditable}
>
	<slot />
</li>

<style>
	li {
		position: relative;
		margin: 0;
	}
</style>
