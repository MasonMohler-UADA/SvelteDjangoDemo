<script lang="ts">
	// import { addToast } from '$lib/components/Toast/state.svelte';
	import { enhance } from '$app/forms';
	import { fade, fly, slide } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import CharacterItem from '../CharacterItem/CharacterItem.svelte';

	let { characters, form } = $props();

	let showForm = $state(false);
	let selectedIDs: number[] = $state([]);

	function toggleForm() {
		showForm = !showForm;
	}

	function handleClickOutside(event) {
		if (
			!event.target.closest('.formOpener') &&
			!event.target.closest('.addForm') &&
			!event.target.closest('.optionsContainer')
		) {
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
			action="?/createSession"
		>
			{#if form?.noneSelected}<p style:color="red" class="error">
					Please select at least one character
				</p>{/if}
			{#if form?.missingInitiative}<p style:color="red" class="error">
					Selected characters must have an initiative.
				</p>{/if}
			{#if form?.noName}
				<p style:color="red" class="error">Please enter a session name</p>
			{/if}
			<fieldset>
				<div class="firstField">
					<button type="button" onclick={toggleForm} class="x-out">✖</button>
					<label class="nameLabel">
						Name:
						<input
							class="nameField"
							placeholder="e.g. Session 1"
							required
							name="name"
							id="name"
							type="text"
						/>
					</label>
				</div>

				<label class="characterLabel" for="characterSelect">Characters:</label>
				<div class="optionContainer">
					{#each characters as { id, name }}
						<label class="option">
							<input
								name="character_ids"
								type="checkbox"
								hidden
								value={id}
								bind:group={selectedIDs}
							/>
							<CharacterItem {id} {name} isSelected={selectedIDs.includes(id)} />
						</label>
					{/each}
				</div>
				<button class="formButton" onclick={toggleForm} type="submit">Start Combat</button>
			</fieldset>
		</form>
	{/if}
</div>

<style>
	.x-out {
		width: 50px;
		height: 50px;
		font-size: 1rem;
		padding: 0.5rem;
		float: right;
		transform: translate(3rem, -3rem);
	}
	.nameField {
		width: 226px;
	}
	.option {
		border-bottom: 2px solid #c6c6c6;
	}
	.option:last-child {
		border-bottom: none;
	}
	.characterLabel {
		margin-top: 1rem;
	}
	.optionContainer {
		border: 3px solid #c6c6c6;
		border-radius: 1rem;
		height: 316px;
		overflow-y: scroll;
		overflow-x: hidden;
	}
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
		font-family: 'Courier New', Courier, monospace;
		font-size: 6rem;
		transition: 0.4s;
		width: 450px;
		border-radius: 1rem;
	}
	button:hover {
		cursor: pointer;
		background-color: rgb(120, 30, 30);
	}
	.formButton {
		width: 100%;
		font-size: 1.2rem;
		margin: 0;
		margin-top: 1rem;
		padding: 0.75rem;
		border-radius: 0.5rem;
	}
	/* Hide scrollbar for Chrome, Safari, and Opera */
	.optionContainer::-webkit-scrollbar {
		display: none;
	}

	/* Hide scrollbar for Firefox */
	.optionContainer {
		scrollbar-width: none; /* Firefox */
	}

	/* Hide scrollbar for Internet Explorer and Edge */
	.optionContainer {
		-ms-overflow-style: none; /* IE and Edge */
	}
</style>
