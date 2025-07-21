<script>
	import { browser } from '$app/environment';
	import { invalidateAll } from '$app/navigation';
	import LoginForm from '$lib/components/LoginForm/LoginForm.svelte';
	if (browser) {
		invalidateAll();
	}
	let { data } = $props();
</script>

<div class="container">
	<LoginForm {data} />
</div>

<style>
	.container {
		margin: auto;
		display: flex;
		height: 100vh;
		justify-content: center;
		padding-top: 4rem;
	}
</style>
