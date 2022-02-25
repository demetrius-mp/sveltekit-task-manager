<script lang="ts">
	import { Spinner } from 'sveltestrap';

	export let show: boolean = false;
</script>

{#if show}
	<Spinner size="sm" />
{:else}
	<slot />
{/if}
