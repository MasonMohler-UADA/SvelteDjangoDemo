<script>
	import { browser } from '$app/environment';
	import { page } from '$app/state';
	import MainNav from '$lib/components/MainNav/MainNav.svelte';
	import SimpleSideNav from '$lib/components/SimpleSideNav/SimpleSideNav.svelte';
	let { data, children } = $props();

	let sideNavItems = [
		{ link: '/', label: 'Home' },
		{ link: '/combat-session', label: 'Combat Sessions' }
	];
</script>

<!-- {#if browser}
	<SimpleSideNav {sideNavItems} pagePathname={page.url.pathname} />
{/if} -->
<MainNav />
<main>
	{@render children()}
</main>

<style>
	main {
		max-width: 960px;
		margin: auto;
	}
</style>
