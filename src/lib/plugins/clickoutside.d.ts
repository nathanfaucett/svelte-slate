declare namespace svelte.JSX {
	interface HTMLAttributes<T extends EventTarget> {
		onclickoutside?:
			| ((event: MouseEvent & { currentTarget: EventTarget & T }) => any)
			| undefined
			| null;
	}
}
