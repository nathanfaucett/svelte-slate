<svelte:options immutable />

<script lang="ts" context="module">
	import type { IBaseElement, IElement } from './Element.svelte';

	export const LANGUAGE_CONTEXT_KEY = createContextKey<keyof typeof languages>();
	export const CODE_TYPE: string = 'code';

	export function getLanguageContext() {
		return getFromContext(LANGUAGE_CONTEXT_KEY);
	}

	const LANG_LOADING: Record<string, boolean> = {};
	const LANG_LOADED: Record<string, boolean> = {};

	async function loadLanguage(name: keyof typeof languages): Promise<Grammar> {
		if (!LANG_LOADING[name] && !LANG_LOADED[name]) {
			LANG_LOADING[name] = true;
			const loader = languages[name];
			if (loader) {
				return loader()
					.then(() => {
						LANG_LOADED[name] = true;
						return Prism.languages[name];
					})
					.finally(() => {
						LANG_LOADING[name] = false;
					});
			}
		}
		LANG_LOADING[name] = false;
		LANG_LOADED[name] = true;
		return Prism.languages[name];
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
		children: Array<ICodeEditorElement>;
	}

	export function isCodeElement(element: IBaseElement): element is ICodeElement {
		return element.type === CODE_TYPE;
	}

	export function withCode<T extends ISvelteEditor = ISvelteEditor>(editor: T): T {
		const { deleteBackward } = editor;

		editor.deleteBackward = (...args) => {
			if (editor.selection && Range.isCollapsed(editor.selection)) {
				const [match] = Editor.nodes(editor, {
					match: isCodeElement as any
				});

				if (match) {
					const [, path] = match;
					const start = Editor.start(editor, path);

					if (Point.equals(editor.selection.anchor, start)) {
						const newProperties: Partial<IElement> = {
							type: 'paragraph'
						};
						Transforms.setNodes(editor, newProperties, {
							match: isCodeElement as any
						});
						return;
					}
				}
			}

			deleteBackward(...args);
		};

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
	import type { Token, Grammar } from 'prismjs';
	// @ts-ignore
	import Prism from 'prismjs';
	import 'prismjs';
	import { languages } from './prismjs';
	import { Editor, Range, Transforms, Point, type NodeEntry, Text } from 'slate';
	import { CODE_LINE_TYPE, type ICodeEditorElement } from './CodeEditorElement.svelte';
	import {
		DECORATE_CONTEXT_KEY,
		findPath,
		createContext,
		createContextKey,
		getFromContext,
		getEditor,
		type ISvelteEditor
	} from 'svelte-slate';
	import CodeEditorElement from './CodeEditorElement.svelte';
	import CodeEditorLeaf from './CodeEditorLeaf.svelte';
	import { ELEMENT_CONTEXT_KEY, LEAF_CONTEXT_KEY } from '$lib/components/Editable.svelte';

	export let element: ICodeElement;
	export let isInline: boolean;
	export let isVoid: boolean;
	export let contenteditable: boolean;
	export let ref: HTMLElement | undefined = undefined;
	export let dir: 'rtl' | 'ltr' | undefined = undefined;

	const editor = getEditor();

	createContext(ELEMENT_CONTEXT_KEY, CodeEditorElement);
	createContext(LEAF_CONTEXT_KEY, CodeEditorLeaf);

	const languageNames = Object.keys(languages).sort() as Array<keyof typeof languages>;
	const languageContext = createContext<keyof typeof languages>(
		LANGUAGE_CONTEXT_KEY,
		element.language as keyof typeof languages
	);
	let prismLanguage: Grammar | undefined;
	$: loadLanguage($languageContext).then((lang) => {
		prismLanguage = lang;
	});

	function onSelect(e: Event) {
		const language = (e.target as HTMLSelectElement).value as keyof typeof languages;
		languageContext.set(language);
		Transforms.setNodes(editor, { language } as any, { at: findPath(element) });
	}

	$: decorate = ([node, path]: NodeEntry): Range[] => {
		const ranges: Range[] = [];

		if (!Text.isText(node) || !prismLanguage) {
			return ranges;
		} else {
			const tokens = Prism.tokenize(node.text, prismLanguage);
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
	<div class="language-select" contenteditable={false}>
		<select value={element.language} on:change={onSelect} contenteditable={false}>
			{#each languageNames as language}
				<option value={language}>{language}</option>
			{/each}
		</select>
	</div>
	<ol {contenteditable}>
		<slot />
	</ol>
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
		padding-bottom: 0.25rem;
		border-bottom: 1px solid #ccc;
	}
	ol {
		padding-left: 2rem;
		margin: 0;
	}
</style>
