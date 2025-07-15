<script>
	import { browser } from '$app/environment';
	import { invalidateAll } from '$app/navigation';
	import LoginForm from '$lib/components/LoginForm/LoginForm.svelte';
	if (browser) {
		invalidateAll();
	}
	let { data } = $props();
</script>

<LoginForm {data} />
