<script>
	import { browser } from '$app/environment';
	import { invalidateAll } from '$app/navigation';

	if (browser) {
		invalidateAll();
	}
</script>
