<script lang="ts">
	import { resize } from '$lib/utils/action.utils';
	import { createEventDispatcher, onMount } from 'svelte';

	export let value: string;
	export let preventNewLine: boolean = false;
	export let placeholder: string;

	interface EventDispatcher {
		newline: void;
	}

	const dispatch = createEventDispatcher<EventDispatcher>();

	function handleKeyPress(event: KeyboardEvent) {
		if (preventNewLine && event.key === 'Enter') {
			event.preventDefault();

			dispatch('newline');
		}
	}

	let element: HTMLTextAreaElement;

	$: {
		if (element && !value) {
			element.style.height = '40px';
		}
	}

	onMount(() => {
		resize(element);
	});
</script>

<textarea
	bind:value
	bind:this={element}
	{placeholder}
	class="form-control"
	rows="1"
	use:resize
	on:keypress={handleKeyPress}
/>
