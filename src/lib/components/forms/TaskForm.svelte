<script lang="ts">
	import { Spinner } from '$lib/components/ux';
	import { currentTaskGroupStore } from '$lib/stores';
	import type { ITask } from '$lib/types';
	import { requiredString } from '$lib/utils/form.utils';
	import { createEventDispatcher } from 'svelte';
	import { createForm } from 'svelte-forms-lib';
	import { Button, Form, Icon, InputGroup } from 'sveltestrap';
	import * as yup from 'yup';
	import ResizeableInput from './ResizeableInput.svelte';

	export let task: ITask = {
		name: ''
	};

	interface FormProps {
		name: string;
	}

	const { form, isSubmitting, handleSubmit, handleReset } = createForm<FormProps>({
		initialValues: {
			name: task.name
		},
		validationSchema: yup.object({
			name: requiredString()
		}),
		onSubmit: async ({ name }) => {
			if (task.id === undefined) {
				await currentTaskGroupStore.addTask({ name });
			} else {
				const updatedTask: ITask = {
					...task,
					name
				};
				await currentTaskGroupStore.updateTask(updatedTask);
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
		<ResizeableInput bind:value={$form.name} preventNewLine on:newline={handleSubmit} />
		<Button outline disabled={$isSubmitting || !$form.name} color="primary" type="submit">
			<Spinner show={$isSubmitting}>
				<Icon name={task.id === undefined ? 'plus' : 'pencil'} />
			</Spinner>
		</Button>
	</InputGroup>
</Form>
