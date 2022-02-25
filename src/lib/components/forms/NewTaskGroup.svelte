<script lang="ts">
	import { Button, Form, Icon, Input, InputGroup } from 'sveltestrap';
	import { Spinner } from '$lib/components/ux';
	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';
	import { requiredString } from '$lib/utils/form.utils';
	import { userStore } from '$lib/stores';
	import { currentTaskGroup } from '$lib/stores/user.store';

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
			const taskGroup = await userStore.addTaskGroup({ name, tasks: [] });
			$currentTaskGroup = taskGroup;
			handleReset();
		}
	});
</script>

<Form on:submit={handleSubmit}>
	<InputGroup>
		<Input bind:value={$form.name} placeholder="Search or create" type="text" />
		<Button outline disabled={$isSubmitting || !$form.name} color="primary" type="submit">
			<Spinner show={$isSubmitting}>
				<Icon name="folder-plus" />
			</Spinner>
		</Button>
	</InputGroup>
</Form>
