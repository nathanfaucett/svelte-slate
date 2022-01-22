<svelte:options immutable={true} />

<script lang="ts" context="module">
	import type { IText } from './Leaf.svelte';

	export interface IBaseElement {
		type: string;
		children: (IElement | IText)[];
	}

	export type IElement = IBaseElement;
</script>

<script lang="ts">
	export let element: IElement;
	export let dir: 'rtl' | 'ltr';
	export let ref: HTMLElement = undefined;
	export let contenteditable: boolean = undefined;
</script>

{#if element.type === 'block-quote'}<blockquote
		bind:this={ref}
		data-slate-node="element"
		data-slate-inline={$$props['data-slate-inline']}
		{dir}
		{contenteditable}
	>
		<slot />
	</blockquote>{:else if element.type === 'bulleted-list'}<ul
		bind:this={ref}
		data-slate-node="element"
		data-slate-inline={$$props['data-slate-inline']}
		{dir}
		{contenteditable}
	>
		<slot />
	</ul>{:else if element.type === 'heading-one'}<h1
		bind:this={ref}
		data-slate-node="element"
		data-slate-inline={$$props['data-slate-inline']}
		{dir}
		{contenteditable}
	>
		<slot />
	</h1>{:else if element.type === 'heading-two'}<h2
		bind:this={ref}
		data-slate-node="element"
		data-slate-inline={$$props['data-slate-inline']}
		{dir}
		{contenteditable}
	>
		<slot />
	</h2>{:else if element.type === 'list-item'}<li
		bind:this={ref}
		data-slate-node="element"
		data-slate-inline={$$props['data-slate-inline']}
		{dir}
		{contenteditable}
	>
		<slot />
	</li>{:else if element.type === 'numbered-list'}<ol
		bind:this={ref}
		data-slate-node="element"
		data-slate-inline={$$props['data-slate-inline']}
		{dir}
		{contenteditable}
	>
		<slot />
	</ol>{:else}<p
		bind:this={ref}
		data-slate-node="element"
		data-slate-inline={$$props['data-slate-inline']}
		{dir}
		{contenteditable}
	>
		<slot />
	</p>{/if}

<style>
	blockquote,
	ul,
	h1,
	h2,
	li,
	ol,
	p {
		position: relative;
		margin: 0;
	}

	blockquote {
		border-left: 2px solid #ddd;
		margin-left: 0;
		margin-right: 0;
		padding-left: 10px;
		color: #aaa;
		font-style: italic;
	}
</style>
