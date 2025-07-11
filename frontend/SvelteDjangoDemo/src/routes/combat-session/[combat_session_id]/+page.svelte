<script>
	import { enhance } from '$app/forms';
	import CombatCharacter from '$lib/components/CombatCharacter/CombatCharacter.svelte';
	import { fly, slide } from 'svelte/transition';

	let { data } = $props();
	let characters = data.pageData.context.characters;
	let combatIndex = $state(data.pageData.combat_index);

	let currentCombatant = $derived(characters[combatIndex]);
	let upNext = $derived.by(() => {
		if (combatIndex === characters.length - 1) {
			return characters[0];
		}
		return characters[combatIndex + 1];
	});

	function nextHandler() {
		if (combatIndex === characters.length - 1) {
			combatIndex = 0;
		} else {
			combatIndex++;
		}
	}
</script>

<div class="container">
	<form method="POST" action="?/next" use:enhance>
		<input name="combat_index" value={combatIndex} hidden readonly type="text" />
		<button onclick={nextHandler} class="next">Next</button>
	</form>

	<h2>Up Now:</h2>
	<CombatCharacter {...currentCombatant} />

	<h2>Up Next:</h2>
	<CombatCharacter {...upNext} />

	<h2>All:</h2>
	{#each characters as { id, name, current_HP, max_HP, init, ac }}
		<CombatCharacter {id} {name} {current_HP} {max_HP} {init} {ac} />
	{/each}
</div>

<style>
	button {
		text-align: center;
	}
	.container {
		max-width: 768px;
		margin: 40px auto;
	}
	.next {
		float: right;
		background-color: brown;
		color: #fff;
		border: none;
		border-radius: 1rem;
		padding: 0.5rem 1rem;
		transition: 0.4s;
		transform: translate(0, -1rem);
		font-size: 1.6rem;
	}
	.next:hover {
		cursor: pointer;
		background-color: rgb(120, 30, 30);
	}
</style>
