<script lang="ts">
	import { currentTaskGroupStore, userStore } from '$lib/stores';
	import { Icon } from 'sveltestrap';

	async function handleDeleteTaskGroup() {
		if (confirm('Are you sure you want to delete this task group?')) {
			await userStore.deleteTaskGroup($currentTaskGroupStore);
		}

		$currentTaskGroupStore = $userStore.taskGroups[0];
	}
</script>

{#if $currentTaskGroupStore}
	<div class="d-flex align-items-center gap-3 mb-2">
		<h1 class="text-break m-0 display-6">{$currentTaskGroupStore.name}</h1>
		<div class="d-flex gap-1">
			<span>
				<Icon name="pencil" class="fs-4 cursor-pointer" />
			</span>
			<span on:click={handleDeleteTaskGroup}>
				<Icon name="trash" class="fs-4 cursor-pointer" />
			</span>
		</div>
	</div>
{/if}
