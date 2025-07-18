<script lang="ts">
	import { enhance } from '$app/forms';
	import { fly, scale, slide } from 'svelte/transition';
	import type { CharacterCardProps } from './types';

	let { id, name, current_HP, max_HP, ac, character_class, level }: CharacterCardProps = $props();

	let expanded = $state(false);
	let showActions = $state(false);

	function toggleCard() {
		expanded = !expanded;
	}
	function toggleActions() {
		showActions = !showActions;
	}
</script>

<div class="container">
	{#if !expanded}
		<form method="POST" use:enhance action="?/delete">
			<fieldset class="closed">
				<div class="left">
					<h3>{name}</h3>
					<p>Level {level} {character_class}</p>
				</div>
				<div class="right">
					<button class="view" type="button" onclick={toggleCard}>View</button>
					<input type="number" name="id" hidden readonly value={id} />
					<button class="delete">Delete</button>
				</div>
			</fieldset>
		</form>
	{:else}
		<div transition:slide class="expandedCard">
			<form id="edit" method="POST" action="?/editCharacter">
				<fieldset class="expanded">
					<input type="number" name="id" hidden readonly value={id} />
					<div class="info">
						<h2>{name}</h2>
						<p class="stats"><strong>Class:</strong> {character_class}</p>
						<p class="stats"><strong>Level:</strong> {level}</p>
						<p class="stats"><strong>AC:</strong> {ac}</p>
						<p class="stats"><strong>HP:</strong> {current_HP} / {max_HP}</p>
					</div>
					<div class="buttons">
						<button type="button" onclick={toggleCard}>Close</button>
						<button class="actions" type="button" onclick={toggleActions}>Actions</button>
					</div>
				</fieldset>
			</form>
			{#if showActions}
				<div transition:slide class="actionsContainer">
					<button class="editButton" form="edit">Edit</button>
					<form action="?/delete" method="POST">
						<input type="number" name="id" hidden readonly value={id} />
						<button class="deleteButton">Delete</button>
					</form>
				</div>
			{/if}
		</div>
	{/if}
</div>

<style>
	/* .container {
		height: 316px;
		overflow-y: hidden;
	} */
	.actionsContainer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 0.75rem;
		width: 95px;
		border-radius: 1rem;
		background-color: #e0e0e0;
		padding: 0.5rem;
		padding-top: 3.2rem;
		font-size: 0.9rem;
		float: right;
		transform: translate(-1rem, -12.5rem);
	}
	.actions {
		z-index: 100;
	}
	.editButton,
	.deleteButton {
		width: 100%;
	}
	.closed {
		border: none;
		border-radius: 1rem;
		box-shadow: 0px 0px 1rem #c6c6c6;
		padding: 1.2rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 400px;
		height: 95px;
		background-color: #fff;
	}
	.expandedCard {
		border-radius: 1rem;
		box-shadow: 0px 0px 1rem #c6c6c6;
		padding: 1.4rem;
		gap: 1rem;
		width: 400px;
		height: 316px;
		background-color: #fff;
		margin: 0;
		height: 316px;
		overflow-y: hidden;
	}
	.expanded {
		border: none;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.buttons {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		gap: 1rem;
		height: 3rem;
	}
	.info {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 264px;
	}
	h2 {
		font-size: 2.4rem;
		margin: 0;
	}
	h3 {
		font-size: 2rem;
		margin: 0;
		padding: 0;
		margin-bottom: 0.5rem;
	}
	p {
		color: #a0a0a0;
		margin: 0;
		padding: 0;
	}
	button {
		border: none;
		padding: 1rem;
		border-radius: 1rem;
		transition: 0.4s;
	}
	button:hover {
		cursor: pointer;
	}
	.view {
		color: #fff;
		background-color: brown;
	}
	.view:hover {
		background-color: rgb(121, 31, 31);
	}
	.delete {
		background-color: #fff;
		color: brown;
	}
	.delete:hover {
		background-color: #e0e0e0;
		color: red;
	}
	.stats {
		color: #000;
		font-size: 1.6rem;
	}
</style>
