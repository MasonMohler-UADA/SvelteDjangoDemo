<script>
	import { fly, slide } from 'svelte/transition';
	import EditButton from '../EditButton/EditButton.svelte';
	import HealthBar from '../HealthBar/HealthBar.svelte';

	let { id, name, current_HP, max_HP, ac, init } = $props();
</script>

<div class="characterCard">
	<h2>{name}</h2>
	<div class="stats">
		<p class="stat">
			<strong>HP:</strong>
			{current_HP} / {max_HP}
		</p>
		<p class="stat"><strong>AC:</strong> {ac}</p>
		<p class="stat"><strong>Intiative:</strong> {init}</p>
	</div>
	<EditButton {id} {current_HP} />
	<HealthBar {current_HP} {max_HP} />
</div>

<style>
	.characterCard {
		width: 100%;
		min-width: 660px;
		border-radius: 1rem;
		padding: 2rem;
		box-shadow: 0px 0px 1rem #c6c6c6;
		margin-bottom: 2rem;
	}
	h2 {
		font-size: 2rem;
		margin-top: 0;
	}
	p {
		font-size: 1.4rem;
		display: inline;
		margin-right: 2rem;
	}
</style>
