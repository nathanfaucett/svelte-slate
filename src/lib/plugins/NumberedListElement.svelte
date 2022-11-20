<svelte:options immutable />

<script lang="ts" context="module">
	import type { IElement } from './Element.svelte';

	export const NUMBERED_LIST_TYPE: string = 'numbered-list';

	export interface INumberedListItemElement extends IElement {
		type: 'numbered-list';
		children: Array<IListItemElement>;
	}

	export function isNumberedListItemElement(
		element: IElement
	): element is INumberedListItemElement {
		return element.type === NUMBERED_LIST_TYPE;
	}
</script>

<script lang="ts">
	import { Editor, Transforms } from 'slate';
	import { addEventListener, getEditor } from '$lib/components/Slate.svelte';
	import type { IListItemElement } from './ListItemElement.svelte';
	import { PARAGRAPH_TYPE } from './ParagraphElement.svelte';

	// svelte-ignore unused-export-let
	export let element: INumberedListItemElement;
	export let isInline: boolean;
	export let isVoid: boolean;
	export let contenteditable: boolean;
	export let ref: HTMLElement | undefined = undefined;
	export let dir: 'rtl' | 'ltr' | undefined = undefined;

	const editor = getEditor();

	addEventListener('onKeyDown', (e) => {
		if (e.key === 'Enter' && e.shiftKey) {
			const [match] = Editor.nodes(editor, {
				match: isNumberedListItemElement as any
			});

			if (match) {
				e.preventDefault();
				e.stopPropagation();
				const [_, [index]] = match;
				const at = [index + 1];
				Transforms.insertNodes(editor, { type: PARAGRAPH_TYPE, children: [{ text: '' }] } as any, {
					at
				});
				Transforms.select(editor, at);
			}
		}
	});
</script>

<ul
	bind:this={ref}
	data-slate-node="element"
	data-slate-inline={isInline}
	data-slate-void={isVoid}
	{dir}
	{contenteditable}
>
	<slot />
</ul>

<style>
	ul {
		position: relative;
		margin: 0;
		padding-inline-start: 1.5rem;
		list-style-type: decimal;
	}
</style>
