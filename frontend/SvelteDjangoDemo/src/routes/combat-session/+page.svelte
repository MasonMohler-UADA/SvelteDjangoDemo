<script>
	import { enhance } from '$app/forms';
	import { page } from '$app/state';
	let { data } = $props();

	let mostRecent = $derived.by(() => {
		return data.pageData[data.pageData.length - 1];
	});
</script>

<h2>Most Recent Session:</h2>
<ul>
	<li>
		<a href="{page.url.pathname}/{mostRecent.id}">{mostRecent.name}</a>
	</li>
</ul>

<h2 class="subheading">All Sessions:</h2>
<div class="scrolling-list">
	<ul>
		{#each data.pageData as { id, name }}
			<form use:enhance method="POST" action="?/deleteSession">
				<li>
					<a href="{page.url.pathname}/{id}">{name}</a>
				</li>
				<input name="sessionID" hidden readonly value={id} type="text" />
				<button>Delete</button>
			</form>
		{/each}
	</ul>
</div>

<style>
	h2 {
		font-size: 2rem;
	}
	.subheading {
		margin-top: 3rem;
	}
	ul {
		margin: 0;
		padding: 0;
	}
	li {
		border: none;
		padding: 1rem;
		background-color: brown;
		border-radius: 1rem;
		color: #fff;
		font-size: 1.2rem;
		font-family: 'Courier New', Courier, monospace;
		transition: 0.4s;
		margin-top: 1rem;
		font-size: 1.6rem;
	}
	li:hover {
		cursor: pointer;
		background-color: rgb(120, 30, 30);
	}
	li a {
		text-decoration: none;
		color: #fff;
		text-transform: capitalize;
		display: block;
	}
	.scrolling-list {
		height: 70vh;
		overflow-y: scroll;
	}
</style>
