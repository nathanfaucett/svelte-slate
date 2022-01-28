<svelte:options immutable={true} />

<script lang="ts" context="module">
	import type { IBaseElement } from './Element.svelte';

	export interface IImageElement extends IBaseElement {
		type: 'image';
		url: string;
	}

	export function isImageElement(element: IBaseElement): element is IImageElement {
		return element.type === 'image';
	}

	export function withImages<T extends ISvelteEditor = ISvelteEditor>(editor: T): T {
		const { insertData, isVoid } = editor;

		editor.isVoid = (element) => {
			return isImageElement(element as IBaseElement) ? true : isVoid(element);
		};

		editor.insertData = (data) => {
			const text = data.getData('text/plain');
			const { files } = data;

			if (files && files.length > 0) {
				for (let i = 0; i < files.length; i++) {
					const file = files[i];
					const reader = new FileReader();
					const [mime] = file.type.split('/');

					if (mime === 'image') {
						reader.addEventListener('load', () => {
							const url = reader.result;
							insertImage(editor, url);
						});

						reader.readAsDataURL(file);
					}
				}
			} else if (isImageUrl(text)) {
				insertImage(editor, text);
			} else {
				insertData(data);
			}
		};

		return editor;
	}

	export function insertImage(editor: Editor, url: string | ArrayBuffer) {
		const image = { type: 'image', url, children: [{ text: '' }] };
		Transforms.insertNodes(editor, image);
	}

	export function isImageUrl(url: string): boolean {
		if (!url) {
			return false;
		}
		if (!isUrl(url)) {
			return false;
		}
		const ext = new URL(url).pathname.split('.').pop();
		return imageExtensions.includes(ext);
	}
</script>

<script lang="ts">
	import { getEditor, getFocusedContext, getReadOnlyContext } from '$lib/components/Slate.svelte';
	import { getSelectedContext } from '$lib/components/ChildElement.svelte';
	import type { ISvelteEditor } from '$lib/withSvelte';
	import { findPath } from '$lib/utils';
	import { Editor, Transforms } from 'slate';
	import Button from './Button.svelte';
	import MdDelete from 'svelte-icons/md/MdDelete.svelte';
	import isUrl from 'is-url';
	import imageExtensions from 'image-extensions';

	export let element: IImageElement;
	export let isInline: boolean;
	export let isVoid: boolean;
	export let contenteditable: boolean;
	export let ref: HTMLElement = undefined;
	export let dir: 'rtl' | 'ltr' = undefined;

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
	<slot />
	<div contenteditable={false} class="image">
		<img src={element.url} alt="" class:selected />
		<div class="delete" class:selected>
			<Button onMouseDown={onRemove}>
				<MdDelete />
			</Button>
		</div>
	</div>
</div>

<style>
	.container {
		position: relative;
		margin: 0;
	}
	.image {
		position: relative;
	}
	.image img {
		display: block;
		max-width: 100%;
	}
	.image img.selected {
		box-shadow: 0 0 0 3px #333;
	}

	.delete {
		display: none;
		position: absolute;
		top: 0.5em;
		left: 0.5em;
		background-color: white;
	}
	.delete.selected {
		display: inline;
	}
</style>
