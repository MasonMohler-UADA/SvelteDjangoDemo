<script lang="ts">
	import type { Character } from '$lib/types/types';

	let { characters, selectedIDs } = $props();

	function filterMatchingObjects(ids: number[], objects: Character[]): Character[] {
		return objects.filter((obj) => ids.includes(obj.id));
	}

	let selectedCharacters = $derived.by(() => {
		let matchingCharacters = filterMatchingObjects(selectedIDs, characters);
		return matchingCharacters;
	});
</script>

<h2>Currently Selected:</h2>
{#if selectedCharacters.length > 0}
	<form method="POST" action="?/create">
		{#each selectedCharacters as { id, name, player }}
			{#if player}
				<div class="listItem">
					<input type="checkbox" hidden checked readonly name="characters" value={id} />
					<strong>{name}</strong>
					<input class="initField" placeholder="Enter intiative" type="number" name={String(id)} />
					<br />
				</div>
			{/if}
			{#if !player}
				<div class="listItem">
					<input type="checkbox" hidden checked readonly name="characters" value={id} />
					<strong style:color="red">{name}</strong>
					<!-- <input type="number" name="numEnemies{id}" placeholder="How Many?" /> -->
					<input class="initField" placeholder="Enter intiative" type="number" name={String(id)} />
					<br />
				</div>
			{/if}
		{/each}
		<button type="submit">Start Combat</button>
	</form>
{:else}
	<div class="listItem">
		<strong>Characters will be listed here!</strong> <br />
	</div>
{/if}

<style>
	.listItem {
		background-color: #fff;
		box-shadow: 0px 0px 1rem #c6c6c6;
		padding: 1rem;
		border-radius: 1rem;
		margin-bottom: 0.5rem;
		font-size: 1.4rem;
		text-align: center;
	}
	button {
		border: none;
		padding: 1rem;
		background-color: brown;
		border-radius: 1rem;
		color: #fff;
		font-size: 1.2rem;
		font-family: 'Courier New', Courier, monospace;
		transition: 0.4s;
		width: 100%;
		margin-top: 1rem;
	}
	button:hover {
		cursor: pointer;
		background-color: rgb(120, 30, 30);
	}
	input {
		margin-bottom: 0.2rem;
	}
	.initField {
		padding: 0.5rem;
		border: none;
		background-color: #fff;
		border-radius: 0.5rem;
		border: 3px solid #c6c6c6;
		transition: 0.3s;
		font-size: 1rem;
		width: 150px;
	}

	.initField:hover {
		border: 3px solid #000;
	}

	.initField:focus {
		outline: none;
		border: 3px solid #000;
	}

	/* Remove number input spinner arrows */
	.initField::-webkit-outer-spin-button,
	.initField::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
</style>
