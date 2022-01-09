export {
	default as Slate,
	getEditorContext,
	getReadOnlyContext,
	getFocusedContext,
	getDecorateContext,
	getSelectionContext
} from './components/Slate.svelte';
export { default as Editable } from './components/Editable.svelte';
export {
	findPath,
	findKey,
	findDocumentOrShadowRoot,
	findEventRange,
	getWindow,
	toDOMNode,
	toDOMPoint,
	toDOMRange,
	hasDOMNode,
	hasDOMPoint,
	hasDOMRange,
	hasRange,
	deselect,
	focus,
	blur,
	isFocused,
	isReadOnly
} from './utils';
export { default as hotkeys } from './hotkeys';
export { findCurrentLineRange } from './lines';
export type { SvelteEditor } from './withSvelte';
export { withSvelte } from './withSvelte';
