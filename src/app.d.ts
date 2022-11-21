/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#the-app-namespace
// for information about these interfaces
declare namespace App {
	// interface Locals {}
	// interface Platform {}
	// interface Session {}
	// interface Stuff {}
}

declare global {
	const PACKAGE_JSON: typeof import('../package.json');
}

declare namespace svelte.JSX {
	interface HTMLAttributes<T extends EventTarget> {
		onclickoutside?:
			| ((event: (MouseEvent | TouchEvent) & { currentTarget: EventTarget & T }) => boolean | void)
			| undefined
			| null;
		onlongpress?:
			| ((event: (MouseEvent | TouchEvent) & { currentTarget: EventTarget & T }) => boolean | void)
			| undefined
			| null;
	}
}

export {};
