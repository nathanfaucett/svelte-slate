<svelte:options immutable />

<script lang="ts" context="module">
	import type { IBaseElement } from './PluginElement.svelte';

	export interface IImageElement extends IBaseElement {
		type: 'image';
		url: string;
	}

	export function isImageElement(element: IBaseElement): element is IImageElement {
		return element.type === 'image';
	}

	export function withImages<T extends ISvelteEditor = ISvelteEditor>(editor: T): T {
		const { insertData, isVoid, deleteFragment } = editor;

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
			} else if (isUrl(text)) {
				insertImage(editor, text);
			} else {
				insertData(data);
			}
		};

		editor.deleteFragment = (direction) => {
			if (editor.selection && Range.isExpanded(editor.selection)) {
				const images = Array.from(
					Editor.nodes(editor, {
						match: isImageElement
					})
				);

				if (!!images.length) {
					const [, cellPath] = images[images.length - 1];
					Transforms.delete(editor, {
						at: cellPath,
						voids: true
					});
				}
			}

			deleteFragment(direction);
		};

		return editor;
	}

	export function insertImage(editor: Editor, url: string | ArrayBuffer) {
		const image = { type: 'image', url, children: [{ text: '' }] };
		Transforms.insertNodes(editor, image);
	}
</script>

<script lang="ts">
	import { getEditor, getFocusedContext } from '$lib/components/Slate.svelte';
	import { getSelectedContext } from '$lib/components/ChildElement.svelte';
	import type { ISvelteEditor } from '$lib/withSvelte';
	import { findPath } from '$lib/utils';
	import { Editor, Range, Transforms } from 'slate';
	import MdDelete from 'svelte-icons/md/MdDelete.svelte';
	import isUrl from 'is-url';

	export let element: IImageElement;
	export let isInline: boolean;
	export let isVoid: boolean;
	export let contenteditable: boolean;
	export let ref: HTMLElement = undefined;
	export let dir: 'rtl' | 'ltr' = undefined;

	const editor = getEditor();
	const selectedContext = getSelectedContext();
	const focusedContext = getFocusedContext();

	$: selected = !contenteditable ? false : $selectedContext && $focusedContext;
	$: path = findPath(element);

	function onRemove() {
		Transforms.removeNodes(editor, { at: path });
	}
</script>

<div
	class="image-element"
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
			<button on:click|preventDefault|stopPropagation={onRemove}>
				<MdDelete />
			</button>
		</div>
	</div>
	<slot />
</div>

<style>
	.image-element {
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

	button {
		cursor: pointer;
		color: #333;
		background: #fff;
		border: 1px solid #888;
		padding: 0.25rem;
		margin: 0;
	}
</style>
