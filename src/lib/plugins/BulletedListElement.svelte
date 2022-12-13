<svelte:options immutable />

<script lang="ts" context="module">
	import type { IElement } from './Element.svelte';

	export const BULLETED_LIST_TYPE: string = 'bulleted-list';

	export interface IBulletedListItemElement extends IElement {
		type: 'bulleted-list';
		children: Array<IListItemElement>;
	}

	export function isBulletedListItemElement(
		element: IElement
	): element is IBulletedListItemElement {
		return element.type === BULLETED_LIST_TYPE;
	}
</script>

<script lang="ts">
	import { Editor, Transforms } from 'slate';
	import { addEventListener, getEditor } from '$lib/components/Slate.svelte';
	import type { IListItemElement } from './ListItemElement.svelte';
	import { PARAGRAPH_TYPE } from './ParagraphElement.svelte';

	// svelte-ignore unused-export-let
	export let element: IBulletedListItemElement;
	export let isInline: boolean;
	export let isVoid: boolean;
	export let contenteditable: boolean;
	export let ref: HTMLElement | undefined = undefined;
	export let dir: 'rtl' | 'ltr' | undefined = undefined;

	const editor = getEditor();

	addEventListener('onKeyDown', (e) => {
		if (e.key === 'Enter' && e.shiftKey) {
			const [match] = Editor.nodes(editor, {
				match: isBulletedListItemElement as any
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

<ol
	bind:this={ref}
	data-slate-node="element"
	data-slate-inline={isInline}
	data-slate-void={isVoid}
	{dir}
	{contenteditable}
>
	<slot />
</ol>

<style>
	ol {
		position: relative;
		margin: 0;
		padding-inline-start: 1.5rem;
		list-style-type: disc;
	}
</style>
