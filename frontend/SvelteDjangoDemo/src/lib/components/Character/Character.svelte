<script lang="ts">
	import type { CharacterProps } from './types';

	let { id, name, current_HP, max_HP, ac, isSelected = false }: CharacterProps = $props();
</script>

<div class="characterCard" class:selected={isSelected}>
	<input hidden name="id" type="number" value={id} />
	<h2>{name}</h2>
	<p><strong>HP:</strong> {current_HP} / {max_HP}</p>
	<p><strong>AC:</strong> {ac}</p>
</div>

<style>
	div {
		border: none;
		border-radius: 1rem;
		box-shadow: 0 0 2rem #c6c6c6;
		padding: 2rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		min-width: 150px;
		min-height: 180px;
		font-family: 'Courier New', Courier, monospace;
		max-width: 300px;
	}
	/* .characterCard {
		transition: 0.3s ease-in-out;
		cursor: pointer;
	}
	.characterCard:hover {
		transform: scale(1.05) rotate(2deg);
	}
	.characterCard.selected {
		transform: scale(1.05) translate(0, -10px);
		background-color: #c6c6c6;
		animation: wiggle 0.4s;
	} */
	.characterCard {
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		transform-origin: center;
		position: relative;
		min-width: 150px;
		min-height: 180px;
	}

	.characterCard:hover {
		cursor: pointer;
		transform: scale(1.05) rotate(2deg);
	}

	.characterCard:hover:not(.selected) {
		box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
		z-index: 10;
	}

	.characterCard.selected {
		transform: scale(1.02) rotate(0deg);
		z-index: 20;
		background-color: #c6c6c6;
		animation: selectWiggle 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	@keyframes selectWiggle {
		0% {
			transform: scale(1.05) rotate(2deg);
		}
		30% {
			transform: scale(1.06) rotate(-1.5deg);
		}
		60% {
			transform: scale(1.04) rotate(0.5deg);
		}
		80% {
			transform: scale(1.025) rotate(-0.2deg);
		}
		100% {
			transform: scale(1.02) rotate(0deg);
		}
	}

	.characterCard.selected::after {
		content: '';
		position: absolute;
		top: -2px;
		left: -2px;
		right: -2px;
		bottom: -2px;
		background-color: #848484;
		border-radius: inherit;
		z-index: -1;
		animation: selectedPulse 2s ease-in-out infinite;
	}

	@keyframes selectedPulse {
		0%,
		100% {
			opacity: 0.5;
			transform: scale(1);
		}
		50% {
			opacity: 0.8;
			transform: scale(1.01);
		}
	}

	h2 {
		font-size: 1.8rem;
		margin-top: 0;
	}
	p {
		font-size: 1.2rem;
		width: 140px;
	}
</style>
