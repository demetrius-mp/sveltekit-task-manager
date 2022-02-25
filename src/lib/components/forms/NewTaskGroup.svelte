<script lang="ts">
	import { Button, Form, Icon, Input, InputGroup } from 'sveltestrap';
	import { Spinner } from '$lib/components/ux';
	import { createForm } from 'svelte-forms-lib';
	import { stall } from '$lib/utils';
	import * as yup from 'yup';
	import { requiredString } from '$lib/utils/form.utils';

	interface FormProps {
		name: string;
	}

	const { form, isSubmitting, handleSubmit } = createForm<FormProps>({
		initialValues: {
			name: ''
		},
		onSubmit: async ({ name }) => {
			await stall();
			alert(JSON.stringify({ name }));
		},
		validationSchema: yup.object({
			name: requiredString()
		})
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
