export {
	default as Slate,
	getEditorContext,
	getContainerContext,
	getDecorateContext,
	getEditor,
	getEventsContext,
	getFocusedContext,
	getReadOnlyContext,
	getSelectionContext,
	getValueContext,
	defaultDecorate,
	handleEvent,
	addEventListener
} from './components/Slate.svelte';
export {
	default as Editable,
	getElementContext,
	getLeafContext,
	getPlaceholderContext,
	hasEditableTarget,
	hasTarget,
	isTargetInsideNonReadonlyVoid,
	defaultScrollSelectionIntoView
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
export { withSvelte, type ISvelteEditor } from './withSvelte';
