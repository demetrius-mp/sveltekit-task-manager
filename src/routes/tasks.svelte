<script lang="ts">
	import { Sidebar, Navbar } from '$lib/components/layout';
	import { userStore } from '$lib/stores';
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
			<h1>Task Manager</h1>
		</Container>
	</main>
	<div on:click={handleToggleSidebar} class:global__overlay={sidebarIsActive} />
</div>
