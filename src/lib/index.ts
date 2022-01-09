export { default as Slate } from '$lib/components/Slate.svelte';
export { default as Editable } from '$lib/components/Editable.svelte';
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
export { withSvelte } from './withSvelte';
