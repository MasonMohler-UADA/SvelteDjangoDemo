<script>
	import MainNav from '$lib/components/MainNav/MainNav.svelte';
	let { data, children } = $props();
</script>

<main>
	{@render children()}
	<MainNav />
</main>
