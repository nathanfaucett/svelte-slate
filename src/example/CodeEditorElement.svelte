<svelte:options immutable />

<script lang="ts" context="module">
	import type { IBaseElement } from './Element.svelte';

	export interface ICodeEditorElement extends IBaseElement {
		type: 'code-line';
		children: Array<ICodeEditorText>;
	}
</script>

<script lang="ts">
	import type { ICodeEditorText } from './CodeEditorLeaf.svelte';

	// svelte-ignore unused-export-let
	export let element: ICodeEditorElement;
	export let isInline: boolean;
	export let isVoid: boolean;
	export let contenteditable: boolean;
	export let ref: HTMLElement = undefined;
	export let dir: 'rtl' | 'ltr' = undefined;
</script>

<li
	bind:this={ref}
	data-slate-node="element"
	data-slate-inline={isInline}
	data-slate-void={isVoid}
	{dir}
	{contenteditable}
>
	<slot />
</li>
