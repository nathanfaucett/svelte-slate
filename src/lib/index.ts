export {
	default as Slate,
	getEditor,
	getEditorContext,
	getReadOnlyContext,
	getFocusedContext,
	getDecorateContext,
	getSelectionContext,
	defaultDecorate,
	EDITOR_CONTEXT_KEY,
	READ_ONLY_CONTEXT_KEY,
	FOCUSED_CONTEXT_KEY,
	DECORATE_CONTEXT_KEY,
	SELECTION_CONTEXT_KEY
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
	isReadOnly,
	createContext,
	createContextKey,
	getFromContext,
	type ISvelteComponent
} from './utils';
export { default as TextStringfrom } from './components/TextString.svelte';
export { default as ZeroWidthString } from './components/ZeroWidthString.svelte';
export { default as hotkeys } from './hotkeys';
export { isHotkey, isKeyHotkey, createIsHotkey, createIsKeyHotkey } from './isHotkey';
export { findCurrentLineRange } from './lines';
export type { ISvelteEditor } from './withSvelte';
export { withSvelte } from './withSvelte';
