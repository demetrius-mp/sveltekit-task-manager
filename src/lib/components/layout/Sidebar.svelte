<script lang="ts">
	import { Button, Icon, Nav, NavItem, NavLink } from 'sveltestrap';
	import { onMount, createEventDispatcher } from 'svelte';
	import { elementIsOverflowing } from '$lib/utils/dom.utils';
	import { NewTaskGroup } from '$lib/components/forms';

	export let active: boolean = false;

	interface EventDispatcher {
		close: void;
	}

	const dispatch = createEventDispatcher<EventDispatcher>();

	let applyDynamicPadding: boolean = false;
	onMount(() => {
		const el = document.getElementById('overflowable');
		applyDynamicPadding = elementIsOverflowing(el);
	});
</script>

<nav>
	<div
		class:active
		id="overflowContainer"
		class="global__sidebar d-flex flex-column flex-shrink-0 ps-3 py-2 bg-white border-end"
	>
		<div class="d-flex align-items-center justify-content-between text-decoration-none pe-3">
			<div class="d-flex align-items-center">
				<Icon style="font-size: 1.5rem;" class="me-2" name="card-checklist" />
				<span class="fs-4">Task Groups</span>
			</div>
			<div on:click={() => dispatch('close')}>
				<Icon style="font-size: 1.5rem;" class="cursor-pointer" name="x-lg" />
			</div>
		</div>
		<div class="pe-3">
			<hr style="margin-top: 6px;" />
		</div>
		<div class="mb-3 pe-3">
			<NewTaskGroup />
		</div>
		<div id="overflowable" class:dynamic-padding={applyDynamicPadding} class="scrollarea pe-3">
			<Nav pills vertical class="mb-auto">
				<div class="hover-gray mb-1">
					<NavItem>
						<NavLink active>Task group title</NavLink>
					</NavItem>
				</div>
			</Nav>
		</div>
	</div>
</nav>

<style>
	.dynamic-padding {
		padding-right: calc(1rem - var(--scrollbar-width)) !important;
	}

	.hover-gray:hover {
		background-color: lightgrey;
		border-radius: 0.25rem;
	}
</style>
