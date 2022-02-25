<script lang="ts">
	import { Task } from '$lib/components';
	import { NewTask } from '$lib/components/forms';
	import { Navbar, Sidebar } from '$lib/components/layout';
	import { currentTaskGroupStore, userStore } from '$lib/stores';
	import { Container } from 'sveltestrap';

	let sidebarIsActive: boolean = true;
	function handleToggleSidebar() {
		sidebarIsActive = !sidebarIsActive;
	}

	$userStore = {
		taskGroups: [],
		avatarUrl: ''
	};
</script>

<div class="global__wrapper">
	<Sidebar on:close={handleToggleSidebar} active={sidebarIsActive} />

	<main class:active={sidebarIsActive} class="global__content">
		<Navbar bind:rotated={sidebarIsActive} on:toggleSidebar={handleToggleSidebar} />
		<Container class="mt-3">
			{#if $currentTaskGroupStore}
				<h1>{$currentTaskGroupStore.name}</h1>
				<NewTask />
				<div class="mt-3 d-flex flex-column gap-3">
					{#each $currentTaskGroupStore.tasks as task}
						<Task {task} />
					{/each}
				</div>
			{:else}
				<h1>Task Manager</h1>
			{/if}
		</Container>
	</main>
	<div on:click={handleToggleSidebar} class:global__overlay={sidebarIsActive} />
</div>
