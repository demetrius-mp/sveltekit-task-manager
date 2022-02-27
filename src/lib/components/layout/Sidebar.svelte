<script lang="ts">
	import { TaskGroupList } from '$lib/components';
	import { TaskGroupForm } from '$lib/components/forms';
	import { elementIsOverflowing } from '$lib/utils/dom.utils';
	import { createEventDispatcher, onMount } from 'svelte';
	import { Icon, Nav } from 'sveltestrap';

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
			<TaskGroupForm />
		</div>
		<div id="overflowable" class:dynamic-padding={applyDynamicPadding} class="scrollarea pe-3">
			<Nav pills vertical class="mb-auto gap-1">
				<TaskGroupList />
			</Nav>
		</div>
	</div>
</nav>

<style>
	.dynamic-padding {
		padding-right: calc(1rem - var(--scrollbar-width)) !important;
	}
</style>
