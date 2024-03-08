<svelte:options immutable />

<script lang="ts" context="module">
	import type { Text, Element } from 'slate';
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
		const value: Array<Text | Element> = [];

		for (let h = 0; h < headings; h++) {
			value.push(
				{
					children: [{ text: lorem.generateSentences(1) }]
				},
				{ children: [{ text: '' }] }
			);

			for (let p = 0; p < paragraph; p++) {
				value.push(
					{
						children: [{ text: lorem.generateParagraphs(1) }]
					},
					{ children: [{ text: '' }] }
				);
			}
		}

		return value;
	}
</script>

<script lang="ts">
	import { withSvelte } from '$lib';
	import { createEditor } from 'slate';
	import { withHistory } from 'slate-history';
	import Slate from '$lib/components/Slate.svelte';
	import Editable from '$lib/components/Editable.svelte';

	const editor = withHistory(withSvelte(createEditor()));
	let value = createValue(100, 7);
	let ref: HTMLDivElement;
	let readOnly = false;
</script>

<p>
	<a
		target="_blank"
		rel="noreferrer"
		href="https://github.com/nathanfaucett/svelte-slate/blob/main/src/routes/huge-document/+page.svelte"
	>
		Source
	</a>
</p>
<div>
	<label for="readOnly">Read Only?</label>
	<input name="readOnly" type="checkbox" bind:checked={readOnly} />
</div>

<Slate {editor} bind:value>
	<Editable bind:ref placeholder="Enter some plain text..." {readOnly} />
</Slate>
