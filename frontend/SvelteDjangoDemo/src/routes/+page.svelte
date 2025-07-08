<script>
	let { data } = $props();
</script>

<ul>
	{#each data.pageData as character}
		<li>{character.name}</li>
	{/each}
</ul>

<form method="POST">
	<fieldset>
		<legend>Choose your characters:</legend>
		{#each data.pageData as character}
			<label
				><input name="character_ids" type="checkbox" value={character.id} />{character.name}</label
			>
                <label>Enter initiative: <input name="initiative" type="text"></label>
            <br>
		{/each}
		<br />
		<label for="name">Enter Session Name: <input name="name" id="name" type="text" /></label>
	</fieldset>
	<button>Create Combat Session</button>
</form>
