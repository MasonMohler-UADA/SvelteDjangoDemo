<script>
	import { enhance } from '$app/forms';
</script>

<div>
	<h2>CombatTracker V1</h2>
	<form use:enhance method="POST">
		<label>Create a Username: <input required name="username" type="text" /></label>
		<label>Create a Password: <input required name="password" type="text" /></label>
		<button>Submit</button>
	</form>
</div>

<style>
	div {
		display: flex;
		flex-direction: column;
		justify-self: center;
		width: 300px;
	}
	form {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	label input {
		width: 100%;
		padding: 0;
		margin: 0;
	}
	button {
		display: block;
		width: 100%;
		margin-top: 0.5rem;
	}
	button:hover {
		cursor: pointer;
	}
</style>
