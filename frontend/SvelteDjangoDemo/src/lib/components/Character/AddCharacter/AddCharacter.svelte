<script>
	// import { addToast } from '$lib/components/Toast/state.svelte';
	import { enhance } from '$app/forms';
	import { fade, fly, slide } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	let showForm = $state(false);
	let hp = $state();

	function toggleForm() {
		showForm = !showForm;
	}

	function handleClickOutside(event) {
		if (!event.target.closest('.formOpener') && !event.target.closest('.addForm')) {
			showForm = false;
		}
	}
</script>

<svelte:window on:click={handleClickOutside} />

<div class="container">
	{#if !showForm}
		<button
			transition:slide={{ easing: cubicOut, duration: 300 }}
			class="formOpener"
			type="button"
			onclick={toggleForm}>+</button
		>
	{/if}
	{#if showForm}
		<form
			class="addForm"
			transition:slide={{ easing: cubicOut, duration: 600 }}
			method="POST"
			use:enhance={({}) => {
				// return async ({ result, update }) => {
				// 	if (result.type === 'success') {
				// 		addToast({ message: 'Player added successfully!', type: 'success' });
				// 		update();
				// 	} else {
				// 		addToast({ message: 'Failed to add player', type: 'error' });
				// 	}
				// };
			}}
			action="?/createCharacter"
		>
			<fieldset>
				<label>
					Name:
					<input placeholder="e.g. Mason" name="name" type="text" />
				</label>
				<label>
					HP:
					<input bind:value={hp} placeholder="e.g. 18" name="current_HP" type="number" />
				</label>
				<input hidden name="max_HP" value={hp} type="number" />
				<label>
					AC:
					<input placeholder="e.g. 14" name="ac" type="number" />
				</label>
				<label>
					Class:
					<input placeholder="e.g. Wizard" name="character_class" type="text" />
				</label>
				<label>
					Level:
					<input placeholder="e.g. 5" name="level" type="number" />
				</label>
				<button class="formButton" onclick={toggleForm} type="submit">Add Character</button>
			</fieldset>
		</form>
	{/if}
</div>

<style>
	form {
		display: flex;
		gap: 1rem;
		flex-direction: column;
		border: none;
		border-radius: 1rem;
		padding: 2rem;
		background-color: #e0e0e0;
		z-index: 1000;
		width: 450px;
		height: 600px;
	}
	fieldset {
		border: none;
		background-color: #fff;
		box-shadow: 0 0 1rem #c6c6c6;
		border-radius: 1rem;
		padding: 2rem;
		height: 550px;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}
	input {
		padding: 0.75rem;
		border: none;
		background-color: #fff;
		border-radius: 1rem;
		border: 3px solid #c6c6c6;
		transition: 0.3s;
		font-size: 1rem;
		width: 100%;
	}

	input:hover {
		border: 3px solid #000;
	}

	input:focus {
		outline: none;
		border: 3px solid #000;
	}

	/* Remove number input spinner arrows */
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
	label {
		display: block;
		font-size: 1.5rem;
		display: flex;
		gap: 1.2rem;
		align-items: center;
	}
	button {
		border: none;
		background-color: brown;
		color: #fff;
		border-radius: 1rem;
		font-family: 'Courier New', Courier, monospace;
		font-size: 6rem;
		transition: 0.4s;
		width: 450px;
		border-radius: 2rem;
	}
	button:hover {
		cursor: pointer;
		background-color: rgb(120, 30, 30);
	}
	.formButton {
		width: 100%;
		font-size: 1.2rem;
		margin: 0;
		padding: 0.75rem;
		border-radius: 0.5rem;
	}
</style>
