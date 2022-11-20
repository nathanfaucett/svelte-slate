<svelte:options immutable />

<script lang="ts" context="module">
	import { Transforms, Range, Editor, Point, type NodeMatch, type BaseRange } from 'slate';
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
				const [dataMatch] = Editor.nodes(editor, {
					match: isTableDataElement as any
				});
				if (dataMatch) {
					const [_, path] = dataMatch;
					if (
						path[0] === editor.selection.focus.path[0] &&
						path[1] === editor.selection.focus.path[1] &&
						editor.selection.focus.path[2] === 0 &&
						editor.selection.focus.offset === 0
					) {
						Transforms.delete(editor, {
							at: [path[0], path[1]]
						});
						return;
					}
				}
				const [headerMatch] = Editor.nodes(editor, {
					match: isTableHeaderElement as any
				});
				if (!!headerMatch && Editor.isEmpty(editor, headerMatch[0] as IElement)) {
					return;
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

	function createNRows(length: number) {
		return [...new Array(length)].map(() => ({
			type: TABLE_DATA_TYPE,
			children: [{ text: '' }]
		}));
	}
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
	import { isTableHeaderElement, TABLE_HEADER_TYPE } from './TableHeaderElement.svelte';
	import type { ISvelteEditor } from '$lib/withSvelte';
	import { addEventListener, getEditor } from '$lib/components/Slate.svelte';
	import { isTableDataElement, TABLE_DATA_TYPE } from './TableDataElement.svelte';
	import { PARAGRAPH_TYPE } from './ParagraphElement.svelte';

	const editor = getEditor();

	// svelte-ignore unused-export-let
	export let element: ITableElement;
	export let isInline: boolean;
	export let isVoid: boolean;
	export let contenteditable: boolean;
	export let ref: HTMLElement | undefined = undefined;
	export let dir: 'rtl' | 'ltr' | undefined = undefined;

	setInContext(TABLE_ELEMENT_CONTEXT_KEY, getFromContext(ELEMENT_CONTEXT_KEY));
	createContext(ELEMENT_CONTEXT_KEY, TableRowElement);

	addEventListener('onKeyDown', (e) => {
		if (editor.selection && e.key === 'Enter') {
			const [match] = Editor.nodes(editor, {
				match: isTableElement as any
			});
			if (match) {
				e.preventDefault();
				e.stopPropagation();
				const [node, [index]] = match;
				const table = node as ITableElement;
				if (e.shiftKey) {
					const [headerMatch] = Editor.nodes(editor, {
						match: isTableHeaderElement as any
					});
					if (headerMatch) {
						table.children.forEach((row, rowIndex) => {
							Transforms.insertNodes(
								editor,
								{
									type: rowIndex !== 0 ? TABLE_DATA_TYPE : TABLE_HEADER_TYPE,
									children: [{ text: '' }]
								} as any,
								{
									at: [index, rowIndex, row.children.length]
								}
							);
						});
						Transforms.select(editor, [index, 0, table.children[0].children.length]);
					} else {
						const at = [index + 1];
						Transforms.insertNodes(
							editor,
							{ type: PARAGRAPH_TYPE, children: [{ text: '' }] } as any,
							{
								at
							}
						);
						Transforms.select(editor, at);
					}
				} else {
					const at = [index, editor.selection.focus.path[1] + 1];
					Transforms.insertNodes(
						editor,
						{
							type: TABLE_ROW_TYPE,
							children: createNRows(table.children[0].children.length)
						} as any,
						{
							at
						}
					);
					Transforms.select(editor, at);
				}
			}
		}
	});
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

<style>
	table {
		border: 1px solid;
		width: 100%;
		border-collapse: collapse;
	}
</style>
