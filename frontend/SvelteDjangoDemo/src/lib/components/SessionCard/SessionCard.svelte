<script>
	import { enhance } from '$app/forms';
	import { page } from '$app/state';
	let { id, name } = $props();
</script>

<form use:enhance method="POST" action="?/deleteSession">
	<div class="left"><h3>{name}</h3></div>
	<div class="right">
		<a href="/combat-session/{id}/" class="open" type="button">Open</a>
		<input name="sessionID" hidden readonly value={id} type="text" />
		<button class="delete">Delete</button>
	</div>
</form>

<style>
	form {
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
	h3 {
		font-size: 1.4rem;
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
	.delete {
		background-color: #fff;
		color: brown;
	}
	.delete:hover {
		background-color: #e0e0e0;
		color: red;
	}
	.open {
		color: #fff;
		background-color: brown;
		text-decoration: none;
		padding: 1rem;
		border-radius: 1rem;
		transition: 0.4s;
	}
	.open:hover {
		background-color: rgb(121, 31, 31);
	}
</style>
