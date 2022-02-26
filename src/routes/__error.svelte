<script>
	import { Button, Container } from 'sveltestrap';
</script>

<Container>
	<div class="d-flex flex-column justify-content-center align-items-center min-vh-100 text-center">
		<h1 class="display-5 fw-bold">Oops</h1>
		<div class="col-lg-4 mx-auto">
			<h5>Something went wrong</h5>
			<p class="lead mb-4">If you typed the URL manually, please check again.</p>
			<div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
				<Button href="/" class="px-4" size="lg" color="primary">Go home</Button>
			</div>
		</div>
	</div>
</Container>
