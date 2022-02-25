export function elementIsOverflowing(node: HTMLElement) {
	const curOverflow = node.style.overflow;

	if (!curOverflow || curOverflow === 'visible') node.style.overflow = 'hidden';

	const isOverflowing =
		node.clientWidth < node.scrollWidth || node.clientHeight < node.scrollHeight;
	node.style.overflow = curOverflow;

	return isOverflowing;
}

export function resize(node: HTMLElement) {
	node.style.height = 'auto';
	node.style.height = 4 + node.scrollHeight + 'px';
}
