<script lang="ts">
	import { TaskForm } from '$lib/components/forms';
	import { currentTaskGroupStore } from '$lib/stores';
	import type { ITask } from '$lib/types';
	import { Card, CardBody, Icon, Modal, ModalBody, ModalHeader } from 'sveltestrap';

	export let task: ITask;

	async function handleDeleteTask() {
		if (confirm('Are you sure you want to delete this task?')) {
			await currentTaskGroupStore.deleteTask(task);
		}
	}

	async function handleCheckTask() {
		task.complete = !task.complete;
		await currentTaskGroupStore.updateTask(task);
	}

	let editTaskModalIsOpen: boolean = false;
	function toggleEditTaskModal() {
		editTaskModalIsOpen = !editTaskModalIsOpen;
	}
</script>

<Card style="border-radius: 0.75rem;" class="shadow">
	<CardBody class="d-flex align-items-center justify-content-between gap-2">
		<div class="d-flex align-items-center gap-2">
			<span on:click={handleCheckTask}>
				{#if task.complete}
					<Icon name="check-circle" class="fs-5 cursor-pointer" />
				{:else}
					<Icon name="circle" class="fs-5 cursor-pointer" />
				{/if}
			</span>
			<h3 class:text-decoration-line-through={task.complete} class="m-0 text-break">
				{task.name}
			</h3>
		</div>
		<div class="d-flex align-items-center  gap-2">
			<span on:click={toggleEditTaskModal}>
				<Icon name="pencil" class="fs-5 cursor-pointer" />
			</span>
			<span on:click={handleDeleteTask}>
				<Icon name="trash" class="fs-5 cursor-pointer" />
			</span>
		</div>
	</CardBody>
</Card>

<Modal isOpen={editTaskModalIsOpen} toggle={toggleEditTaskModal}>
	<ModalHeader toggle={toggleEditTaskModal}>Edit task</ModalHeader>
	<ModalBody>
		<TaskForm on:success={toggleEditTaskModal} {task} />
	</ModalBody>
</Modal>
