<script>
	let { username } = $props();
</script>

<header>
	<div class="container">
		<h1>Combat Tracker V1</h1>
		<div class="userActions">
			<h4>{username}</h4>
			<a data-sveltekit-preload-data="off" href="/accounts/logout">Logout</a>
		</div>
	</div>
</header>

<style>
	header {
		width: 100%;
		height: 120px;
		background-color: brown;
		color: #fff;
		margin-bottom: 2rem;
	}
	.container {
		display: flex;
		justify-content: space-around;
		align-self: center;
		align-items: center;
		height: 120px;
	}
	.userActions {
		display: flex;
		gap: 1rem;
		align-items: center;
	}
	h1 {
		font-size: 3rem;
	}
	h4 {
		font-size: 1.4rem;
	}
	a {
		text-decoration: none;
		background-color: #fff;
		color: brown;
		padding: 0.5rem 1rem;
		border-radius: 0.5rem;
		font-size: 1.4rem;
		transition: 0.4s;
	}
	a:hover {
		background-color: #c6c6c6;
	}
</style>
