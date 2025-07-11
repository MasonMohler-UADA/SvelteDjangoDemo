<script>
	let { current_HP, max_HP } = $props();
	let healthBar = Math.round((current_HP / max_HP) * 100);
</script>

<div class="container">
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
</div>

<style>
	.container {
		width: 100%;
	}
	.healthBar {
		content: '';
		height: 20px;
		width: 100%;
		padding: 0.1rem 0;
		border-radius: 0.5rem;
		margin-top: 1rem;
	}
</style>
