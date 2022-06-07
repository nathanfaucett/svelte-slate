<svelte:options immutable />

<script lang="ts" context="module">
	import type { IBaseElement } from './Element.svelte';

	export const CODE_LINE_TYPE: string = 'code-line';

	export interface ICodeEditorElement extends IBaseElement {
		type: 'code-line';
		children: Array<ICodeEditorText>;
	}

	export function isCodeEditorElement(element: IBaseElement): element is ICodeEditorElement {
		return element.type === CODE_LINE_TYPE;
	}
</script>

<script lang="ts">
	import type { ICodeEditorText } from './CodeEditorLeaf.svelte';

	// svelte-ignore unused-export-let
	export let element: ICodeEditorElement;
	export let isInline: boolean;
	export let isVoid: boolean;
	export let contenteditable: boolean;
	export let ref: HTMLElement | undefined = undefined;
	export let dir: 'rtl' | 'ltr' | undefined = undefined;
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
