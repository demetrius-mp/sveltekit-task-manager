<script lang="ts">
	import { ForgotPassword, SignIn, SignUp } from '$lib/components/forms/auth';
	import { Button, Card, CardBody, Icon } from 'sveltestrap';

	let formType: 'signin' | 'signup' | 'forgotpassword' = 'signin';

	function toggleSignInOrUp() {
		if (formType === 'signup') {
			formType = 'signin';
		} else {
			formType = 'signup';
		}
	}
</script>

<div class="d-flex flex-column vh-100 justify-content-center align-items-center">
	<Card style="border-radius: 0.75rem; max-width: 400px;" class="shadow p-3">
		<CardBody>
			<div class="mb-3">
				<h2 class="fw-bold">Let's get started</h2>
				<small class="text-muted">
					Dont have an account?
					<a
						href="/"
						class="text-muted cursor-pointer text-decoration-underline"
						on:click|preventDefault={toggleSignInOrUp}
					>
						Sign Up
					</a>
				</small>
			</div>
			<div>
				<Button outline color="primary" class="w-100 py-2 rounded-dark">
					<Icon name="google" />
					Sign {formType === 'signup' ? 'Up' : 'In'} with Google
				</Button>
			</div>
			<span class="d-flex align-items-center my-3">
				<span class="border-top h-1 w-100" />
				<small class="mx-3 text-muted">OR</small>
				<span class="border-top h-1 w-100" />
			</span>
			{#if formType === 'signin'}
				<SignIn on:forgotpassword={() => (formType = 'forgotpassword')} />
			{:else if formType === 'signup'}
				<SignUp />
			{:else if formType === 'forgotpassword'}
				<ForgotPassword on:rememberpassword={() => (formType = 'signin')} />
			{/if}
		</CardBody>
	</Card>
</div>

<style>
	.h-1 {
		height: 0.25rem;
	}
</style>
