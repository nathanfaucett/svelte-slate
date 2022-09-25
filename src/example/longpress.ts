export function longpress(node: HTMLElement, threshold = 500) {
	let timeoutId: ReturnType<typeof setTimeout> | null = null;

	function onDown() {
		timeoutId = setTimeout(() => {
			node.dispatchEvent(new CustomEvent('longpress'));
		}, threshold);
	}

	function onUp() {
		if (timeoutId !== null) {
			clearTimeout(timeoutId);
			timeoutId = null;
		}
	}

	node.addEventListener('mousedown', onDown);
	node.addEventListener('touchstart', onDown);
	node.addEventListener('mouseup', onUp);
	node.addEventListener('touchend', onUp);

	return {
		update(newThreshold: number) {
			onUp();
			threshold = newThreshold;
		},
		destroy() {
			onUp();
			node.removeEventListener('mousedown', onDown);
			node.removeEventListener('touchstart', onDown);
			node.removeEventListener('mouseup', onUp);
			node.removeEventListener('touchend', onUp);
		}
	};
}
