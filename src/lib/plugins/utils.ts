import { Editor, Transforms, Element as SlateElement } from 'slate';
import type { IElement } from './Element.svelte';

export function isMarkActive(editor: Editor, format: string): boolean {
	if (!editor.selection) {
		return false;
	} else {
		const marks = Editor.marks(editor);
		return marks ? (marks as any)[format] === true : false;
	}
}

export function toggleMark(editor: Editor, format: string) {
	const isActive = isMarkActive(editor, format);

	if (isActive) {
		Editor.removeMark(editor, format);
	} else {
		Editor.addMark(editor, format, true);
	}
}

export function isBlockActive(editor: Editor, format: string): boolean {
	if (!editor.selection) {
		return false;
	} else {
		const [match] = Array.from(
			Editor.nodes(editor, {
				at: Editor.unhangRange(editor, editor.selection),
				match: (n) =>
					!Editor.isEditor(n) && SlateElement.isElement(n) && (n as IElement)['type'] === format
			})
		);

		return !!match;
	}
}

const LIST_TYPES = ['numbered-list', 'bulleted-list'];

export function toggleBlock(editor: Editor, format: string) {
	const isActive = isBlockActive(editor, format);
	const isList = LIST_TYPES.includes(format);

	Transforms.unwrapNodes(editor, {
		match: (n) =>
			!Editor.isEditor(n) &&
			SlateElement.isElement(n) &&
			LIST_TYPES.includes((n as IElement)['type']),
		split: true
	});
	const newProperties = {
		type: isActive ? 'paragraph' : isList ? 'list-item' : format
	};
	Transforms.setNodes<SlateElement>(editor, newProperties as any);

	if (!isActive && isList) {
		const block = { type: format, children: [] };
		Transforms.wrapNodes(editor, block);
	}
}

export function setSelection(node: Node) {
	const selection = window.getSelection();
	if (!selection) {
		return;
	}
	selection.removeAllRanges();
	const range = document.createRange();
	range.selectNodeContents(node);
	selection.addRange(range);
}
