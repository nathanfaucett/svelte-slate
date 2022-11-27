<svelte:options immutable={false} />

<script lang="ts" context="module">
	import type { ISvelteEditor } from '../withSvelte';
	import type { IBaseElement } from './Element.svelte';

	export const IMAGE_TYPE: string = 'image';

	export interface IImageElement extends IBaseElement {
		type: 'image';
		url: string;
		label?: string;
		hideLabel?: boolean;
		hideId?: boolean;
	}

	export function isImageElement(element: IBaseElement): element is IImageElement {
		return element.type === IMAGE_TYPE;
	}

	export function isUrl(string: string) {
		let url: URL;
		try {
			url = new URL(string);
			return url.protocol === 'http:' || url.protocol === 'https:';
		} catch (error) {
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
		const { insertData, insertBreak } = editor;

		editor.insertBreak = () => {
			const [match] = Editor.nodes(editor, {
				match: isImageElement as any
			});
			if (!match) {
				insertBreak();
			} else {
				Transforms.insertNodes(editor, { type: PARAGRAPH_TYPE, children: [{ text: '' }] } as any, {
					at: editor.selection as any,
					select: true
				});
			}
		};

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
	import { findKey, findPath, getElementIndex } from '../utils';
	import MdDelete from 'svelte-icons/md/MdDelete.svelte';
	import MdEdit from 'svelte-icons/md/MdEdit.svelte';
	import Modal from './Modal.svelte';
	import { PARAGRAPH_TYPE } from './ParagraphElement.svelte';

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
	$: key = findKey(element);
	$: index = getElementIndex(editor, element, isImageElement as any);

	function onClick() {
		Transforms.select(editor, path);
	}
	let editing = false;
	function onEdit() {
		editing = true;
	}
	function onDone() {
		editing = false;
	}
	function onRemove() {
		Transforms.removeNodes(editor, { at: path });
	}
	function onLabelChange(e: Event & { currentTarget: HTMLInputElement }) {
		Transforms.setNodes(editor, { label: e.currentTarget.value } as any, { at: path });
	}
	function onHideLabelChange(e: Event & { currentTarget: HTMLInputElement }) {
		Transforms.setNodes(editor, { hideLabel: e.currentTarget.checked } as any, { at: path });
	}
	function onHideIdChange(e: Event & { currentTarget: HTMLInputElement }) {
		Transforms.setNodes(editor, { hideId: e.currentTarget.checked } as any, { at: path });
	}
</script>

<div
	class="image-element"
	class:image-selectable={contenteditable}
	class:image-selected={selected}
	bind:this={ref}
	data-slate-node="element"
	data-slate-inline={isInline}
	data-slate-void={isVoid}
	{dir}
	{contenteditable}
>
	<div class="image-value" contenteditable={false} on:mousedown={onClick} on:touchstart={onClick}>
		<img src={element.url} alt={element.label} title={element.label} />
		<div class="image-edit">
			<button type="button" on:mousedown={onEdit} on:touchstart={onEdit}><MdEdit /></button>
			<button type="button" on:mousedown={onRemove} on:touchstart={onRemove}><MdDelete /></button>
		</div>
	</div>
	<div class="image-meta">
		<div class="image-meta-content">
			{#if !element.hideLabel && element.label}
				<div class="image-label" contenteditable={false}>
					<span class="image-label-value">{element.label}</span>{#if !element.hideId}<span
							class="image-id">{index}</span
						>{/if}
				</div>
			{/if}
			<div class="image-description">
				<slot />
			</div>
		</div>
	</div>
</div>

<Modal bind:open={editing}>
	<form on:submit|preventDefault={onDone}>
		<label for="hide-label-{key}">Hide Label?</label>
		<input
			type="checkbox"
			name="hide-label-{key}"
			checked={element.hideLabel || false}
			on:change={onHideLabelChange}
		/>
		<label for="hide-id-{key}">Hide Id?</label>
		<input
			type="checkbox"
			name="hide-id-{key}"
			checked={element.hideId || false}
			on:change={onHideIdChange}
		/>
		<input type="text" placeholder="Label" value={element.label || ''} on:input={onLabelChange} />
	</form>
</Modal>

<style>
	.image-element {
		position: relative;
		margin: 0;
	}
	.image-selectable {
		cursor: pointer;
	}
	.image-selectable:hover {
		box-shadow: 0 0 0 1px black;
	}
	.image-selected {
		box-shadow: 0 0 0 1px black;
	}

	.image-value {
		display: block;
		position: relative;
		text-align: center;
	}
	img {
		max-width: 100%;
	}

	.image-edit {
		display: none;
		position: absolute;
		top: -1.75rem;
		left: 50%;
		transform: translate(-50%, 0);
		background-color: white;
	}
	.image-selected .image-edit {
		display: block;
	}

	.image-meta {
		display: flex;
		justify-content: center;
	}
	.image-meta-content {
		display: flex;
		flex-direction: row;
	}
	.image-label {
		padding-right: 0.5rem;
		flex-shrink: 1;
	}
	.image-description {
		cursor: text;
		flex-grow: 1;
		min-width: 1rem;
	}
	.image-id {
		margin-left: 0.5rem;
	}

	button {
		display: inline-block;
		cursor: pointer;
		border: 1px solid black;
		margin: 0;
		padding: 0;
		width: 1.5rem;
		height: 1.5rem;
		background-color: white;
	}
</style>
