# svelte slate

[![license](https://img.shields.io/badge/license-MIT%2FApache--2.0-blue")](LICENSE-MIT)
[![docs](https://img.shields.io/badge/docs-typescript-blue.svg)](https://aicacia.github.io/svelte-slate/)
[![npm (scoped)](https://img.shields.io/npm/v/svelte-slate)](https://www.npmjs.com/package/svelte-slate)
[![build](https://github.com/aicacia/svelte-slate/workflows/Web/badge.svg)](https://github.com/aicacia/svelte-slate/actions/workflows/web.yml)

## Tools

- [slate](https://github.com/ianstormtaylor/slate)
- [svelte kit](https://kit.svelte.dev/docs)

tries to mimic the react api from [slate-react](https://github.com/ianstormtaylor/slate/tree/main/packages/slate-react) as much as possible

```svelte
<script lang="ts">
	import { Slate, Editable, withSvelte } from 'svelte-slate';
	import { createEditor } from 'slate';

	const editor = withSvelte(createEditor());
	let value = [
		{
			type: 'paragraph',
			children: [{ text: 'This is editable ' }]
		}
	];
</script>

<Slate {editor} bind:value>
	<Editable placeholder="Enter some plain text..." />
</Slate>
```
