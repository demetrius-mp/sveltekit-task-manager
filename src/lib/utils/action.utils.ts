// currently svelte does not detect events dispatched by an action
// so i decided not to use the action and create a component that
// implements the same thing
export function disableNewLineAction(node: HTMLTextAreaElement): SvelteActionReturnType {
	function handleKeyPress(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			event.preventDefault();
			/* 
			if using `on:newline` on the component that uses this action
			svelte says that `Property 'onnewline' does not exist on type ...`
			*/
			node.dispatchEvent(new CustomEvent('newline'));
		}
	}

	node.addEventListener('keypress', handleKeyPress);

	return {
		destroy: () => {
			node.removeEventListener('keypress', handleKeyPress);
		}
	};
}

export function resize(node: HTMLTextAreaElement): SvelteActionReturnType {
	function handleInput() {
		node.style.height = 'auto';
		node.style.height = node.scrollHeight + 'px';
	}

	node.setAttribute('style', 'height:' + node.scrollHeight + 'px;overflow-y:hidden;');
	node.addEventListener('input', handleInput);
	handleInput();

	return {
		destroy: () => {
			node.removeEventListener('input', handleInput);
		}
	};
}
