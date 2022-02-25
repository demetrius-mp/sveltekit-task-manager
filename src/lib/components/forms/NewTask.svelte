<script lang="ts">
	import { Spinner } from '$lib/components/ux';
	import { currentTaskGroupStore, userStore } from '$lib/stores';
	import { requiredString } from '$lib/utils/form.utils';
	import { createForm } from 'svelte-forms-lib';
	import { Button, Form, Icon, Input, InputGroup } from 'sveltestrap';
	import * as yup from 'yup';

	interface FormProps {
		name: string;
	}

	const { form, isSubmitting, handleSubmit, handleReset } = createForm<FormProps>({
		initialValues: {
			name: ''
		},
		validationSchema: yup.object({
			name: requiredString()
		}),
		onSubmit: async ({ name }) => {
			await userStore.addTaskToTaskGroup($currentTaskGroupStore, { name });

			handleReset();
		}
	});
</script>

<Form on:submit={handleSubmit}>
	<InputGroup>
		<Input bind:value={$form.name} placeholder="Search or create" type="text" />
		<Button outline disabled={$isSubmitting || !$form.name} color="primary" type="submit">
			<Spinner show={$isSubmitting}>
				<Icon name="plus" />
			</Spinner>
		</Button>
	</InputGroup>
</Form>
