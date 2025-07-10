<script lang="ts">
	let { sideNavItems = undefined, pagePathname } = $props();

	let storedNavState: boolean;
	let open = $state(true);

	// If localstorage entry exists, set our 'open' state based on that
	let localStorageValue = localStorage.getItem('sideNavOpen');
	if (localStorageValue === '0' || localStorageValue === '1') {
		storedNavState = !!Number(localStorageValue);
		open = storedNavState;
	}

	/**
	 * This effect runs when 'open' state changes. This ensures the "side effects" of updating the
	 * localstorage and shifting the <body> element back and forth happens in sync with
	 * changes to the 'open' state of the component
	 * */
	$effect(() => {
		storedNavState = open;
		localStorage.setItem('sideNavOpen', open ? '1' : '0');

		const body = document.querySelector('body');
		if (body) body.style.overflow = open ? 'hidden' : '';
		shiftBodyElement();
		// Prevents body shift transition from playing on refresh
		if (!body?.classList.contains('uada-side-nav-body-shift')) {
			addTransition();
		}
	});

	/**
	 * Function that adds and removes shifting class to the <body> element
	 * (the CSS class is defined with :global() tag at the bottom of this component)
	 * */
	function shiftBodyElement() {
		if (open) {
			document.body.classList.add('uada-side-nav-body-shift');
		} else {
			document.body.classList.remove('uada-side-nav-body-shift');
		}
	}

	// Adds a transition class to <body> element
	function addTransition() {
		document.body.classList.add('uada-side-nav-body-transition');
	}

	// Toggles the 'open' state of the component and updates
	function toggleOpen() {
		open = !open;
	}
</script>

<div class="uada-side-nav-root">
	<div class="uada-side-nav-container">
		<button
			class="uada-side-nav-trigger"
			class:closed={!open}
			aria-label={!open ? 'Close navigation menu.' : 'Open navigation menu.'}
			onclick={toggleOpen}
		>
			{#if open}
				<span>✖</span>
			{:else}
				<span>☰</span>
			{/if}
		</button>

		<nav class:closed={!open}>
			<div class="uada-side-nav-lists-container">
				<ul role="list">
					{#each sideNavItems as item}
						<li
							class="uada-side-nav-list-item"
							class:active={pagePathname === item.link}
							data-sveltekit-preload-data
						>
							<a
								class="uada-side-nav-item"
								tabindex={open ? 0 : -1}
								href={item.link}
								aria-current={pagePathname === item.link ? 'page' : null}
							>
								<span>{item.label}</span>
							</a>
						</li>
					{/each}
				</ul>
			</div>
		</nav>
	</div>
</div>

<style>
	.uada-side-nav-root {
		display: inline-block;
		height: 100%;
	}
	.uada-side-nav-container {
		position: absolute;
		left: 0;
	}

	.uada-side-nav-trigger {
		position: fixed;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50px;
		left: 250px;
		top: 20px;

		border: 0;
		color: #fff;
		line-height: 0;
		width: 46px;
		height: 46px;
		padding: 0;
		cursor: pointer;
		transition: transform 400ms ease;
		background: hsl(217, 7%, 23%);
		z-index: 1000000;
	}
	.uada-side-nav-trigger.closed {
		transform: translateX(-230px);
	}

	.uada-side-nav-trigger:focus-visible {
		outline: hsl(194, 58%, 55%) solid 3px;
		outline-offset: 1px;
	}

	.uada-side-nav-lists-container {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		overflow-y: auto;
		height: 100%;
		padding: 0 20px 0 0;
	}

	nav {
		position: fixed;

		display: flex;
		height: 100%;
		flex-direction: column;
		justify-content: flex-start;

		background: hsl(217, 9%, 17%);
		z-index: 600;

		padding: 0 0 120px 0;

		color: #fff;
		height: 100%;
		width: 275px;

		transition: transform 400ms ease;
		transform: translate(0);
	}
	nav.closed {
		transform: translate(-100%, 0);
	}

	ul {
		list-style-type: none;
		padding: 0;
		margin: 0;
		width: 100%;
	}

	li {
		font-size: 16px;
	}

	.uada-side-nav-list-item {
		display: flex;
		border-top-right-radius: 50px;
		border-bottom-right-radius: 50px;

		color: #fff;
		text-decoration: none;
		width: 100%;
		margin-bottom: 8px;
		gap: 10px;
		align-items: center;
	}
	.uada-side-nav-list-item:focus-visible {
		outline: hsl(194, 58%, 55%) solid 3px;
		outline-offset: 1px;
		background: hsl(351, 64%, 37%);
	}

	.uada-side-nav-list-item:hover {
		background: hsl(351, 64%, 42%);
	}

	.uada-side-nav-list-item.active {
		background: hsl(351, 64%, 42%);
		font-weight: bold;
	}

	.uada-side-nav-list-item.active:hover {
		background: hsl(351, 64%, 42%);
	}

	.uada-side-nav-item {
		display: flex;
		border-top-right-radius: 50px;
		border-bottom-right-radius: 50px;

		color: #fff;
		text-decoration: none;
		padding: 4px 28px;
		width: 100%;
		gap: 10px;
		align-items: center;
	}

	:global(.uada-side-nav-body-transition) {
		transition: margin-left 400ms ease;
	}

	:global(.uada-side-nav-body-shift) {
		margin-left: 275px;
	}
</style>
