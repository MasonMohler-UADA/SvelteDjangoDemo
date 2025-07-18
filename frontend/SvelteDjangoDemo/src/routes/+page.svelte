<script lang="ts">
	import { enhance } from '$app/forms';
	import AddCharacter from '$lib/components/Character/AddCharacter/AddCharacter.svelte';
	import Character from '$lib/components/Character/Character.svelte';
	import CharacterCard from '$lib/components/CharacterCard/CharacterCard.svelte';
	import CombatQueue from '$lib/components/CombatQueue/CombatQueue.svelte';
	import { fade } from 'svelte/transition';

	let { data, form } = $props();

	let characters = $derived(data.pageData);

	let selectedIDs: number[] = $state([]);
</script>

<h2>Characters</h2>
<div class="characterContainer">
	{#each characters as { id, name, current_HP, max_HP, ac, character_class, level }}
		<div class="character">
			<CharacterCard {id} {name} {current_HP} {max_HP} {ac} {character_class} {level} />
		</div>
	{/each}
	<div class="addCharacter"><AddCharacter /></div>
</div>

<!-- 
<form action="?/create" use:enhance method="POST">
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
		<legend>Choose your characters:</legend>
		{#each characters as { id, name, current_HP, max_HP, ac }}
			<div>
				<label>
					<input name="character_ids" type="checkbox" hidden value={id} bind:group={selectedIDs} />
					<Character {id} {name} {current_HP} {max_HP} {ac} isSelected={selectedIDs.includes(id)} />
				</label>
				<label>Enter Initiative: <input type="text" name="initiative-{id}" /></label>
			</div>
		{/each}
		<br />
	</fieldset>
	{#if selectedIDs.length > 0}
		<label transition:fade for="name"
			>Enter Session Name: <input required name="name" id="name" type="text" /></label
		>
		<br />
		<button transition:fade class="create">Create Combat Session</button>
	{/if}
</form>

{#if selectedIDs.length > 0}<form action="?/delete" use:enhance method="POST">
		{#each selectedIDs as id}
			<input name="character_ids" hidden readonly value={id} type="text" />
		{/each}
		<button transition:fade class="delete">Delete Selected Characters</button>
	</form>{/if}
<AddCharacter />

<CombatQueue {characters} {selectedIDs} /> -->

<style>
	.character:first-child {
		margin-top: 1.4rem;
	}
	.characterContainer {
		width: 450px;
		background-color: #e0e0e0;
		border-radius: 1rem;
		display: flex;
		flex-direction: column;
		height: 600px;
		align-items: center;
		gap: 1rem;
		overflow-y: scroll;
		overflow-x: hidden;
	}
	h2 {
		font-size: 2.6rem;
		margin: 0;
		margin-bottom: 1rem;
	}
	.addCharacter {
		position: sticky;
		bottom: 0;
		z-index: 100000;
	}
	/* Hide scrollbar for Chrome, Safari, and Opera */
	.characterContainer::-webkit-scrollbar {
		display: none;
	}

	/* Hide scrollbar for Firefox */
	.characterContainer {
		scrollbar-width: none; /* Firefox */
	}

	/* Hide scrollbar for Internet Explorer and Edge */
	.characterContainer {
		-ms-overflow-style: none; /* IE and Edge */
	}
	/* form {
		max-width: 100%;
		margin-top: 2rem;
	}
	fieldset {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 1rem;
	}
	button {
		background-color: brown;
		color: #fff;
		padding: 1rem;
		border: none;
		border-radius: 1rem;
		font-size: 1.4rem;
		transition: 0.4s;
		margin-bottom: 1rem;
	}
	button:hover {
		cursor: pointer;
		background-color: rgb(120, 30, 30);
	} */
</style>
