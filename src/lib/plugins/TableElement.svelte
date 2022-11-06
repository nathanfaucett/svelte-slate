<svelte:options immutable />

<script lang="ts" context="module">
	import { Transforms, Range, Editor, Point } from 'slate';
	import type { IElement } from './Element.svelte';
	import type { IElementProps } from '$lib/components/InternalElement.svelte';

	export const TABLE_TYPE: string = 'table';

	export interface ITableElement extends IElement {
		type: 'table';
		children: ITableRowElement[];
	}

	export function isTableElement(element: IElement): element is ITableElement {
		return element.type === TABLE_TYPE;
	}

	export function withTable<T extends ISvelteEditor = ISvelteEditor>(editor: T): T {
		const { deleteBackward } = editor;

		editor.deleteBackward = (...args) => {
			if (editor.selection && Range.isCollapsed(editor.selection)) {
				const [match] = Editor.nodes(editor, {
					match: isTableElement as any
				});

				if (match) {
					const [, path] = match;
					const start = Editor.start(editor, path);

					if (Point.equals(editor.selection.anchor, start)) {
						const newProperties: Partial<IElement> = {
							type: 'paragraph'
						};
						Transforms.setNodes(editor, newProperties, {
							match: isTableElement as any
						});
						return;
					}
				}
			}

			deleteBackward(...args);
		};

		return editor;
	}

	export function insertTable(editor: Editor) {
		const node = {
			type: TABLE_TYPE,
			children: [
				{
					type: TABLE_ROW_TYPE,
					children: [
						{
							type: TABLE_HEADER_TYPE,
							children: [{ text: '' }]
						}
					]
				}
			]
		};
		Transforms.insertNodes(editor, node);
	}

	export const TABLE_ELEMENT_CONTEXT_KEY = createContextKey<ISvelteComponent<IElementProps>>();
</script>

<script lang="ts">
	import { ELEMENT_CONTEXT_KEY } from '$lib/components/Editable.svelte';
	import {
		setInContext,
		createContext,
		createContextKey,
		getFromContext,
		type ISvelteComponent
	} from '$lib/utils';
	import TableRowElement, { TABLE_ROW_TYPE, type ITableRowElement } from './TableRowElement.svelte';
	import { TABLE_HEADER_TYPE } from './TableHeaderElement.svelte';
	import type { ISvelteEditor } from '$lib/withSvelte';

	// svelte-ignore unused-export-let
	export let element: ITableElement;
	export let isInline: boolean;
	export let isVoid: boolean;
	export let contenteditable: boolean;
	export let ref: HTMLElement | undefined = undefined;
	export let dir: 'rtl' | 'ltr' | undefined = undefined;

	setInContext(TABLE_ELEMENT_CONTEXT_KEY, getFromContext(ELEMENT_CONTEXT_KEY));
	createContext(ELEMENT_CONTEXT_KEY, TableRowElement);
</script>

<table
	bind:this={ref}
	data-slate-node="element"
	data-slate-inline={isInline}
	data-slate-void={isVoid}
	{dir}
	{contenteditable}
>
	<slot />
</table>
