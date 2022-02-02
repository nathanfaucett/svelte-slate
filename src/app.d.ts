/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs#typescript
// for information about these interfaces
declare namespace App {
	interface Locals {}

	interface Platform {}

	interface Session {}

	interface Stuff {}
}

declare module 'globals' {
	global {
		const PACKAGE_JSON: typeof import('../package.json');
	}
}
