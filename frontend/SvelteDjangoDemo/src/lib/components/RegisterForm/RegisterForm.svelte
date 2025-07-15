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

<div>
	<h2>CombatTracker V1</h2>
	<form use:enhance method="POST">
		<label for="username">Username:</label>
		<input
			oninput={() => debounceFunc($form.username)}
			required
			name="username"
			type="text"
			aria-invalid={$errors.username ? 'true' : undefined}
			bind:value={$form.username}
			{...$constraints.username}
		/>
		{#if $errors.username}<span class="invalid">{$errors.username}</span>{/if}
		<label for="password">Password:</label>
		<input
			required
			name="password"
			type="text"
			aria-invalid={$errors.password ? 'true' : undefined}
			bind:value={$form.password}
			{...$constraints.password}
		/>
		{#if $errors.password}<span class="invalid">{$errors.password}</span>{/if}
		<button>Submit</button>
	</form>
	<a href="/accounts/login">Already have an account?</a>
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
	button {
		display: block;
		width: 100%;
		margin-top: 0.5rem;
	}
	button:hover {
		cursor: pointer;
	}
	.invalid {
		color: red;
	}
</style>
