/// <reference types="@sveltejs/kit" />

declare module 'globals' {
	global {
		const PACKAGE_JSON: typeof import('../package.json');
	}
}
