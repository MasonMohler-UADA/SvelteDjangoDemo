<script lang="ts">
	import { enhance } from '$app/forms';
	import AddSession from '$lib/components/AddSession/AddSession.svelte';
	import AddCharacter from '$lib/components/Character/AddCharacter/AddCharacter.svelte';
	import CharacterCard from '$lib/components/CharacterCard/CharacterCard.svelte';
	import SessionCard from '$lib/components/SessionCard/SessionCard.svelte';

	let { data, form } = $props();

	let characters = $derived(data.characterData);
	let sessions = $derived(data.sessionData);
</script>

<div class="container">
	<div class="left">
		<h2>Characters</h2>
		<div class="characterContainer">
			<div class="characterList">
				{#each characters as { id, name, current_HP, max_HP, ac, character_class, level }}
					<div class="character">
						<CharacterCard {id} {name} {current_HP} {max_HP} {ac} {character_class} {level} />
					</div>
				{/each}
			</div>
			<div class="addCharacter"><AddCharacter /></div>
		</div>
	</div>
	<div class="right">
		<h2>Combat Sessions</h2>
		<div class="sessionContainer">
			<div class="sessionList">
				{#each sessions as { id, name }}
					<div class="session">
						<SessionCard {id} {name} />
					</div>
				{/each}
			</div>
			<div class="addSession"><AddSession {characters} {form} /></div>
		</div>
	</div>
</div>

<style>
	.container {
		display: grid;
		grid-template-columns: 1fr 1fr;
		margin-top: 4rem;
		gap: 1rem;
	}
	.character:first-child,
	.session:first-child {
		margin-top: 1.4rem;
	}
	.character:last-child,
	.session:last-child {
		margin-bottom: 1.4rem;
	}
	.characterContainer,
	.sessionContainer {
		width: 450px;
		background-color: #e0e0e0;
		border-radius: 1rem;
		display: flex;
		flex-direction: column;
		height: 600px;
		align-items: center;
		overflow-y: scroll;
		overflow-x: hidden;
	}
	.characterList,
	.sessionList {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		flex: 1;
	}
	h2 {
		font-size: 2.6rem;
		margin: 0;
		margin-bottom: 1rem;
	}
	.addCharacter,
	.addSession {
		position: sticky;
		bottom: 0;
		z-index: 100000;
	}
	/* Hide scrollbar for Chrome, Safari, and Opera */
	.characterContainer::-webkit-scrollbar,
	.sessionContainer::-webkit-scrollbar {
		display: none;
	}

	/* Hide scrollbar for Firefox */
	.characterContainer,
	.sessionContainer {
		scrollbar-width: none; /* Firefox */
	}

	/* Hide scrollbar for Internet Explorer and Edge */
	.characterContainer,
	.sessionContainer {
		-ms-overflow-style: none; /* IE and Edge */
	}
</style>
