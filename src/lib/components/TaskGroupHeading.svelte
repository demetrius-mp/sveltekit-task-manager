<script lang="ts">
	import { TaskGroupForm } from '$lib/components/forms';
	import { currentTaskGroupStore, userStore } from '$lib/stores';
	import { Icon, Modal, ModalBody, ModalHeader } from 'sveltestrap';

	async function handleDeleteTaskGroup() {
		if (confirm('Are you sure you want to delete this task group?')) {
			await userStore.deleteTaskGroup($currentTaskGroupStore);
		}

		$currentTaskGroupStore = $userStore.taskGroups[0];
	}

	let editTaskGroupModalIsOpen: boolean = false;
	function toggleEditTaskGroupModal() {
		editTaskGroupModalIsOpen = !editTaskGroupModalIsOpen;
	}
</script>

{#if $currentTaskGroupStore}
	<div class="d-flex align-items-center gap-3 mb-2">
		<h1 class="text-break m-0 display-6">{$currentTaskGroupStore.name}</h1>
		<div class="d-flex gap-1">
			<span on:click={toggleEditTaskGroupModal}>
				<Icon name="pencil" class="fs-4 cursor-pointer" />
			</span>
			<span on:click={handleDeleteTaskGroup}>
				<Icon name="trash" class="fs-4 cursor-pointer" />
			</span>
		</div>
	</div>
{/if}

<Modal isOpen={editTaskGroupModalIsOpen} toggle={toggleEditTaskGroupModal}>
	<ModalHeader toggle={toggleEditTaskGroupModal}>Edit task group</ModalHeader>
	<ModalBody>
		<TaskGroupForm on:success={toggleEditTaskGroupModal} taskGroup={$currentTaskGroupStore} />
	</ModalBody>
</Modal>
