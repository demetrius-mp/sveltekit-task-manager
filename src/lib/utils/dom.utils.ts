export function elementIsOverflowing(node: HTMLElement) {
	const curOverflow = node.style.overflow;

	if (!curOverflow || curOverflow === 'visible') node.style.overflow = 'hidden';

	const isOverflowing =
		node.clientWidth < node.scrollWidth || node.clientHeight < node.scrollHeight;
	node.style.overflow = curOverflow;

	return isOverflowing;
}

export function resizeTextArea(node: HTMLTextAreaElement) {
	node.style.height = 'auto';
	node.style.height = node.scrollHeight + 'px';
}

export function disableNewLine(event: KeyboardEvent) {
	const isEnterKey = event.key === 'Enter';
	if (isEnterKey) {
		event.preventDefault();
	}

	return isEnterKey;
}

export function resetTextAreaHeight(node: HTMLTextAreaElement) {
	node.style.height = '40px';
}
