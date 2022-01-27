export type { ISvelteComponent } from './components/Slate.svelte';
export {
	default as Slate,
	getEditor,
	getEditorContext,
	getReadOnlyContext,
	getFocusedContext,
	getDecorateContext,
	getSelectionContext,
	defaultDecorate,
	DECORATE_CONTEXT_KEY
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
export { default as TextStringfrom } from './components/TextString.svelte';
export { default as ZeroWidthString } from './components/ZeroWidthString.svelte';
export { getSelectedContext } from './components/ChildElement.svelte';
export { default as hotkeys } from './hotkeys';
export { isHotkey, isKeyHotkey, createIsHotkey, createIsKeyHotkey } from './isHotkey';
export { findCurrentLineRange } from './lines';
export type { ISvelteEditor } from './withSvelte';
export { withSvelte } from './withSvelte';
