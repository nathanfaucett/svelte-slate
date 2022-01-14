const IS_MAC =
	typeof window != 'undefined' && /Mac|iPod|iPhone|iPad/.test(window.navigator.platform);

const MODIFIERS = {
	alt: 'altKey',
	control: 'ctrlKey',
	meta: 'metaKey',
	shift: 'shiftKey'
};

const ALIASES = {
	add: '+',
	break: 'pause',
	cmd: 'meta',
	command: 'meta',
	ctl: 'control',
	ctrl: 'control',
	del: 'delete',
	down: 'arrowdown',
	esc: 'escape',
	ins: 'insert',
	left: 'arrowleft',
	mod: IS_MAC ? 'meta' : 'control',
	opt: 'alt',
	option: 'alt',
	return: 'enter',
	right: 'arrowright',
	space: ' ',
	spacebar: ' ',
	up: 'arrowup',
	win: 'meta',
	windows: 'meta'
};

const CODES = {
	backspace: 8,
	tab: 9,
	enter: 13,
	shift: 16,
	control: 17,
	alt: 18,
	pause: 19,
	capslock: 20,
	escape: 27,
	' ': 32,
	pageup: 33,
	pagedown: 34,
	end: 35,
	home: 36,
	arrowleft: 37,
	arrowup: 38,
	arrowright: 39,
	arrowdown: 40,
	insert: 45,
	delete: 46,
	meta: 91,
	numlock: 144,
	scrolllock: 145,
	';': 186,
	'=': 187,
	',': 188,
	'-': 189,
	'.': 190,
	'/': 191,
	'`': 192,
	'[': 219,
	'\\': 220,
	']': 221,
	"'": 222
};

for (let f = 1; f < 20; f++) {
	CODES['f' + f] = 111 + f;
}

export interface IIsHotKeyOptions {
	byKey?: boolean;
}

export type IIsHotKeyFn = (event: KeyboardEvent) => boolean;

export function createIsHotkey(
	hotkey: string | string[],
	options: IIsHotKeyOptions = {}
): IIsHotKeyFn {
	if (!Array.isArray(hotkey)) {
		hotkey = [hotkey];
	}
	const array = hotkey.map((string) => parseHotkey(string, options));
	return function isHotKey(e) {
		return array.some((object) => compareHotkey(object, e));
	};
}

export function isHotkey(
	hotkey: string | string[],
	event: KeyboardEvent,
	options: IIsHotKeyOptions = {}
): boolean {
	return createIsHotkey(hotkey, options)(event);
}

export function createIsKeyHotkey(hotkey: string | string[]): IIsHotKeyFn {
	return createIsHotkey(hotkey, { byKey: true });
}

export function isKeyHotkey(hotkey: string | string[], event: KeyboardEvent): boolean {
	return createIsKeyHotkey(hotkey)(event);
}

export interface IHotKey {
	altKey?: boolean;
	ctrlKey?: boolean;
	metaKey?: boolean;
	shiftKey?: boolean;
	key?: string;
	which?: number;
}
``;
function parseHotkey(hotkey: string, options: IIsHotKeyOptions = {}): IHotKey {
	const byKey = options && options.byKey;
	const ret: IHotKey = {};

	hotkey = hotkey.replace('++', '+add');
	const values = hotkey.split('+');
	const { length } = values;

	for (const k in MODIFIERS) {
		ret[MODIFIERS[k]] = false;
	}

	for (let value of values) {
		const optional = value.endsWith('?') && value.length > 1;

		if (optional) {
			value = value.slice(0, -1);
		}

		const name = toKeyName(value);
		const modifier = MODIFIERS[name];

		if (value.length > 1 && !modifier && !ALIASES[value] && !CODES[name]) {
			throw new TypeError(`Unknown modifier: "${value}"`);
		}

		if (length === 1 || !modifier) {
			if (byKey) {
				ret.key = name;
			} else {
				ret.which = toKeyCode(value);
			}
		}

		if (modifier) {
			ret[modifier] = optional ? null : true;
		}
	}

	return ret;
}

function compareHotkey(object: IHotKey, event: KeyboardEvent): boolean {
	for (const key in object) {
		const expected = object[key];
		let actual;

		if (expected == null) {
			continue;
		}

		if (key === 'key' && event.key != null) {
			actual = event.key.toLowerCase();
		} else if (key === 'which') {
			actual = expected === 91 && event.which === 93 ? 91 : event.which;
		} else {
			actual = event[key];
		}

		if (actual == null && expected === false) {
			continue;
		}

		if (actual !== expected) {
			return false;
		}
	}

	return true;
}

function toKeyCode(name: string): number | undefined {
	name = toKeyName(name);
	const code = CODES[name] || name.toUpperCase().charCodeAt(0);
	return code;
}

function toKeyName(name: string): string | undefined {
	name = name.toLowerCase();
	name = ALIASES[name] || name;
	return name;
}
