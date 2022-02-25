<script>
	import { currentTaskGroupStore } from '$lib/stores';
	import { flip } from 'svelte/animate';
	import { quintOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';
	import Task from './Task.svelte';

	//#region animation
	const [send, receive] = crossfade({
		duration: (d) => Math.sqrt(d * 200),

		fallback(node, params) {
			const style = getComputedStyle(node);
			const transform = style.transform === 'none' ? '' : style.transform;

			return {
				duration: 600,
				easing: quintOut,
				css: (t) => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`
			};
		}
	});
	//#endregion animation
</script>

<div class="d-flex flex-column gap-3">
	{#each $currentTaskGroupStore.tasks as task (task.id)}
		<div animate:flip in:receive={{ key: task.id }} out:send={{ key: task.id }}>
			<Task {task} />
		</div>
	{/each}
</div>
