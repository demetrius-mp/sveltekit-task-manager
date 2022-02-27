<script lang="ts">
	import { TaskGroupHeading, TaskList } from '$lib/components';
	import { TaskForm } from '$lib/components/forms';
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
				<TaskGroupHeading />
				<TaskForm />
				<div class="mt-3 d-flex flex-column gap-3">
					<TaskList />
				</div>
			{:else}
				<h1>Task Manager</h1>
			{/if}
		</Container>
	</main>
	<div on:click={handleToggleSidebar} class:global__overlay={sidebarIsActive} />
</div>
