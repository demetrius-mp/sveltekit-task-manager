<script lang="ts">
	import { Spinner } from '$lib/components/ux';
	import { stall } from '$lib/utils';
	import {
		minLengthMessage,
		requiredEmail,
		requiredString,
		type IFeedback
	} from '$lib/utils/form.utils';
	import { createEventDispatcher } from 'svelte';
	import { createForm } from 'svelte-forms-lib';
	import { Button, Form, FormGroup, Input, Label } from 'sveltestrap';
	import * as yup from 'yup';

	//#region form handling
	interface FormProperties {
		email: string;
		password: string;
		confirmPassword: string;
	}

	const { form, errors, handleSubmit, isSubmitting } = createForm<FormProperties>({
		initialValues: {
			email: '',
			password: '',
			confirmPassword: ''
		},
		validationSchema: yup.object({
			email: requiredEmail(),
			password: requiredString().min(8, minLengthMessage(8)),
			confirmPassword: requiredString().oneOf(
				[yup.ref('password'), undefined],
				'Passwords must match'
			)
		}),
		onSubmit: async (values) => {
			await stall();
			alert(JSON.stringify(values));
		}
	});
	//#endregion form handling

	//#region event dispatcher
	interface EventDispatcher {
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
	<FormGroup>
		<Label>Password</Label>
		<Input
			bind:value={$form.password}
			invalid={Boolean($errors.password)}
			feedback={$errors.password}
			bsSize="lg"
			type="password"
		/>
	</FormGroup>
	<FormGroup>
		<Label>Confirm password</Label>
		<Input
			bind:value={$form.confirmPassword}
			invalid={Boolean($errors.confirmPassword)}
			feedback={$errors.confirmPassword}
			bsSize="lg"
			type="password"
		/>
	</FormGroup>
	<Button disabled={$isSubmitting} color="primary" class="d-block w-100 mt-3 mb-2" size="lg">
		<Spinner show={$isSubmitting}>Sign Up</Spinner>
	</Button>
	<small class="text-muted"> By clicking Sign Up, you agree to the terms of use. </small>
</Form>
