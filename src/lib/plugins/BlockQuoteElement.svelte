<svelte:options immutable />

<script lang="ts" context="module">
	import type { IElement } from './Element.svelte';

	export const BLOCK_QUOTE_TYPE: string = 'block-quote';

	export interface IBlockQuoteElement extends IElement {
		type: 'block-quote';
	}

	export function isBlockQuoteElement(element: IElement): element is IBlockQuoteElement {
		return element.type === BLOCK_QUOTE_TYPE;
	}
</script>

<script lang="ts">
	import { addEventListener, getEditor } from '$lib/components/Slate.svelte';
	import { Editor, Transforms } from 'slate';
	import { PARAGRAPH_TYPE } from './ParagraphElement.svelte';

	// svelte-ignore unused-export-let
	export let element: IBlockQuoteElement;
	export let isInline: boolean;
	export let isVoid: boolean;
	export let contenteditable: boolean;
	export let ref: HTMLElement | undefined = undefined;
	export let dir: 'rtl' | 'ltr' | undefined = undefined;

	const editor = getEditor();

	addEventListener('onKeyDown', (e) => {
		if (e.key === 'Enter' && e.shiftKey) {
			const [match] = Editor.nodes(editor, {
				match: isBlockQuoteElement as any
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

<blockquote
	bind:this={ref}
	data-slate-node="element"
	data-slate-inline={isInline}
	data-slate-void={isVoid}
	{dir}
	{contenteditable}
>
	<slot />
</blockquote>

<style>
	blockquote {
		border-left: 2px solid #ddd;
		position: relative;
		margin: 0;
		padding-left: 10px;
		color: #aaa;
		font-style: italic;
	}
</style>
