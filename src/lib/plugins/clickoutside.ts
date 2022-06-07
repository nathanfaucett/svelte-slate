export function clickoutside(node: HTMLElement) {
	function onClick(event: Event & { target: EventTarget | null }) {
		if (node && !node.contains(event.target as Node) && !event.defaultPrevented) {
			node.dispatchEvent(new CustomEvent('clickoutside', event));
		}
	}

	document.addEventListener('click', onClick, true);

	return {
		destroy() {
			document.removeEventListener('click', onClick, true);
		}
	};
}
