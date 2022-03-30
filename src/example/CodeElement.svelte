<script lang="ts" context="module">
	import type { IBaseElement, IElement } from './Element.svelte';

	const LANGUAGE_CONTEXT_KEY = createContextKey<string>();

	export function getLanguageContext() {
		return getFromContext(LANGUAGE_CONTEXT_KEY);
	}

	function getLength(token: string | Token) {
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
		return element.type === 'code';
	}

	export function withCode<T extends ISvelteEditor = ISvelteEditor>(editor: T): T {
		const { deleteBackward } = editor;

		editor.deleteBackward = (...args) => {
			if (editor.selection && Range.isCollapsed(editor.selection)) {
				const [match] = Editor.nodes(editor, {
					match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && n['type'] === 'code'
				});

				if (match) {
					const [, path] = match;
					const start = Editor.start(editor, path);

					if (Point.equals(editor.selection.anchor, start)) {
						const newProperties: Partial<IElement> = {
							type: 'paragraph'
						};
						Transforms.setNodes(editor, newProperties, {
							match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && n['type'] === 'code'
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
			type: 'code',
			language: 'js',
			children: [{ type: 'code-line', children: [{ text: '' }] }]
		};
		Transforms.insertNodes(editor, node);
	}
</script>

<script lang="ts">
	import type { Token } from 'prismjs';
	import * as Prism from 'prismjs';
	import 'prismjs';
	import 'prismjs/components/prism-python.js';
	import 'prismjs/components/prism-php.js';
	import 'prismjs/components/prism-sql.js';
	import 'prismjs/components/prism-java.js';
	import 'prismjs/components/prism-typescript.js';
	import 'prismjs/components/prism-elixir.js';
	import 'prismjs/components/prism-css.js';
	import 'prismjs/components/prism-c.js';
	import 'prismjs/components/prism-cpp.js';
	import 'prismjs/components/prism-rust.js';
	import 'prismjs/components/prism-bash.js';
	import 'prismjs/components/prism-sass.js';
	import 'prismjs/components/prism-scala.js';
	import {
		Editor,
		Range,
		Transforms,
		Point,
		Element as SlateElement,
		type NodeEntry,
		Text
	} from 'slate';
	import type { ICodeEditorElement } from './CodeEditorElement.svelte';
	import { DECORATE_CONTEXT_KEY, findPath, getEditor, type ISvelteEditor } from '$lib';
	import { createContext, createContextKey, getFromContext } from '$lib/utils';
	import CodeEditorElement from './CodeEditorElement.svelte';
	import CodeEditorLeaf from './CodeEditorLeaf.svelte';
	import { ELEMENT_CONTEXT_KEY, LEAF_CONTEXT_KEY } from '$lib/components/Editable.svelte';

	export let element: ICodeElement;
	export let isInline: boolean;
	export let isVoid: boolean;
	export let contenteditable: boolean;
	export let ref: HTMLElement = undefined;
	export let dir: 'rtl' | 'ltr' = undefined;

	const editor = getEditor();

	createContext(ELEMENT_CONTEXT_KEY, CodeEditorElement);
	createContext(LEAF_CONTEXT_KEY, CodeEditorLeaf);

	const languageContext = createContext(LANGUAGE_CONTEXT_KEY, element.language);
	$: prismLanguage = Prism.languages[$languageContext];

	function onSelect(e: Event) {
		const language = (e.target as HTMLSelectElement).value as string;
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
			<option value="js">JavaScript</option>
			<option value="typescript">TypeScript</option>
			<option value="python">Python</option>
			<option value="php">PHP</option>
			<option value="sql">SQL</option>
			<option value="java">Java</option>
			<option value="elixir">Elixir</option>
			<option value="css">CSS</option>
			<option value="c">C</option>
			<option value="cpp">C++</option>
			<option value="rust">Rust</option>
			<option value="bash">Bash</option>
			<option value="sass">Sass</option>
			<option value="scala">Scala</option>
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
