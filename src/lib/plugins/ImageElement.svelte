<svelte:options immutable={false} />

<script lang="ts" context="module">
	import type { IBaseElement } from './Element.svelte';

	export const IMAGE_TYPE: string = 'image';

	export interface IImageElement extends IBaseElement {
		type: 'image';
		url: string;
	}

	export function isImageElement(element: IBaseElement): element is IImageElement {
		return element.type === IMAGE_TYPE;
	}

	export function isUrl(string: string) {
		let url: URL;
		try {
			url = new URL(string);
			return url.protocol === 'http:' || url.protocol === 'https:';
		} finally {
			return false;
		}
	}

	export function withImages<T extends ISvelteEditor = ISvelteEditor>(editor: T): T {
		const { insertData, isVoid } = editor;

		editor.isVoid = (element) => (isImageElement(element as IBaseElement) ? true : isVoid(element));

		editor.insertData = (data) => {
			const text = data.getData('text/plain');
			const { files } = data;

			if (files && files.length > 0) {
				for (let i = 0; i < files.length; i++) {
					const file = files[i];
					const reader = new FileReader();
					const [mime] = file.type.split('/');

					if (mime === IMAGE_TYPE) {
						reader.addEventListener('load', () => {
							const url = reader.result;
							insertImage(editor, url as string);
						});

						reader.readAsDataURL(file);
					}
				}
			} else if (isUrl(text)) {
				insertImage(editor, text);
			} else {
				insertData(data);
			}
		};

		return editor;
	}

	export function insertImage(editor: Editor, url: string | ArrayBuffer) {
		const image = { type: IMAGE_TYPE, url, children: [{ text: '' }] };
		Transforms.insertNodes(editor, image);
	}
</script>

<script lang="ts">
	import type { ISvelteEditor } from '../withSvelte';
	import { Editor, Transforms } from 'slate';
	import { getEditor, getFocusedContext, getReadOnlyContext } from '../components/Slate.svelte';
	import { getSelectedContext } from '../components/ChildElement.svelte';
	import { findPath } from '../utils';

	export let element: IImageElement;
	export let isInline: boolean;
	export let isVoid: boolean;
	// svelte-ignore unused-export-let
	export let contenteditable: boolean;
	export let ref: HTMLElement | undefined = undefined;
	export let dir: 'rtl' | 'ltr' | undefined = undefined;

	const editor = getEditor();
	const selectedContext = getSelectedContext();
	const focusedContext = getFocusedContext();
	const readOnlyContext = getReadOnlyContext();

	$: selected = $readOnlyContext ? false : $selectedContext && $focusedContext;
	$: path = findPath(element);

	function onRemove() {
		Transforms.removeNodes(editor, { at: path });
	}
</script>

<div
	class="container"
	bind:this={ref}
	data-slate-node="element"
	data-slate-inline={isInline}
	data-slate-void={isVoid}
	{dir}
	contenteditable={false}
>
	<div contenteditable={false} class="image">
		<img src={element.url} alt="" class:selected />
		<div class="delete" class:selected>
			<button on:mousedown={onRemove}>&times;</button>
		</div>
	</div>
	<slot />
</div>

<style>
	.container {
		position: relative;
		margin: 0;
	}
	.image {
		position: relative;
		line-height: 0;
	}
	.image img {
		display: block;
		max-width: 100%;
	}
	.image img.selected {
		box-shadow: 0 0 0 1px black;
	}

	.delete {
		display: none;
		position: absolute;
		top: 0.5rem;
		right: 0.5rem;
	}
	.delete.selected {
		display: inline;
	}
	.delete button {
		cursor: pointer;
		border: 1px solid black;
		padding: 0;
		width: 1.5rem;
		height: 1.5rem;
		color: black;
		font-size: 1.5rem;
		line-height: 1.5rem;
		background-color: white;
	}
</style>
