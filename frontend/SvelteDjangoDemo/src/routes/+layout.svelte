<script>
	import { browser } from '$app/environment';
	import { page } from '$app/state';
	import Header from '$lib/components/Header/Header.svelte';
	import MainNav from '$lib/components/MainNav/MainNav.svelte';
	import SimpleSideNav from '$lib/components/SimpleSideNav/SimpleSideNav.svelte';
	import '$lib/static/css/modern-normalize.css';
	let { data, children } = $props();

	let sideNavItems = [
		{ link: '/', label: 'Home' },
		{ link: '/combat-session', label: 'Combat Sessions' }
	];

	let username = $derived(data.username);
</script>

<!-- {#if browser}
	<SimpleSideNav {sideNavItems} pagePathname={page.url.pathname} />
{/if} -->
{#if data.loggedIn}
	<Header {username} />
{/if}
<main>
	{@render children()}
</main>

<style>
	main {
		max-width: 960px;
		margin: auto;
	}
</style>
