<script lang="ts">
	import {
		Navbar,
		NavbarBrand,
		Nav,
		NavItem,
		Button,
		Dropdown,
		DropdownToggle,
		DropdownMenu,
		DropdownItem,
		Icon
	} from 'sveltestrap';
	import { createEventDispatcher } from 'svelte';

	interface EventDispatcher {
		toggleSidebar: void;
	}

	const dispatch = createEventDispatcher<EventDispatcher>();

	export let rotated: boolean = false;
	function toggleSidebar() {
		dispatch('toggleSidebar');
		rotated = !rotated;
	}

	const user: {
		name: string;
		avatarUrl: string;
	} = {
		name: 'Demetrius',
		avatarUrl: 'https://avatars.githubusercontent.com/u/98681?v=4'
	};
</script>

<Navbar color="light" light>
	<span class="d-flex align-items-center gap-2">
		<Button on:click={toggleSidebar} color="primary">
			<div class:rotate={rotated} class="icon-wrapper d-flex">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					fill="currentColor"
					class="bi bi-arrow-bar-right"
					viewBox="0 0 16 16"
				>
					<path
						fill-rule="evenodd"
						d="M6 8a.5.5 0 0 0 .5.5h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L12.293 7.5H6.5A.5.5 0 0 0 6 8zm-2.5 7a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5z"
					/>
				</svg>
			</div>
		</Button>
		<NavbarBrand href="/">Task manager</NavbarBrand>
	</span>
	<Nav>
		<NavItem>
			<Dropdown>
				<DropdownToggle
					tag="div"
					class="d-flex align-items-center text-white text-decoration-none cursor-pointer"
				>
					<img
						src={user.avatarUrl}
						alt="Profile"
						class="rounded-circle me-2"
						width="36"
						style="cursor: pointer"
					/>
				</DropdownToggle>
				<DropdownMenu class="text-small">
					<DropdownItem header>Actions</DropdownItem>
					<DropdownItem href="/profile">
						<Icon name="person-circle" />
						Profile
					</DropdownItem>
					<DropdownItem divider />
					<DropdownItem class="text-danger">
						<Icon name="box-arrow-right" />
						Logout
					</DropdownItem>
				</DropdownMenu>
			</Dropdown>
		</NavItem>
	</Nav>
</Navbar>

<style>
	.icon-wrapper {
		transition: all 0.3s;
	}

	.rotate {
		transform: rotate(180deg);
	}
</style>
