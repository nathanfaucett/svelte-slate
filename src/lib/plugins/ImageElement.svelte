<svelte:options immutable={false} />

<script lang="ts" context="module">
	import type { ISvelteEditor } from '../withSvelte';
	import type { IBaseElement } from './Element.svelte';

	export const IMAGE_TYPE: string = 'image';

	export interface IImageElement extends IBaseElement {
		type: 'image';
		url: string;
		width?: number;
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

	export type ImagesOptions = {
		allowPaste?: boolean;
	};

	export function withImages<T extends ISvelteEditor = ISvelteEditor>(
		editor: T,
		options: ImagesOptions = {}
	): T {
		const { insertData, isVoid } = editor;

		editor.isVoid = (element) => (isImageElement(element as IBaseElement) ? true : isVoid(element));

		editor.insertData = (data) => {
			const text = data.getData('text/plain');

			if (options.allowPaste !== false && data.files && data.files.length > 0) {
				for (let i = 0; i < data.files.length; i++) {
					const file = data.files[i];
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
	import { Editor, Transforms } from 'slate';
	import { getEditor, getFocusedContext, getReadOnlyContext } from '../components/Slate.svelte';
	import { getSelectedContext } from '../components/ChildElement.svelte';
	import { findPath } from '../utils';
	import { onMount } from 'svelte';
	import { DragGesture } from '@use-gesture/vanilla';
	import type { EventTypes, Handler } from '@use-gesture/core/types';
	import { clamp } from './utils';

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
	$: percent = element.width || 1;

	function onRemove() {
		Transforms.removeNodes(editor, { at: path });
	}

	let topElement: HTMLElement;
	let rightElement: HTMLElement;
	let bottomElement: HTMLElement;
	let leftElement: HTMLElement;
	let imageElement: HTMLImageElement;
	let imageEditorElement: HTMLElement;

	let aspect: number;
	let startWidth: number;
	let startHeight: number;
	let width: number;

	const onTopDrag: Handler<'drag', EventTypes['drag']> = (state) => {
		state.event.stopPropagation();
		if (!selected) {
			return;
		}
		if (state.first) {
			aspect = imageElement.offsetWidth / imageElement.offsetHeight;
			startHeight = (imageElement.offsetWidth * percent) / aspect;
			width = imageElement.offsetWidth;
		}
		percent = clamp(((startHeight - state.movement[1]) * aspect) / width, 0.5, 1);
	};
	const onRightDrag: Handler<'drag', EventTypes['drag']> = (state) => {
		state.event.stopPropagation();
		if (!selected) {
			return;
		}
		if (state.first) {
			startWidth = imageElement.offsetWidth * percent;
			width = imageElement.offsetWidth;
		}
		percent = clamp((startWidth + state.movement[0]) / width, 0.5, 1);
	};
	const onBottomDrag: Handler<'drag', EventTypes['drag']> = (state) => {
		state.event.stopPropagation();
		if (!selected) {
			return;
		}
		if (state.first) {
			aspect = imageElement.offsetWidth / imageElement.offsetHeight;
			startHeight = (imageElement.offsetWidth * percent) / aspect;
			width = imageElement.offsetWidth;
		}
		percent = clamp(((startHeight + state.movement[1]) * aspect) / width, 0.5, 1);
	};
	const onLeftDrag: Handler<'drag', EventTypes['drag']> = (state) => {
		state.event.stopPropagation();
		if (!selected) {
			return;
		}
		if (state.first) {
			startWidth = imageElement.offsetWidth * percent;
			width = imageElement.offsetWidth;
		}
		percent = clamp((startWidth - state.movement[0]) / width, 0.5, 1);
	};

	let prevPercent: number;
	$: if (imageEditorElement && prevPercent !== percent) {
		prevPercent = percent;
		imageEditorElement.style.width = `${percent * 100}%`;
		Transforms.setNodes(editor, { width: percent } as any, { at: findPath(element) });
	}

	onMount(() => {
		const top = new DragGesture(topElement, onTopDrag, {
			axis: 'y'
		});
		const right = new DragGesture(rightElement, onRightDrag, {
			axis: 'x'
		});
		const bottom = new DragGesture(bottomElement, onBottomDrag, {
			axis: 'y'
		});
		const left = new DragGesture(leftElement, onLeftDrag, {
			axis: 'x'
		});

		return () => {
			top.destroy();
			right.destroy();
			bottom.destroy();
			left.destroy();
		};
	});
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
	<div contenteditable={false} class="image" class:selected>
		<div class="image-editor" bind:this={imageEditorElement}>
			<img bind:this={imageElement} src={element.url} alt="" />
			<div class="image-top" bind:this={topElement} />
			<div class="image-right" bind:this={rightElement} />
			<div class="image-bottom" bind:this={bottomElement} />
			<div class="image-left" bind:this={leftElement} />
		</div>
		<div class="delete">
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
		text-align: center;
	}
	.image,
	.image-editor {
		position: relative;
		line-height: 0;
		user-select: none;
	}
	.image-editor {
		display: inline-block;
	}
	.image-top,
	.image-right,
	.image-bottom,
	.image-left {
		position: absolute;
		z-index: 1;
	}
	.image.selected .image-top,
	.image.selected .image-bottom {
		cursor: ns-resize;
	}
	.image-top,
	.image-bottom {
		left: 0;
		width: 100%;
		height: 8px;
	}
	.image-top {
		top: -4px;
	}
	.image-bottom {
		bottom: -4px;
	}
	.image.selected .image-left,
	.image.selected .image-right {
		cursor: ew-resize;
	}
	.image-left,
	.image-right {
		top: 0;
		width: 8px;
		height: 100%;
	}
	.image-left {
		left: -4px;
	}
	.image-right {
		right: -4px;
	}

	img {
		display: block;
		max-width: 100%;
	}
	.image.selected img {
		box-shadow: 0 0 0 1px black;
	}

	.delete {
		display: none;
		position: absolute;
		top: 0.5rem;
		right: 0.5rem;
	}
	.image.selected .delete {
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
