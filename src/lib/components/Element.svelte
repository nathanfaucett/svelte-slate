<script lang="ts" context="module">
	import type { Element } from 'slate';

	export interface IElementProps extends svelte.JSX.HTMLAttributes<HTMLElement> {
		element: Element;
		'data-slate-node': 'element';
		'data-slate-inline'?: true;
		'data-slate-void'?: true;
		dir?: 'rtl' | 'ltr';
	}
</script>

<script lang="ts">
	import { Editor, Node } from 'slate';
	import type { Element as SlateElement, Range, Selection, Text as SlateText } from 'slate';
	import type { SvelteComponent } from 'svelte';
	import { onMount } from 'svelte';
	import * as direction from 'direction';
	import Children from './Children.svelte';
	import type { Key } from '../Key';
	import Text from './Text.svelte';
	import { findKey } from '../utils';
	import {
		EDITOR_TO_KEY_TO_ELEMENT,
		ELEMENT_TO_NODE,
		NODE_TO_ELEMENT,
		NODE_TO_INDEX,
		NODE_TO_PARENT
	} from '../weakMaps';
	import { getEditor, getReadOnlyContext } from './Slate.svelte';

	export let element: SlateElement;
	export let decorations: Range[];
	export let selection: Selection = null;
	export let Element: typeof SvelteComponent;
	export let Leaf: typeof SvelteComponent;
	export let Placeholder: typeof SvelteComponent;

	const editor = getEditor();

	const readOnlyContext = getReadOnlyContext();
	$: readOnly = $readOnlyContext;

	$: isInline = editor.isInline(element);
	$: key = findKey(element);

	let currentKey: Key;
	let prevKey: Key;
	$: if (prevKey !== key) {
		currentKey = key;
		prevKey = key;
	}

	let dir: string;
	$: if (!isInline && Editor.hasInlines(editor, element)) {
		const d = direction.direction(Node.string(element));

		if (d === 'rtl') {
			dir = d;
		}
	}

	$: isVoid = Editor.isVoid(editor, element);
	$: contentEditable = !readOnly;
	let voidText: SlateText;
	$: if (isVoid) {
		if (!readOnly && isInline) {
			contentEditable = false;
		}

		const [[text]] = Node.texts(element);
		voidText = text;

		NODE_TO_INDEX.set(text, 0);
		NODE_TO_PARENT.set(text, element);
	}

	let ref: HTMLElement;
	$: if (ref) {
		EDITOR_TO_KEY_TO_ELEMENT.get(editor)?.set(currentKey, ref);
		NODE_TO_ELEMENT.set(element, ref);
		ELEMENT_TO_NODE.set(ref, element);
	}
	onMount(() => {
		EDITOR_TO_KEY_TO_ELEMENT.get(editor)?.set(currentKey, ref);
		NODE_TO_ELEMENT.set(element, ref);
		ELEMENT_TO_NODE.set(ref, element);
	});
</script>

<svelte:component
	this={Element}
	bind:ref
	data-slate-node="element"
	data-slate-void={isVoid}
	data-slate-inline={isInline}
	contenteditable={contentEditable}
	{element}
	{dir}
	>{#if isVoid}{#if isInline}<span data-slate-spacer
				><svelte:component
					this={Text}
					{Placeholder}
					{Leaf}
					{decorations}
					isLast={false}
					parent={element}
					text={voidText}
				/></span
			>{:else}<div data-slate-spacer>
				<svelte:component
					this={Text}
					{Placeholder}
					{Leaf}
					{decorations}
					isLast={false}
					parent={element}
					text={voidText}
				/>
			</div>{/if}{:else}<Children
			node={element}
			{decorations}
			{selection}
			{Element}
			{Placeholder}
			{Leaf}
		/>{/if}</svelte:component
>

<style>
	div,
	span {
		height: 0;
		color: transparent;
		outline: none;
		position: absolute;
	}
</style>
