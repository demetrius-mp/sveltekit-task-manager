<script lang="ts">
	import { Spinner } from '$lib/components/ux';
	import { currentTaskGroupStore, userStore } from '$lib/stores';
	import type { ITaskGroup } from '$lib/types';
	import { requiredString } from '$lib/utils/form.utils';
	import { createEventDispatcher } from 'svelte';
	import { createForm } from 'svelte-forms-lib';
	import { Button, Form, Icon, Input, InputGroup } from 'sveltestrap';
	import * as yup from 'yup';

	export let taskGroup: ITaskGroup = {
		name: '',
		tasks: []
	};

	interface FormProps {
		name: string;
	}

	const { form, isSubmitting, handleSubmit, handleReset } = createForm<FormProps>({
		initialValues: {
			name: taskGroup.name
		},
		validationSchema: yup.object({
			name: requiredString()
		}),
		onSubmit: async ({ name }) => {
			if (taskGroup.id === undefined) {
				const taskGroup = await userStore.addTaskGroup({ name, tasks: [] });
				$currentTaskGroupStore = taskGroup;
			} else {
				const updatedTaskGroup: ITaskGroup = {
					...taskGroup,
					name
				};
				await userStore.updateTaskGroup(updatedTaskGroup);
			}

			dispatch('success');
			handleReset();
		}
	});

	interface EventDispatcher {
		success: void;
	}

	const dispatch = createEventDispatcher<EventDispatcher>();
</script>

<Form on:submit={handleSubmit}>
	<InputGroup class="shadow-sm">
		<Input bind:value={$form.name} placeholder="Search or create" type="text" />
		<Button outline disabled={$isSubmitting || !$form.name} color="primary" type="submit">
			<Spinner show={$isSubmitting}>
				<Icon name="folder-plus" />
			</Spinner>
		</Button>
	</InputGroup>
</Form>
