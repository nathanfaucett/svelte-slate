<script lang="ts" context="module">
	import type { IBaseElement } from './Element.svelte';

	export interface ICodeElement extends IBaseElement {
		type: 'code';
		language: string;
		children: Array<ICodeEditorElement>;
	}

	export function isCodeElement(element: IBaseElement): element is ICodeElement {
		return element.type === 'code';
	}

	export function withCode<T extends ISvelteEditor = ISvelteEditor>(editor: T): T {
		const { isVoid } = editor;

		editor.isVoid = (element) => (isCodeElement(element as IBaseElement) ? true : isVoid(element));

		return editor;
	}

	export function insertCode(editor: Editor) {
		const node = {
			type: 'code',
			language: 'js',
			children: [{ type: 'code-line', children: [{ text: '' }] }]
		};
		Transforms.insertNodes(editor, node);
	}
</script>

<script lang="ts">
	import { Editor, Transforms } from 'slate';
	import CodeEditor from './CodeEditor.svelte';
	import { findPath, getEditor, type ISvelteEditor } from '$lib';
	import type { ICodeEditorElement } from './CodeEditorElement.svelte';

	export let element: ICodeElement;
	export let isInline: boolean;
	export let isVoid: boolean;
	export let contenteditable: boolean;
	export let ref: HTMLElement = undefined;
	export let dir: 'rtl' | 'ltr' = undefined;

	const editor = getEditor();

	$: path = findPath(element);

	let value: Array<ICodeEditorElement> = element.children;
	let prevValue = value;
	$: if (value !== prevValue) {
		prevValue = value;
		Transforms.setNodes(editor, { children: value } as any, { at: path });
	}

	let language: string = element.language;
	let prevLanguage = language;
	$: if (language !== prevLanguage) {
		prevLanguage = language;
		Transforms.setNodes(editor, { language } as any, { at: path });
	}
</script>

<div
	bind:this={ref}
	data-slate-node="element"
	data-slate-inline={isInline}
	data-slate-void={isVoid}
	{dir}
	{contenteditable}
>
	<CodeEditor {language} {value} readOnly={!contenteditable} /><slot />
</div>
