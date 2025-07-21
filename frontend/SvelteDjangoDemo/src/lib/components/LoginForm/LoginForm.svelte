<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import SuperDebug from 'sveltekit-superforms';

	let { data } = $props();

	const { form, errors, constraints, message, enhance } = superForm(data.form);
</script>

{#if $message}<h3>{$message}</h3>{/if}

<div class="container">
	<h2>CombatTracker V1</h2>
	<form use:enhance method="POST">
		<label for="username">Username:</label>
		<input
			required
			name="username"
			type="text"
			aria-invalid={$errors.username ? 'true' : undefined}
			bind:value={$form.username}
			{...$constraints.username}
		/>
		<label for="password">Password:</label>
		<input
			required
			name="password"
			type="text"
			aria-invalid={$errors.password ? 'true' : undefined}
			bind:value={$form.password}
			{...$constraints.password}
		/>
		<button>Login</button>
		<a href="/accounts/register">Need an account? Register Now</a>
	</form>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		justify-self: center;
		justify-content: center;
		box-shadow: 0px 0px 1rem #c6c6c6;
		border-radius: 1rem;
		padding: 2rem;
		height: fit-content;
	}
	form {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		width: 500px;
		align-self: center;
	}
	button {
		display: block;
		width: 100%;
		margin-top: 1rem;
		padding: 1rem;
		border: none;
		border-radius: 1rem;
		font-size: 2rem;
		background-color: brown;
		color: #fff;
		transition: 0.4s;
	}
	button:hover {
		cursor: pointer;
		background-color: rgb(120, 30, 30);
	}
	h2 {
		font-size: 5rem;
		margin: 0;
		margin-bottom: 1.4rem;
		text-align: center;
	}
	a {
		margin-top: 0.5rem;
		align-self: center;
		width: 100%;
		text-align: center;
		font-size: 1.6rem;
		padding: 1rem;
		border-radius: 1rem;
		color: brown;
		transition: 0.4s;
	}
	a:hover {
		background-color: #e0e0e0;
	}
	label {
		font-size: 2rem;
	}
	input {
		padding: 1rem;
		font-size: 2rem;
		border: none;
		background-color: #fff;
		border-radius: 1rem;
		border: 3px solid #c6c6c6;
		transition: 0.3s;
		width: 100%;
	}
	input:hover {
		border: 3px solid #000;
	}

	input:focus {
		outline: none;
		border: 3px solid #000;
	}
</style>
