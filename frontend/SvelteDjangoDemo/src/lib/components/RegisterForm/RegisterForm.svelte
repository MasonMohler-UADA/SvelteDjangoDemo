<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import SuperDebug from 'sveltekit-superforms';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { user } from '$lib/schemas/schema.js';
	import { debounce } from 'throttle-debounce';

	let { data } = $props();

	const { form, errors, constraints, message, enhance } = superForm(data.form, {
		validators: zod4Client(user),
		customValidity: false
	});

	const debounceFunc = debounce(
		1000,
		async (username) => {
			const res = await fetch(`/api/users/username-check/`, {
				method: 'POST',
				body: JSON.stringify({ username })
			});
			const body = await res.json();
			console.log(JSON.stringify(body));
			if (body.value) {
				$errors.username = ['Username is already taken.'];
			}
		},
		{ atBegin: false }
	);
</script>

<div class="container">
	<h2>CombatTracker V1</h2>
	<form use:enhance method="POST">
		<label for="username">Create a Username:</label>
		<input
			placeholder="username123"
			oninput={() => debounceFunc($form.username)}
			required
			name="username"
			type="text"
			aria-invalid={$errors.username ? 'true' : undefined}
			bind:value={$form.username}
			{...$constraints.username}
		/>
		{#if $errors.username}<span class="invalid">{$errors.username}</span>{/if}
		<label for="password">Create a Password:</label>
		<input
			required
			name="password"
			type="text"
			aria-invalid={$errors.password ? 'true' : undefined}
			bind:value={$form.password}
			{...$constraints.password}
		/>
		{#if $errors.password}<span class="invalid">{$errors.password}</span>{/if}
		<p>Password must contain 1 uppercase letter, 1 number, and 1 special character.</p>
		<button>Create Account</button>
		<a href="/accounts/login">Already have an account?</a>
	</form>
</div>

<style>
	p {
		margin: 0;
	}
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
	.invalid {
		color: red;
	}
	input:first-of-type {
		margin-bottom: 1rem;
	}
</style>
