<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import SuperDebug from 'sveltekit-superforms';

	let { data } = $props();

	const { form, errors, constraints, message, enhance } = superForm(data.form);
</script>

{#if $message}<h3>{$message}</h3>{/if}

<div>
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
		<button>Submit</button>
	</form>
	<a href="/accounts/register">Need an account?</a>
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
</style>
