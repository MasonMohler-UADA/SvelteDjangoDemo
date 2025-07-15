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
		display: flex;
		flex-direction: column;
		justify-self: center;
		width: 300px;
	}
</style>
