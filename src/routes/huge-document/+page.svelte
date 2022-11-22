<script lang="ts" context="module">
	import type { IText } from '$lib/plugins/Leaf.svelte';
	import type { IElement } from '$lib/plugins/Element.svelte';
	import { HEADING1_TYPE } from '$lib/plugins/Heading1Element.svelte';
	import { PARAGRAPH_TYPE } from '$lib/plugins/ParagraphElement.svelte';
	import { LoremIpsum } from 'lorem-ipsum';

	const lorem = new LoremIpsum({
		sentencesPerParagraph: {
			max: 8,
			min: 4
		},
		wordsPerSentence: {
			max: 16,
			min: 4
		}
	});

	function createValue(headings: number, paragraph: number) {
		const value: Array<IText | IElement> = [];

		for (let h = 0; h < headings; h++) {
			value.push({
				type: HEADING1_TYPE,
				children: [{ text: lorem.generateSentences(1) }]
			});

			for (let p = 0; p < paragraph; p++) {
				value.push({
					type: PARAGRAPH_TYPE,
					children: [{ text: lorem.generateParagraphs(1) }]
				});
			}
		}

		return value;
	}

	const HOTKEYS = {
		'mod+b': 'bold',
		'mod+i': 'italic',
		'mod+u': 'underline',
		'mod+`': 'code'
	};
</script>

<script lang="ts">
	import { isHotkey, withSvelte } from 'svelte-slate';
	import { createEditor } from 'slate';
	import { withHistory } from 'slate-history';
	import ImageButton from '../../example/ImageButton.svelte';
	import CodeButton from '../../example/CodeButton.svelte';
	import CheckListItemButton from '../../example/CheckListItemButton.svelte';
	import MarkButton from '../../example/MarkButton.svelte';
	import BlockButton from '../../example/BlockButton.svelte';
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
	import TableButton from '../../example/TableButton.svelte';
	import { DEFAULT_PLUGINS } from '$lib/plugins/DEFAULT_PLUGINS';
	import ImageElement, { IMAGE_TYPE, withImages } from '$lib/plugins/ImageElement.svelte';
	import CodeElement, { CODE_TYPE, withCode } from '$lib/plugins/CodeElement.svelte';
	import MathElement, { MATH_TYPE, withMath } from '$lib/plugins/MathElement.svelte';
	import Slate from '$lib/plugins/Slate.svelte';
	import HoveringToolbar from '$lib/plugins/HoveringToolbar.svelte';
	import Editable from '$lib/plugins/Editable.svelte';
	import { toggleMark } from '$lib/plugins/utils';

	const editor = withHistory(withSvelte(createEditor()));
	let plugins = {
		...DEFAULT_PLUGINS,
		[IMAGE_TYPE]: { component: ImageElement, withFn: withImages },
		[CODE_TYPE]: { component: CodeElement, withFn: withCode },
		[MATH_TYPE]: { component: MathElement, withFn: withMath }
	};
	let value = createValue(100, 7);
	let ref: HTMLDivElement;
	let readOnly = false;

	function onKeyDown(e: KeyboardEvent) {
		Object.entries(HOTKEYS).forEach(([hotkey, mark]) => {
			if (isHotkey(hotkey, e)) {
				e.preventDefault();
				e.stopPropagation();
				toggleMark(editor, mark);
			}
		});
	}
</script>

<p>
	<a
		target="_blank"
		href="https://github.com/nathanfaucett/svelte-slate/blob/main/src/routes/huge-document/+page.svelte"
	>
		Source
	</a>
</p>
<div>
	<label for="readOnly">Read Only?</label>
	<input name="readOnly" type="checkbox" bind:checked={readOnly} />
</div>

<Slate {editor} {plugins} bind:value>
	<HoveringToolbar container={ref}>
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
			<TableButton />
		</div>
	</HoveringToolbar>
	<Editable bind:ref placeholder="Enter some plain text..." {readOnly} {onKeyDown} />
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
