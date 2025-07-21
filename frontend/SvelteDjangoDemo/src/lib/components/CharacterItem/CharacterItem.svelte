<script lang="ts">
	let { id, name, isSelected } = $props();
</script>

<div class="characterOption" class:selected={isSelected}>
	<h4>
		{name}
	</h4>
	{#if isSelected}
		<label>Initiative: <input type="text" name="initiative-{id}" /></label>
	{/if}
</div>

<style>
	.characterOption {
		display: flex;
		justify-content: space-between;
		width: 100%;
		padding: 1rem;
		height: 65px;
		align-items: center;
	}
	.characterOption:hover {
		background-color: #e0e0e0;
		cursor: pointer;
	}
	h4 {
		font-size: 1.2rem;
		margin: 0;
	}
	.selected {
		background-color: #c6c6c6;
	}
	label {
		font-size: 1rem;
	}
	input {
		width: 50px;
		padding: 0.25rem;
		border: none;
		background-color: #fff;
		border-radius: 0.5rem;
		border: 3px solid #c6c6c6;
		transition: 0.3s;
	}
	input:hover {
		border: 3px solid #000;
	}

	input:focus {
		outline: none;
		border: 3px solid #000;
	}
</style>
