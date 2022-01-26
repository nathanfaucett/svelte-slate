import type { BaseRange } from 'slate';
import { Editor, Transforms, Element as SlateElement } from 'slate';

export function isMarkActive(editor: Editor, selection: BaseRange | null, format: string): boolean {
	if (!selection) {
		return false;
	}
	const marks = Editor.marks(editor);
	return marks ? marks[format] === true : false;
}

export function toggleMark(editor: Editor, selection: BaseRange | null, format: string) {
	const isActive = isMarkActive(editor, selection, format);

	if (isActive) {
		Editor.removeMark(editor, format);
	} else {
		Editor.addMark(editor, format, true);
	}
}

export function isBlockActive(
	editor: Editor,
	selection: BaseRange | null,
	format: string
): boolean {
	if (!selection) {
		return false;
	}

	const [match] = Array.from(
		Editor.nodes(editor, {
			at: Editor.unhangRange(editor, editor.selection),
			match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && n['type'] === format
		})
	);

	return !!match;
}

const LIST_TYPES = ['numbered-list', 'bulleted-list'];

export function toggleBlock(editor: Editor, selection: BaseRange | null, format: string) {
	const isActive = isBlockActive(editor, selection, format);
	const isList = LIST_TYPES.includes(format);

	Transforms.unwrapNodes(editor, {
		match: (n) =>
			!Editor.isEditor(n) && SlateElement.isElement(n) && LIST_TYPES.includes(n['type']),
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
