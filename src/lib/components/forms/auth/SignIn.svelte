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
		remember: boolean;
	}

	const { form, errors, handleSubmit, isSubmitting } = createForm<FormProperties>({
		initialValues: {
			email: '',
			password: '',
			remember: false
		},
		validationSchema: yup.object({
			email: requiredEmail(),
			password: requiredString().min(8, minLengthMessage(8))
		}),
		onSubmit: async (values) => {
			await stall();
			alert(JSON.stringify(values));
		}
	});
	//#endregion form handling

	//#region event dispatcher
	interface EventDispatcher {
		forgotpassword: void;
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
	<FormGroup class="d-flex justify-content-between align-items-baseline">
		<Input id="rememberMe" type="checkbox" label="Remember me" />
		<div class="text-end">
			<small>
				<a
					href="/"
					class="text-muted text-decoration-underline cursor-pointer"
					on:click|preventDefault={() => dispatch('forgotpassword')}
				>
					Forgot your password?
				</a>
			</small>
		</div>
	</FormGroup>
	<Button disabled={$isSubmitting} color="primary" class="d-block w-100 mt-3 mb-2" size="lg">
		<Spinner show={$isSubmitting}>Sign In</Spinner>
	</Button>
	<small class="text-muted"> By clicking Sign In, you agree to the terms of use. </small>
</Form>
