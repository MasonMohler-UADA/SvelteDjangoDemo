<script>
	import { slide } from 'svelte/transition';

	let menuOpen = $state(false);

	function handleClickOutside(event) {
		if (!event.target.closest('.mainNavButton')) {
			menuOpen = false;
		}
	}
</script>

<svelte:window on:click={handleClickOutside} />

<div class="mainNav">
	{#if !menuOpen}
		<button class="mainNavButton" onclick={() => (menuOpen = !menuOpen)}>☰</button>
	{:else}
		<button class="mainNavButton" onclick={() => (menuOpen = !menuOpen)}>✖</button>
	{/if}
	{#if menuOpen}
		<nav transition:slide>
			<a href="/">Home</a>
			<a href="/combat-session">View Combat Sessions</a>
		</nav>
	{/if}
</div>

<style>
	button {
		font-size: 2rem;
	}
	div {
		position: absolute;
		top: 2rem;
		left: 2rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		align-items: flex-start;
	}
	button:hover {
		cursor: pointer;
	}
	nav {
		text-align: right;
		display: flex;
		flex-direction: column;
		box-shadow: 0px 0px 1rem #c6c6c6;
		padding: 1rem;
		border-radius: 1rem;
		gap: 1rem;
	}
	a {
		text-decoration: none;
		padding: 1rem;
		background-color: brown;
		border-radius: 1rem;
		color: #fff;
		font-size: 1.2rem;
		transition: 0.4s;
		text-align: center;
	}
	a:hover {
		cursor: pointer;
		background-color: rgb(120, 30, 30);
	}
	:global(body) {
		font-family: 'Courier New', Courier, monospace;
		box-sizing: border-box;
	}
	button {
		border: none;
		background-color: brown;
		color: #fff;
		border-radius: 100%;
		width: 75px;
		height: 75px;
		text-align: center;
		font-size: 2rem;
		transition: 0.4s;
		z-index: 10000000;
		box-shadow: 0px 0px 1rem #c6c6c6;
	}
	button:hover {
		cursor: pointer;
		background-color: rgb(120, 30, 30);
	}
</style>
