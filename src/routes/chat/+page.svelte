<script lang="ts">
	import Slate from 'svelte-slate/plugins/Slate.svelte';
	import Editable from 'svelte-slate/plugins/Editable.svelte';
	import { createEditor, Editor, type BaseRange, type NodeMatch } from 'slate';
	import { withHistory } from 'slate-history';
	import { DEFAULT_PLUGINS } from 'svelte-slate/plugins/DEFAULT_PLUGINS';
	import ImageElement, { IMAGE_TYPE, withImages } from '../../lib/plugins/ImageElement.svelte';
	import { longpress } from '../../lib/plugins/longpress';
	import ImageButton from '../../example/ImageButton.svelte';
	import CodeButton from '../../example/CodeButton.svelte';
	import CheckListItemButton from '../../example/CheckListItemButton.svelte';
	import MarkButton from '../../example/MarkButton.svelte';
	import BlockButton from '../../example/BlockButton.svelte';
	import CodeElement, {
		CODE_TYPE,
		isCodeElement,
		withCode
	} from '../../lib/plugins/CodeElement.svelte';
	import HoveringToolbar from '../../lib/plugins/HoveringToolbar.svelte';
	import MdFormatBold from 'svelte-icons/md/MdFormatBold.svelte';
	import MdCode from 'svelte-icons/md/MdCode.svelte';
	import MdLooksOne from 'svelte-icons/md/MdLooksOne.svelte';
	import MdLooksTwo from 'svelte-icons/md/MdLooksTwo.svelte';
	import MdFormatItalic from 'svelte-icons/md/MdFormatItalic.svelte';
	import MdFormatUnderlined from 'svelte-icons/md/MdFormatUnderlined.svelte';
	import MdFormatListNumbered from 'svelte-icons/md/MdFormatListNumbered.svelte';
	import MdFormatListBulleted from 'svelte-icons/md/MdFormatListBulleted.svelte';
	import MdFormatQuote from 'svelte-icons/md/MdFormatQuote.svelte';
	import MathButton from '../../example/MathButton.svelte';
	import MathElement, { MATH_TYPE, withMath } from '../../lib/plugins/MathElement.svelte';
	import { withSvelte } from '../../lib/withSvelte';
	import { isReadOnly } from '../../lib/utils';
	import type { IBaseElement } from '$lib/plugins/Element.svelte';

	const editor = withHistory(withSvelte(createEditor()));
	let plugins = {
		...DEFAULT_PLUGINS,
		[IMAGE_TYPE]: { component: ImageElement, withFn: withImages },
		[CODE_TYPE]: { component: CodeElement, withFn: withCode },
		[MATH_TYPE]: { component: MathElement, withFn: withMath }
	};
	let value = [
		{
			type: 'paragraph',
			children: [{ text: '' }]
		}
	];

	let open = false;
	let ref: HTMLDivElement;

	function onKeyDown(e: KeyboardEvent) {
		if (e.key === 'Enter' && !e.shiftKey) {
			Editor.deleteBackward(editor);
			return false;
		}
	}

	function onLongPress() {
		if (!isReadOnly(editor)) {
			const [match] = Array.from(
				Editor.nodes(editor, {
					at: Editor.unhangRange(editor, editor.selection as BaseRange),
					match: isCodeElement as unknown as NodeMatch<IBaseElement>
				})
			);
			if (!match) {
				open = true;
			}
		}
	}
</script>

<p>
	<a
		target="_blank"
		href="https://github.com/nathanfaucett/svelte-slate/blob/main/src/routes/chat.svelte"
	>
		Source
	</a>
</p>

<Slate {editor} {plugins} bind:value>
	<HoveringToolbar container={ref} bind:open>
		<div class="toolbar">
			<MarkButton format="bold"><MdFormatBold /></MarkButton>
			<MarkButton format="italic"><MdFormatItalic /></MarkButton>
			<MarkButton format="underline"><MdFormatUnderlined /></MarkButton>
			<MarkButton format="code"><MdCode /></MarkButton>
			<BlockButton format="heading1"><MdLooksOne /></BlockButton>
			<BlockButton format="heading2"><MdLooksTwo /></BlockButton>
			<BlockButton format="block-quote"><MdFormatQuote /></BlockButton>
			<BlockButton format="numbered-list"><MdFormatListNumbered /></BlockButton>
			<BlockButton format="bulleted-list"><MdFormatListBulleted /></BlockButton>
			<ImageButton />
			<CheckListItemButton />
			<CodeButton />
			<MathButton />
		</div>
	</HoveringToolbar>
	<div class="editor" use:longpress on:longpress={onLongPress}>
		<Editable bind:ref placeholder="Enter some plain text..." {onKeyDown} />
	</div>
</Slate>

<style>
	.editor {
		padding: 0.25rem 0;
	}
	.toolbar {
		background-color: white;
		border: 1px solid black;
		padding: 0.25rem;
	}
</style>
