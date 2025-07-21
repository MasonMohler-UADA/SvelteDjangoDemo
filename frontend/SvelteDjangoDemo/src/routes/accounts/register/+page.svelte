<script>
	import { enhance } from '$app/forms';
	import RegisterForm from '$lib/components/RegisterForm/RegisterForm.svelte';
	let { data } = $props();
</script>

<div>
	<RegisterForm {data} />
</div>

<style>
	div {
		margin: auto;
		display: flex;
		height: 100vh;
		justify-content: center;
		padding-top: 4rem;
	}
</style>
