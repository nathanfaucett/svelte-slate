declare namespace svelte.JSX {
	interface HTMLAttributes<T extends EventTarget> {
		onlongpress?:
			| ((event: (MouseEvent | TouchEvent) & { currentTarget: EventTarget & T }) => any)
			| undefined
			| null;
	}
}
