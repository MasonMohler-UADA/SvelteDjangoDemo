<script lang="ts">
	import { enhance } from '$app/forms';
	import AddCharacter from '$lib/components/Character/AddCharacter/AddCharacter.svelte';
	import Character from '$lib/components/Character/Character.svelte';
	import CombatQueue from '$lib/components/CombatQueue/CombatQueue.svelte';
	import { fade } from 'svelte/transition';

	let { data, form } = $props();

	let characters = $derived(data.pageData);

	let selectedIDs: number[] = $state([]);
</script>

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

<CombatQueue {characters} {selectedIDs} />

<style>
	form {
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
	}
</style>
