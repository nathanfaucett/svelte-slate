<script lang="ts">
	import { Slate, Editable, withSvelte } from '@aicacia/svelte-slate';
	import type { Descendant } from 'slate';
	import { createEditor } from 'slate';
	import { withHistory } from 'slate-history';
	import type { IElement } from '../example/Element.svelte';
	import type { IText } from '../example/Leaf.svelte';
	import Element from '../example/Element.svelte';
	import Leaf from '../example/Leaf.svelte';

	const editor = withHistory(withSvelte(createEditor()));
	let value: Array<IText | IElement> = [
		{
			type: 'paragraph',
			children: [
				{
					text: ''
				}
			]
		}
	];
</script>

<Slate {editor} bind:value>
	<Editable {Element} {Leaf} placeholder="Enter some plain text..." />
</Slate>
