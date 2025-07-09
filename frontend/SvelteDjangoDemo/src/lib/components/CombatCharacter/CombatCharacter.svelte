<script>
	import { fly, slide } from 'svelte/transition';

	let { id, name, currentHP, maxHP, ac, init, player } = $props();

	let healthBar = Math.round((currentHP / maxHP) * 100);

	let showForm = $state(false);
	let selectOpen = $state(false);
	let selectedOption = $state('damage');
	let selectedLabel = $state('Damage');

	const options = [
		{ value: 'damage', label: 'Damage' },
		{ value: 'heal', label: 'Heal' }
	];

	function toggleForm() {
		showForm = !showForm;
		if (!showForm) {
			selectOpen = false;
		}
	}

	function toggleSelect() {
		selectOpen = !selectOpen;
	}

	function selectOption(option) {
		selectedOption = option.value;
		selectedLabel = option.label;
		selectOpen = false;
	}

	function handleClickOutside(event) {
		if (!event.target.closest('.custom-select')) {
			selectOpen = false;
		}
	}
</script>

<svelte:window on:click={handleClickOutside} />

<form data-sveltekit-noscroll method="POST" action="?/edit">
	<fieldset class="characterCard">
		<div class="container">
			<input hidden name="id" type="number" value={id} />
			<input hidden name="currentHP" type="number" value={currentHP} />
			<input hidden name="updateOptions" value={selectedOption} />
			{#if !player}
				<h2 style:color="red">{name}</h2>
			{:else}
				<h2>{name}</h2>
			{/if}
			<p class="stat">
				<strong>HP:</strong>
				{currentHP} / {maxHP}
			</p>
			<p class="stat"><strong>AC:</strong> {ac}</p>
			<p class="stat"><strong>Intiative:</strong> {init}</p>

			<button class="formOpener" type="button" onclick={toggleForm}>
				{#if !showForm}
					✏️
				{:else}
					✖
				{/if}
			</button>
			{#if healthBar >= 80}
				<div
					style:background="linear-gradient(0.25turn, green {healthBar}%, #c6c6c640 {healthBar}%)"
					class="healthBar"
				></div>
			{/if}
			{#if healthBar >= 40 && healthBar < 80}
				<div
					style:background="linear-gradient(0.25turn, yellow {healthBar}%, #c6c6c640 {healthBar}%)"
					class="healthBar"
				></div>
			{/if}
			{#if healthBar < 40}
				<div
					style:background="linear-gradient(0.25turn, red {healthBar}%, #c6c6c640 {healthBar}%)"
					class="healthBar"
				></div>
			{/if}
			{#if showForm}
				<div class="updateForm">
					<input
						transition:fly={{ x: 200, duration: 750 }}
						class="updateField"
						name="updateField"
						type="number"
						placeholder="e.g. 18"
					/>

					<div class="custom-select" transition:fly={{ x: 100, duration: 750 }}>
						<button
							type="button"
							class="select-button"
							class:open={selectOpen}
							onclick={toggleSelect}
						>
							<span>{selectedLabel}</span>
							<span class="arrow" class:up={selectOpen}>▼</span>
						</button>

						{#if selectOpen}
							<div class="options-container" transition:slide={{ duration: 200 }}>
								{#each options as option}
									<button
										type="button"
										class="option"
										class:selected={option.value === selectedOption}
										onclick={() => selectOption(option)}
									>
										{option.label}
									</button>
								{/each}
							</div>
						{/if}
					</div>

					<button transition:fly={{ x: 50, duration: 750 }} onclick={toggleForm} class="formButton"
						>Update</button
					>
				</div>
			{/if}
		</div>
	</fieldset>
</form>

<style>
	.container {
		width: 100%;
	}
	button {
		transform: translate(0, -4rem) rotate(0deg);
		padding: 0.5rem;
		border: none;
		background-color: #fff;
		border-radius: 0.5rem;
		border: 3px solid #c6c6c6;
		transition: 0.3s;
		font-size: 1rem;
	}
	button:hover {
		cursor: pointer;
		transform: translate(0, -4rem) rotate(6deg);
		border: 3px solid #000;
	}
	.updateForm {
		float: right;
		transform: translate(-3.5rem, -7.95rem);
		height: 0px;
	}
	.formButton {
		transform: translate(0);
	}
	.formButton:hover {
		transform: none;
	}
	.custom-select {
		position: relative;
		display: inline-block;
		z-index: 10;
		background-color: #fff;
	}

	.select-button {
		transform: translate(0) !important;
		padding: 0.5rem;
		border: none;
		background-color: #fff;
		border-radius: 0.5rem;
		border: 3px solid #c6c6c6;
		transition: 0.3s;
		font-size: 1rem;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100px;
		gap: 0.5rem;
	}

	.select-button:hover,
	.select-button.open {
		border: 3px solid #000;
	}

	.select-button:hover {
		transform: translate(0) !important;
	}

	.arrow {
		transition: transform 0.3s ease;
		font-size: 0.8em;
	}

	.arrow.up {
		transform: rotate(180deg);
	}

	.options-container {
		position: absolute;
		top: 85%;
		left: 0;
		right: 0;
		background-color: #fff;
		z-index: -10;
		border: 3px solid #000;
		border-radius: 0 0 0.5rem 0.5rem;
		overflow: hidden;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	}

	.option {
		display: block;
		width: 100%;
		padding: 0.75rem 0.5rem;
		border: none;
		background-color: #fff;
		font-size: 1rem;
		cursor: pointer;
		text-align: left;
		transition: background-color 0.2s ease;
		transform: none !important;
		border-radius: 0px !important;
	}

	.option:hover {
		border: none;
		background-color: #f0f0f0;
		transform: none !important;
	}

	.option:not(:last-child) {
		border-bottom: 2px solid #e0e0e0;
	}
	form {
		margin: auto;
		width: auto;
		min-width: 660px;
	}
	.healthBar {
		content: '';
		height: 20px;
		width: 100%;
		padding: 0.1rem 0;
		border-radius: 0.5rem;
		margin-top: 1rem;
	}
	fieldset {
		border: none;
		border-radius: 1rem;
		padding: 2rem;
		display: flex;
		flex-direction: row;
		justify-content: center;
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

	.updateField {
		transform: translate(0);
		padding: 0.5rem;
		border: none;
		background-color: #fff;
		border-radius: 0.5rem;
		border: 3px solid #c6c6c6;
		transition: 0.3s;
		font-size: 1rem;
		width: 50px;
	}

	.updateField:hover {
		border: 3px solid #000;
	}

	.updateField:focus {
		outline: none;
		border: 3px solid #000;
	}

	/* Remove number input spinner arrows */
	.updateField::-webkit-outer-spin-button,
	.updateField::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	.formOpener {
		width: 45px;
		height: auto;
		text-align: center;
		float: right;
	}
</style>
