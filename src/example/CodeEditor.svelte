<script lang="ts" context="module">
	const LANGUAGE_CONTEXT_KEY = {};

	export function getLanguageContext() {
		const context = getContext<Writable<string>>(LANGUAGE_CONTEXT_KEY);
		if (!context) {
			throw new Error(
				`The \`getLanguageContext\` must be used inside the CodeEditor component's context.`
			);
		}
		return context;
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
</script>

<script lang="ts">
	import Prism, { type Token } from 'prismjs';
	import type { Writable } from 'svelte/store';
	import { writable } from 'svelte/store';
	import { setContext, getContext } from 'svelte';
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
	import { createEditor, Text, type NodeEntry, type Range } from 'slate';
	import { Slate, Editable, withSvelte } from 'svelte-slate';
	import CodeEditorLeaf from './CodeEditorLeaf.svelte';
	import CodeEditorElement, { type ICodeEditorElement } from './CodeEditorElement.svelte';

	export let value: Array<ICodeEditorElement>;
	export let language: string;
	export let readOnly: boolean;

	const languageContext = writable(language);
	setContext(LANGUAGE_CONTEXT_KEY, languageContext);

	const editor = withSvelte(createEditor());

	function onSelect(e: Event) {
		language = (e.target as HTMLSelectElement).value as string;
	}

	let prevLanguage = language;
	$: if (prevLanguage !== language) {
		prevLanguage = language;
		languageContext.set(language);
	}

	function decorate([node, path]: NodeEntry): Range[] {
		const ranges: Range[] = [];
		const lang = Prism.languages[language];

		if (!Text.isText(node) || !lang) {
			return ranges;
		} else {
			const tokens = Prism.tokenize(node.text, lang);
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
	}

	function onKeyDown(event: KeyboardEvent) {
		if (event.key === 'Tab') {
			event.preventDefault();
			editor.insertText('\t');
		}
	}
</script>

<div class="code-editor" contenteditable={false}>
	<div class="language-select" contenteditable={false}>
		<select value={language} on:select={onSelect}>
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
	<ol>
		<Slate {editor} bind:value
			><Editable
				Element={CodeEditorElement}
				Leaf={CodeEditorLeaf}
				{onKeyDown}
				{readOnly}
				{decorate}
				placeholder=""
			/></Slate
		>
	</ol>
</div>

<style>
	.code-editor {
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
