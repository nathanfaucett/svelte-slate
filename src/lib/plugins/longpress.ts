export function longpress(node: HTMLElement, threshold = 500) {
	const document = node.ownerDocument;

	function onStart(event: MouseEvent | TouchEvent) {
		if (event.type === 'mousedown' && (event as MouseEvent).button !== 0) {
			return;
		}

		const timeout = setTimeout(() => {
			node.dispatchEvent(new CustomEvent('longpress', event));
		}, threshold);

		function cancel() {
			clearTimeout(timeout);
			document.removeEventListener('mousemove', cancel);
			document.removeEventListener('mouseup', cancel);
			document.addEventListener('touchmove', cancel);
			document.addEventListener('touchend', cancel);
		}

		document.addEventListener('mousemove', cancel);
		document.addEventListener('mouseup', cancel);
		document.addEventListener('touchmove', cancel);
		document.addEventListener('touchend', cancel);
	}

	node.addEventListener('mousedown', onStart);
	node.addEventListener('touchstart', onStart);

	return {
		destroy() {
			node.removeEventListener('mousedown', onStart);
			node.removeEventListener('touchstart', onStart);
		}
	};
}
