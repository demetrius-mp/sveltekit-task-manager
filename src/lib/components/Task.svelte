<script lang="ts">
	import { currentTaskGroupStore } from '$lib/stores';
	import type { ITask } from '$lib/types';
	import { Card, CardBody, Icon } from 'sveltestrap';

	export let task: ITask;

	function handleDeleteTask() {
		if (confirm('Are you sure you want to delete this task?')) {
			currentTaskGroupStore.deleteTask(task);
		}
	}

	function handleCheckTask() {
		task.complete = !task.complete;
		currentTaskGroupStore.updateTask(task);
	}
</script>

<Card style="border-radius: 0.75rem;" class="shadow">
	<CardBody>
		<div class="d-flex align-items-center gap-2 justify-content-between">
			<div class="min-w-0 d-flex align-items-center gap-2">
				<span on:click={handleCheckTask}>
					{#if task.complete}
						<Icon name="check-circle" class="fs-5 cursor-pointer" />
					{:else}
						<Icon name="circle" class="fs-5 cursor-pointer" />
					{/if}
				</span>
				<div class="min-w-0">
					<h3 class="m-0">{task.name}</h3>
				</div>
			</div>
			<div class="d-flex gap-2 align-items-center">
				<span>
					<Icon name="pencil" class="fs-5 cursor-pointer" />
				</span>
				<span on:click={handleDeleteTask}>
					<Icon name="trash" class="fs-5 cursor-pointer" />
				</span>
			</div>
		</div>
	</CardBody>
</Card>

<style>
	.min-w-0 {
		min-width: 0;
	}
</style>
