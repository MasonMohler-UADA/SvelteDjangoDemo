<script>
	import { enhance } from '$app/forms';

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
	<form method="POST" use:enhance>
		<input name="combat_index" value={combatIndex} hidden readonly type="text" />
		<button onclick={nextHandler} class="next">Next</button>
	</form>

	<h2>Up Now:</h2>
	<h2>{currentCombatant.name}</h2>
	<p>Current HP: {currentCombatant.current_HP}</p>
	<p>Max HP: {currentCombatant.max_HP}</p>
	<p>Initiative: {currentCombatant.init}</p>
	<p>AC: {currentCombatant.ac}</p>

	<h2>Up Next:</h2>
	<h2>{upNext.name}</h2>
	<p>Current HP: {upNext.current_HP}</p>
	<p>Max HP: {upNext.max_HP}</p>
	<p>Initiative: {upNext.init}</p>
	<p>AC: {upNext.ac}</p>

	<h2>All:</h2>
	{#each characters as { name, current_HP, max_HP, init, ac }}
		<h2>{name}</h2>
		<p>Current HP: {current_HP}</p>
		<p>Max HP: {max_HP}</p>
		<p>Initiative: {init}</p>
		<p>AC: {ac}</p>
	{/each}
</div>

<style>
	.container {
		max-width: 768px;
		margin: 40px auto;
	}
	.next {
		font-size: 2rem;
		float: right;
	}
</style>
