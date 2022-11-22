import type { BaseEditor, Element } from 'slate';
import { Editor, Node, Path, type Operation, Transforms, Range } from 'slate';
import type { Key } from './Key';
import { EDITOR_TO_KEY_TO_ELEMENT, EDITOR_TO_ON_CHANGE, NODE_TO_KEY } from './weakMaps';
import { isDOMText, getPlainText, getSlateFragmentAttribute } from './dom';
import { findCurrentLineRange } from './lines';
import { findKey, toDOMNode, toDOMRange } from './utils';

export interface ISvelteEditor extends BaseEditor {
	insertData: (data: DataTransfer) => void;
	insertFragmentData: (data: DataTransfer) => boolean;
	insertTextData: (data: DataTransfer) => boolean;
	setFragmentData: (data: DataTransfer) => void;
	hasRange: (editor: ISvelteEditor, range: Range) => boolean;
	hasOwnContext: (element: Element) => boolean;
}

export function withSvelte<T extends Editor>(editor: T): T & ISvelteEditor {
	const e = editor as T & ISvelteEditor;
	const { apply, onChange, deleteBackward } = e;

	EDITOR_TO_KEY_TO_ELEMENT.set(e, new WeakMap());

	e.deleteBackward = (unit) => {
		if (unit !== 'line') {
			return deleteBackward(unit);
		}

		if (editor.selection && Range.isCollapsed(editor.selection)) {
			const parentBlockEntry = Editor.above(editor, {
				match: (n) => Editor.isBlock(editor, n),
				at: editor.selection
			});

			if (parentBlockEntry) {
				const [, parentBlockPath] = parentBlockEntry;
				const parentElementRange = Editor.range(editor, parentBlockPath, editor.selection.anchor);

				const currentLineRange = findCurrentLineRange(e, parentElementRange);

				if (!Range.isCollapsed(currentLineRange)) {
					Transforms.delete(editor, { at: currentLineRange });
				}
			}
		}
	};

	e.apply = (op: Operation) => {
		const matches: [Path, Key][] = [];

		switch (op.type) {
			case 'insert_text':
			case 'remove_text':
			case 'set_node': {
				for (const [node, path] of Editor.levels(e, { at: op.path })) {
					const key = findKey(node);
					matches.push([path, key]);
				}

				break;
			}

			case 'insert_node':
			case 'remove_node':
			case 'merge_node':
			case 'split_node': {
				for (const [node, path] of Editor.levels(e, {
					at: Path.parent(op.path)
				})) {
					const key = findKey(node);
					matches.push([path, key]);
				}

				break;
			}

			case 'move_node': {
				for (const [node, path] of Editor.levels(e, {
					at: Path.common(Path.parent(op.path), Path.parent(op.newPath))
				})) {
					const key = findKey(node);
					matches.push([path, key]);
				}
				break;
			}
		}

		apply(op);

		for (const [path, key] of matches) {
			const [node] = Editor.node(e, path);
			NODE_TO_KEY.set(node, key);
		}
	};

	e.setFragmentData = (data: Pick<DataTransfer, 'getData' | 'setData'>) => {
		const { selection } = e;

		if (!selection) {
			return;
		}

		const [start, end] = Range.edges(selection);
		const startVoid = Editor.void(e, { at: start.path });
		const endVoid = Editor.void(e, { at: end.path });

		if (Range.isCollapsed(selection) && !startVoid) {
			return;
		}

		const domRange = toDOMRange(e, selection);
		if (!domRange) {
			return;
		}
		let contents = domRange.cloneContents();
		let attach = contents.childNodes[0] as HTMLElement;

		contents.childNodes.forEach((node) => {
			if (node.textContent && node.textContent.trim() !== '') {
				attach = node as HTMLElement;
			}
		});

		if (endVoid) {
			const [voidNode] = endVoid;
			const r = domRange.cloneRange();
			const domNode = toDOMNode(e, voidNode);
			r.setEndAfter(domNode);
			contents = r.cloneContents();
		}

		if (startVoid) {
			attach = contents.querySelector('[data-slate-spacer]') as HTMLElement;
		}

		Array.from(contents.querySelectorAll('[data-slate-zero-width]')).forEach((zw) => {
			const isNewline = zw.getAttribute('data-slate-zero-width') === 'n';
			zw.textContent = isNewline ? '\n' : '';
		});

		if (isDOMText(attach)) {
			const span = document.createElement('span');
			span.style.whiteSpace = 'pre';
			span.appendChild(attach);
			contents.appendChild(span);
			attach = span;
		}

		const fragment = e.getFragment();
		const string = JSON.stringify(fragment);
		const encoded = window.btoa(encodeURIComponent(string));
		attach.setAttribute('data-slate-fragment', encoded);
		data.setData('application/x-slate-fragment', encoded);

		const div = document.createElement('div');
		div.appendChild(contents);
		div.setAttribute('hidden', 'true');
		document.body.appendChild(div);
		data.setData('text/html', div.innerHTML);
		data.setData('text/plain', getPlainText(div));
		document.body.removeChild(div);
		return data;
	};

	e.insertData = (data: DataTransfer) => {
		if (!e.insertFragmentData(data)) {
			e.insertTextData(data);
		}
	};

	e.insertFragmentData = (data: DataTransfer): boolean => {
		const fragment =
			data.getData('application/x-slate-fragment') || getSlateFragmentAttribute(data);

		if (fragment) {
			const decoded = decodeURIComponent(window.atob(fragment));
			const parsed = JSON.parse(decoded) as Node[];
			e.insertFragment(parsed);
			return true;
		}
		return false;
	};

	e.insertTextData = (data: DataTransfer): boolean => {
		const text = data.getData('text/plain');

		if (text) {
			const lines = text.split(/\r\n|\r|\n/);
			let split = false;

			for (const line of lines) {
				if (split) {
					Transforms.splitNodes(e, { always: true });
				}

				e.insertText(line);
				split = true;
			}
			return true;
		}
		return false;
	};

	e.onChange = () => {
		const onContextChange = EDITOR_TO_ON_CHANGE.get(e);

		if (onContextChange) {
			onContextChange();
		}

		onChange();
	};

	e.hasOwnContext = () => true;

	return e;
}
