<script lang="ts">
	import { currentTaskGroupStore, taskGroupSearchString } from '$lib/stores';
	import type { ITaskGroup } from '$lib/types';
	import { Icon, NavItem, NavLink } from 'sveltestrap';

	export let taskGroup: ITaskGroup;

	function setCurrentTaskGroup(taskGroup: ITaskGroup) {
		$currentTaskGroupStore = taskGroup;
	}

	function isSearchResult(searchString: string) {
		return searchString && taskGroup.name.includes(searchString);
	}
</script>

<div class="hover-gray">
	<NavItem>
		<NavLink
			on:click={() => setCurrentTaskGroup(taskGroup)}
			active={taskGroup.id === $currentTaskGroupStore?.id}
			class="text-break"
		>
			{#if isSearchResult($taskGroupSearchString)}
				<Icon name="circle-fill" class="text-warning" />
			{/if}
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
