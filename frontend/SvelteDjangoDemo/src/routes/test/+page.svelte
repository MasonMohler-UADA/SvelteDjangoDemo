<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import SuperDebug from 'sveltekit-superforms';

	let { data } = $props();

	// Client API:
	const { form, errors, constraints, message, enhance } = superForm(data.form);
</script>

<SuperDebug data={$form} />

{#if $message}<h3>{$message}</h3>{/if}

<form method="POST" use:enhance>
	<label for="name">Name</label>
	<input
		type="text"
		name="name"
		aria-invalid={$errors.name ? 'true' : undefined}
		bind:value={$form.name}
		{...$constraints.name}
	/>
	{#if $errors.name}<span class="invalid">{$errors.name}</span>{/if}

	<label for="hp">HP</label>
	<input
		type="number"
		name="hp"
		aria-invalid={$errors.hp ? 'true' : undefined}
		bind:value={$form.hp}
		{...$constraints.hp}
	/>
	{#if $errors.hp}<span class="invalid">{$errors.hp}</span>{/if}

	<label for="ac">AC</label>
	<input
		type="number"
		name="ac"
		aria-invalid={$errors.ac ? 'true' : undefined}
		bind:value={$form.ac}
		{...$constraints.ac}
	/>
	{#if $errors.ac}<span class="invalid">{$errors.ac}</span>{/if}

	<label for="level">Level</label>
	<input
		type="number"
		name="level"
		aria-invalid={$errors.level ? 'true' : undefined}
		bind:value={$form.level}
		{...$constraints.level}
	/>
	{#if $errors.level}<span class="invalid">{$errors.level}</span>{/if}

	<label for="class">Class</label>
	<select
		aria-invalid={$errors.class ? 'true' : undefined}
		bind:value={$form.class}
		{...$constraints.class}
		name="class"
		id="class"
	>
		<option selected value="">Select...</option>
		<option value="Wizard">Wizard</option>
		<option value="Fighter">Fighter</option>
		<option value="Barbarian">Barbarian</option>
		<option value="Bard">Bard</option>
		<option value="Druid">Druid</option>
		<option value="Cleric">Cleric</option>
		<option value="Paladin">Paladin</option>
		<option value="Monk">Monk</option>
		<option value="Ranger">Ranger</option>
		<option value="Rogue">Rogue</option>
		<option value="Warlock">Warlock</option>
		<option value="Sorcerer">Sorcerer</option>
	</select>
	{#if $errors.class}<span class="invalid">{$errors.class}</span>{/if}

	<div><button>Submit</button></div>
</form>

<style>
	.invalid {
		color: red;
	}
	form {
		display: flex;
		flex-direction: column;
		width: 300px;
		margin: 40px auto;
	}
	button {
		margin-top: 1rem;
		float: right;
		transition: 0.4s;
	}
	button:hover {
		cursor: pointer;
	}
</style>
