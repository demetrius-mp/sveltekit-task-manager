<script lang="ts">
	import { resize } from '$lib/utils/action.utils';
	import { createEventDispatcher } from 'svelte';

	export let value: string;
	export let preventNewLine: boolean = false;

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
</script>

<textarea
	bind:value
	placeholder="Search or create"
	class="form-control"
	rows="1"
	use:resize
	on:keypress={handleKeyPress}
/>
