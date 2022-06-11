export { getSelectedContext } from './components/ChildElement.svelte';
export {
	default as Slate,
	getEditor,
	getEditorContext,
	getReadOnlyContext,
	getFocusedContext,
	getDecorateContext,
	getSelectionContext,
	getContainerContext,
	defaultDecorate,
	DECORATE_CONTEXT_KEY,
	addEventListener
} from './components/Slate.svelte';
export {
	default as Editable,
	ELEMENT_CONTEXT_KEY,
	LEAF_CONTEXT_KEY,
	PLACEHOLDER_CONTEXT_KEY,
	getElementContext,
	getLeafContext,
	getPlaceholderContext,
	hasTarget,
	hasEditableTarget,
	isTargetInsideNonReadonlyVoid
} from './components/Editable.svelte';
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
