<script>
	let menuOpen = $state(false);
</script>

<div>
	{#if menuOpen}
		<nav>
			<a href="/">Home</a>
			<a href="/combat-session">View Combat Sessions</a>
		</nav>
	{/if}
	{#if !menuOpen}
		<button onclick={() => (menuOpen = !menuOpen)}>☰</button>
	{:else}
		<button onclick={() => (menuOpen = !menuOpen)}>✖</button>
	{/if}
</div>

<style>
	button {
		font-size: 2rem;
	}
	div {
		position: absolute;
		bottom: 2rem;
		right: 2rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		align-items: flex-end;
	}
	button:hover {
		cursor: pointer;
	}
	nav {
		text-align: right;
		display: flex;
		flex-direction: column;
	}
</style>
