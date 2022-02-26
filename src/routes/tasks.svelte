<script lang="ts">
	import { TaskList } from '$lib/components';
	import { NewTask } from '$lib/components/forms';
	import { Navbar, Sidebar } from '$lib/components/layout';
	import { currentTaskGroupStore, userStore } from '$lib/stores';
	import { Container, Icon } from 'sveltestrap';

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
				<div class="d-flex align-items-center gap-3 mb-2">
					<h1 class="text-break m-0 display-6">{$currentTaskGroupStore.name}</h1>
					<div class="d-flex gap-1">
						<span>
							<Icon name="pencil" class="fs-4 cursor-pointer" />
						</span>
						<span>
							<Icon name="trash" class="fs-4 cursor-pointer" />
						</span>
					</div>
				</div>
				<NewTask />
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
