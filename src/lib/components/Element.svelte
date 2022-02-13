<svelte:options immutable={true} />

<script lang="ts" context="module">
	export interface IElementProps extends svelte.JSX.HTMLAttributes<HTMLElement> {
		ref?: HTMLElement;
		element: SlateElement;
		isVoid: boolean;
		isInline: boolean;
		dir?: 'rtl' | 'ltr';
	}
</script>

<script lang="ts">
	import { Editor, Node } from 'slate';
	import type { Element as SlateElement, Range, Selection, Text as SlateText } from 'slate';
	import { onMount } from 'svelte';
	import { direction } from '../direction';
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
	import type { ISvelteComponent } from './Slate.svelte';
	import { getEditor, getReadOnlyContext } from './Slate.svelte';
	import type { ILeafProps, IPlaceholderProps } from './Leaf.svelte';

	export let element: SlateElement;
	export let decorations: Range[];
	export let selection: Selection = null;
	export let Element: ISvelteComponent<IElementProps>;
	export let Leaf: ISvelteComponent<ILeafProps>;
	export let Placeholder: ISvelteComponent<IPlaceholderProps>;

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
		const d = direction(Node.string(element));

		if (d === 'rtl') {
			dir = d;
		}
	}

	$: isVoid = Editor.isVoid(editor, element);
	$: contenteditable = !readOnly;
	let voidText: SlateText;
	$: if (isVoid) {
		if (!readOnly && isInline) {
			contenteditable = false;
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

<svelte:component this={Element} bind:ref {isVoid} {isInline} {contenteditable} {element} {dir}
	>{#if isVoid && !readOnly}{#if isInline}<span data-slate-spacer
				><svelte:component
					this={Text}
					{Placeholder}
					{Leaf}
					decorations={[]}
					isLast={false}
					parent={element}
					text={voidText}
				/></span
			>{:else}<div data-slate-spacer>
				<svelte:component
					this={Text}
					{Placeholder}
					{Leaf}
					decorations={[]}
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
