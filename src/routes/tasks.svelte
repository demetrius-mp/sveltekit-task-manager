<script lang="ts">
	import NewTask from '$lib/components/forms/NewTask.svelte';
	import { Sidebar, Navbar } from '$lib/components/layout';
	import { userStore } from '$lib/stores';
	import { currentTaskGroupStore } from '$lib/stores';
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
				{#each $currentTaskGroupStore.tasks as task}
					<p>{task.name}</p>
				{/each}
			{:else}
				<h1>Task Manager</h1>
			{/if}
		</Container>
	</main>
	<div on:click={handleToggleSidebar} class:global__overlay={sidebarIsActive} />
</div>
