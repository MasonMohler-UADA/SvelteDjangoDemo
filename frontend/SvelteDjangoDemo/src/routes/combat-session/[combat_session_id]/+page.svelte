<script>
    let {data} = $props();
    let characters = data.pageData.context.characters;
</script>

{#each characters as {name, current_HP, max_HP, init, ac}}
    <h2>{name}</h2>
    <p>Current HP: {current_HP}</p>
    <p>Max HP: {max_HP}</p>
    <p>Initiative: {init}</p>
    <p>AC: {ac}</p>
{/each}