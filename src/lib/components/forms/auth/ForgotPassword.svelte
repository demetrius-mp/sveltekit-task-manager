<script lang="ts">
	import { Form, FormGroup, Label, Input, Button } from 'sveltestrap';
	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';
	import { requiredEmail, type IFeedback } from '$lib/utils/form.utils';
	import { createEventDispatcher } from 'svelte';
	import { stall } from '$lib/utils';
	import { Spinner } from '$lib/components/ux';

	//#region form handling
	interface FormProperties {
		email: string;
	}

	const { form, errors, handleSubmit, isSubmitting } = createForm<FormProperties>({
		initialValues: {
			email: ''
		},
		validationSchema: yup.object({
			email: requiredEmail()
		}),
		onSubmit: async (values) => {
			await stall();
			alert(JSON.stringify(values));
		}
	});
	//#endregion form handling

	//#region event dispatcher
	interface EventDispatcher {
		rememberpassword: void;
		feedback: IFeedback;
	}

	const dispatch = createEventDispatcher<EventDispatcher>();
	//#endregion event dispatcher
</script>

<Form on:submit={handleSubmit}>
	<FormGroup>
		<Label>Email</Label>
		<Input
			bind:value={$form.email}
			required
			invalid={Boolean($errors.email)}
			feedback={$errors.email}
			bsSize="lg"
			type="email"
		/>
	</FormGroup>
	<FormGroup class="d-flex justify-content-end align-items-center">
		<small>
			<a
				href="/"
				class="text-muted text-decoration-underline cursor-pointer"
				on:click|preventDefault={() => dispatch('rememberpassword')}
			>
				Remember your password?
			</a>
		</small>
	</FormGroup>
	<Button disabled={$isSubmitting} color="primary" class="d-block w-100 mt-3 mb-2" size="lg">
		<Spinner show={$isSubmitting}>Send password reset email</Spinner>
	</Button>
</Form>
