<script>
	import { page } from '$app/state';
	let { data } = $props();
</script>

<ul>
	{#each data.pageData as { id, name }}
		<li>
			<a href="{page.url.pathname}/{id}">{name}</a>
		</li>
	{/each}
</ul>
