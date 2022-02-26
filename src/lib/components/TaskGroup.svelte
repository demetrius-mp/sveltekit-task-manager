<script lang="ts">
	import { currentTaskGroupStore } from '$lib/stores';
	import type { ITaskGroup } from '$lib/types';
	import { NavItem, NavLink } from 'sveltestrap';

	export let taskGroup: ITaskGroup;

	function setCurrentTaskGroup(taskGroup: ITaskGroup) {
		$currentTaskGroupStore = taskGroup;
	}
</script>

<div class="hover-gray">
	<NavItem>
		<NavLink
			on:click={() => setCurrentTaskGroup(taskGroup)}
			active={taskGroup.id === $currentTaskGroupStore?.id}
			class="text-break"
		>
			{taskGroup.name}
		</NavLink>
	</NavItem>
</div>

<style>
	.hover-gray:hover {
		background-color: lightgrey;
		border-radius: 0.25rem;
	}
</style>
