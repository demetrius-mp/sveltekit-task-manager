<script lang="ts">
	import { Spinner } from '$lib/components/ux';
	import { currentTaskGroupStore } from '$lib/stores';
	import type { ITask } from '$lib/types';
	import { disableNewLine, resetTextAreaHeight, resizeTextArea } from '$lib/utils/dom.utils';
	import { requiredString } from '$lib/utils/form.utils';
	import { createEventDispatcher, onMount } from 'svelte';
	import { createForm } from 'svelte-forms-lib';
	import { Button, Form, Icon, Input, InputGroup } from 'sveltestrap';
	import * as yup from 'yup';

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
			resetTextAreaHeight(textAreaElement);
		}
	});

	interface EventDispatcher {
		success: void;
	}

	const dispatch = createEventDispatcher<EventDispatcher>();

	let textAreaElement: HTMLTextAreaElement;

	function handleInput() {
		resizeTextArea(textAreaElement);
	}

	function handleKeyPress(event: KeyboardEvent) {
		const isEnterKey = disableNewLine(event);

		if (isEnterKey) {
			// @ts-ignore
			handleSubmit();
		}
	}

	onMount(() => {
		resizeTextArea(textAreaElement);
	});
</script>

<Form on:submit={handleSubmit}>
	<InputGroup class="shadow-sm">
		<Input
			bind:value={$form.name}
			placeholder="Search or create"
			type="textarea"
			rows={1}
			bind:inner={textAreaElement}
			on:input={handleInput}
			on:keypress={handleKeyPress}
		/>
		<Button outline disabled={$isSubmitting || !$form.name} color="primary" type="submit">
			<Spinner show={$isSubmitting}>
				<Icon name={task.id === undefined ? 'plus' : 'pencil'} />
			</Spinner>
		</Button>
	</InputGroup>
</Form>
