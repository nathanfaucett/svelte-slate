# svelte slate

[![examples](https://img.shields.io/badge/examples-blue.svg)](https://nathanfaucett.github.io/svelte-slate/)
[![license](https://img.shields.io/badge/license-MIT%2FApache--2.0-blue")](LICENSE-MIT)
[![npm (scoped)](https://img.shields.io/npm/v/svelte-slate)](https://www.npmjs.com/package/svelte-slate)
[![build](https://github.com/nathanfaucett/svelte-slate/actions/workflows/deploy.yml/badge.svg)](https://github.com/nathanfaucett/svelte-slate/actions/workflows/deploy.yml)

## Tools

- [slate](https://github.com/ianstormtaylor/slate)
- [svelte kit](https://kit.svelte.dev/docs)
- [svelte icons](https://svelte-icons.vercel.app/)

tries to mimic the react api from [slate-react](https://github.com/ianstormtaylor/slate/tree/main/packages/slate-react) as much as possible

```svelte
<script lang="ts">
	import { Slate, Editable, withSvelte } from 'svelte-slate';
	import { createEditor } from 'slate';

	const editor = withSvelte(createEditor());
	let value = [
		{
			children: [{ text: 'This is editable ' }]
		}
	];
</script>

<Slate {editor} bind:value>
	<Editable placeholder="Enter some plain text..." />
</Slate>
```

## Vite Problems

using the plugin imports can result in mutiple instances of svelte witch can cause context errors, exclude svelte-slate from deps [here](https://vitejs.dev/config/dep-optimization-options.html#optimizedeps-exclude)

```typescript
export default defineConfig({
	optimizeDeps: {
		exclude: ['svelte-slate']
	}
});
```

## Custom Rendering

Default components for elements, leafs, and placeholders are provided but can easily be overridden and then can be used in the editable component like `<Editable {Element} {Leaf} />`
