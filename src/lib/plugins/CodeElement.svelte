<svelte:options immutable />

<script lang="ts" context="module">
	import type { Token, Grammar } from 'prismjs';
	import { languages } from './prismjs';
	import type { IBaseElement, IElement } from './Element.svelte';
	import { createContext, createContextKey, findPath, getFromContext, isReadOnly } from '../utils';
	import type { ISvelteEditor } from '$lib/withSvelte';

	export const LANGUAGE_CONTEXT_KEY = createContextKey<keyof typeof languages>();
	export const CODE_TYPE: string = 'code';

	export function getLanguageContext() {
		return getFromContext(LANGUAGE_CONTEXT_KEY);
	}

	const LANG_LOADING: Record<string, boolean> = {};
	const LANG_LOADED: Record<string, boolean> = {};

	async function loadLanguage(id: keyof typeof languages): Promise<Grammar> {
		if (!LANG_LOADING[id] && !LANG_LOADED[id]) {
			LANG_LOADING[id] = true;
			const loader = languages[id].loader;
			if (loader) {
				return loader()
					.then(() => {
						LANG_LOADED[id] = true;
						return window.Prism.languages[id];
					})
					.finally(() => {
						LANG_LOADING[id] = false;
					});
			}
		}
		LANG_LOADING[id] = false;
		LANG_LOADED[id] = true;
		return window.Prism.languages[id];
	}

	function getLength(token: string | Token): number {
		if (typeof token === 'string') {
			return token.length;
		} else if (typeof token.content === 'string') {
			return token.content.length;
		} else {
			return (token.content as Array<string | Token>).reduce((l, t) => l + getLength(t), 0);
		}
	}

	export interface ICodeElement extends IBaseElement {
		type: 'code';
		language: string;
		maxHeight?: number;
		children: Array<ICodeEditorElement>;
	}

	export function isCodeElement(element: IBaseElement): element is ICodeElement {
		return element.type === CODE_TYPE;
	}

	export function withCode<T extends ISvelteEditor = ISvelteEditor>(editor: T): T {
		const { hasOwnContext } = editor;

		editor.hasOwnContext = (e) =>
			isCodeElement(e as IBaseElement) || isCodeEditorElement(e as IBaseElement)
				? false
				: hasOwnContext(e);

		return editor;
	}

	export function insertCode(editor: Editor) {
		const node = {
			type: CODE_TYPE,
			language: 'javascript',
			children: [{ type: CODE_LINE_TYPE, children: [{ text: '' }] }]
		};
		Transforms.insertNodes(editor, node);
	}
</script>

<script lang="ts">
	import { Editor, Range, Transforms, Point, type NodeEntry, Text } from 'slate';
	import {
		CODE_LINE_TYPE,
		isCodeEditorElement,
		type ICodeEditorElement
	} from './CodeEditorElement.svelte';
	import CodeEditorElement from './CodeEditorElement.svelte';
	import CodeEditorLeaf from './CodeEditorLeaf.svelte';
	import { ELEMENT_CONTEXT_KEY, LEAF_CONTEXT_KEY } from '../components/Editable.svelte';
	import {
		addEventListener,
		DECORATE_CONTEXT_KEY,
		getEditor,
		getReadOnlyContext
	} from '../components/Slate.svelte';
	import { PARAGRAPH_TYPE } from './ParagraphElement.svelte';

	export let element: ICodeElement;
	export let isInline: boolean;
	export let isVoid: boolean;
	export let contenteditable: boolean;
	export let ref: HTMLElement | undefined = undefined;
	export let dir: 'rtl' | 'ltr' | undefined = undefined;

	const editor = getEditor();
	const readOnly = getReadOnlyContext();

	createContext(ELEMENT_CONTEXT_KEY, CodeEditorElement);
	createContext(LEAF_CONTEXT_KEY, CodeEditorLeaf);

	const languageNames = Object.entries(languages)
		.map(([id, lang]) => [id, lang.name])
		.sort(([a], [b]) => (a < b ? -1 : a === b ? 0 : 1));
	const languageContext = createContext<keyof typeof languages>(
		LANGUAGE_CONTEXT_KEY,
		element.language as keyof typeof languages
	);
	let prismLanguage: Grammar | undefined;
	$: if (typeof window !== 'undefined') {
		loadLanguage($languageContext).then((lang) => {
			prismLanguage = lang;
		});
	}

	function onSelect(e: Event & { currentTarget: HTMLSelectElement }) {
		const language = e.currentTarget.value as keyof typeof languages;
		languageContext.set(language);
		Transforms.setNodes(editor, { language } as any, { at: findPath(element) });
	}

	addEventListener('onKeyDown', (e) => {
		if (editor.selection && e.key === 'Enter' && e.shiftKey) {
			const [match] = Editor.nodes(editor, {
				match: isCodeElement as any
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

	$: decorate = ([node, path]: NodeEntry): Range[] => {
		const ranges: Range[] = [];

		if (!Text.isText(node) || !prismLanguage) {
			return ranges;
		} else {
			const tokens = window.Prism.tokenize(node.text, prismLanguage);
			let start = 0;

			for (const token of tokens) {
				const length = getLength(token);
				const end = start + length;

				if (typeof token !== 'string') {
					ranges.push({
						[token.type]: true,
						anchor: { path, offset: start },
						focus: { path, offset: end }
					});
				}

				start = end;
			}

			return ranges;
		}
	};
	const decorateContext = createContext(DECORATE_CONTEXT_KEY, decorate);
	$: decorateContext.set(decorate);

	let codeElement: HTMLOListElement;
	$: if (codeElement) {
		if (element.maxHeight) {
			codeElement.style.maxHeight = `${element.maxHeight}px`;
		} else {
			codeElement.style.maxHeight = '';
		}
	}

	function onMaxHeightChange(e: Event & { currentTarget: HTMLInputElement }) {
		const maxHeight = parseInt(e.currentTarget.value);
		Transforms.setNodes(editor, { maxHeight: isNaN(maxHeight) ? undefined : maxHeight } as any, {
			at: findPath(element)
		});
	}
</script>

<div
	class="code-element"
	bind:this={ref}
	data-slate-node="element"
	data-slate-inline={isInline}
	data-slate-void={isVoid}
	{dir}
	{contenteditable}
>
	<div
		class="language-select"
		class:hidden={$readOnly}
		contenteditable={false}
		on:mousedown|stopPropagation
		on:touchstart|stopPropagation
	>
		<select value={element.language} on:change={onSelect} contenteditable={false}>
			{#each languageNames as [id, language]}
				<option value={id}>{language}</option>
			{/each}
		</select>
		<input
			type="number"
			placeholder="Max Height (Pixels)"
			value={element.maxHeight}
			on:input={onMaxHeightChange}
		/>
	</div>
	<ol {contenteditable} bind:this={codeElement}><slot /></ol>
</div>

<style>
	.code-element {
		position: relative;
		font-family: monospace;
		background: #f1f1f1;
		padding: 0.25rem;
		border: 1px solid #ccc;
	}
	.language-select {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding-bottom: 0.25rem;
		border-bottom: 1px solid #ccc;
	}
	.language-select.hidden {
		display: none;
	}
	ol {
		list-style-type: decimal;
		padding-left: 2.5rem;
		margin: 0;
		overflow: auto;
	}
</style>
