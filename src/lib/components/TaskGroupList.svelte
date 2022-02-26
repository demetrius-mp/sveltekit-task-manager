<script>
	import { userStore } from '$lib/stores';
	import { flip } from 'svelte/animate';
	import { quintOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';
	import TaskGroup from './TaskGroup.svelte';

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

{#each $userStore.taskGroups as taskGroup (taskGroup.id)}
	<div animate:flip in:receive={{ key: taskGroup.id }} out:send={{ key: taskGroup.id }}>
		<TaskGroup {taskGroup} />
	</div>
{/each}
