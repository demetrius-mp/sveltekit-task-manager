<script lang="ts">
	import type { ITask } from '$lib/types';
	import { Icon, Input } from 'sveltestrap';

	export let task: ITask;
</script>

<div class="border rounded-3 shadow p-3 d-flex align-items-center justify-content-between">
	<div class="d-flex align-items-center">
		<Input type="checkbox" class="me-1" />
		<h3 class="mb-0">
			{task.name}
		</h3>
	</div>
	<div class="d-inline-flex align-items-center gap-2">
		<span>
			<Icon name="pencil" class="fs-5 cursor-pointer" />
		</span>
		<Icon name="trash" class="fs-5 cursor-pointer" />
	</div>
</div>
