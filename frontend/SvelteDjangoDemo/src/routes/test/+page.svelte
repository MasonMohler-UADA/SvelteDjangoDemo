<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { Draggable } from 'gsap/Draggable';

	gsap.registerPlugin(Draggable);

	let itemsList = $state([
		{ name: 'Red', color: 'red', textColor: 'white', highlighted: false },
		{ name: 'Blue', color: 'blue', textColor: 'white', highlighted: false },
		{ name: 'Green', color: 'green', textColor: 'white', highlighted: false },
		{ name: 'Purple', color: 'purple', textColor: 'white', highlighted: false },
		{ name: 'Yellow', color: 'yellow', textColor: 'black', highlighted: false },
		{ name: 'Orange', color: 'orange', textColor: 'black', highlighted: false },
		{ name: 'Aqua', color: 'aqua', textColor: 'black', highlighted: false }
	]);

	let bucketColor = 'bisque';
	let container: HTMLDivElement;
	let bucket: HTMLDivElement;

	onMount(() => {
		const items = Array.from(container.querySelectorAll('.item')) as HTMLDivElement[];

		Draggable.create(items, {
			bounds: container,
			onDrag: function () {
				const overBucket = this.hitTest(bucket, '5%');
				if (overBucket) {
					itemsList[items.indexOf(this.target)].highlighted = true;
				} else {
					itemsList[items.indexOf(this.target)].highlighted = false;
				}
			},
			onDragEnd: function () {
				itemsList[items.indexOf(this.target)].highlighted = false;

				const overBucket = this.hitTest(bucket, '5%');
				if (overBucket) {
					const index = items.indexOf(this.target);
					const droppedColor = itemsList[index].color;

					gsap.to(bucket, {
						backgroundColor: droppedColor,
						duration: 0.3,
						ease: 'power1.out'
					});

					gsap.fromTo(bucket, { scale: 1 }, { scale: 1.1, duration: 0.2, yoyo: true, repeat: 1 });
				}

				gsap.to(this.target, {
					x: 0,
					y: 0,
					duration: 1,
					ease: 'elastic.out(1, 0.75)'
				});
			}
		});
	});
</script>

<h2>Color Drop Test</h2>

<div class="container" bind:this={container}>
	<div class="items">
		{#each itemsList as item}
			<div
				class:highlight={item.highlighted}
				class="item"
				style="background-color: {item.color}; color:{item.textColor}"
			>
				{item.name}
			</div>
		{/each}
	</div>
	<div class="bucket" bind:this={bucket} style="background-color: {bucketColor};">
		Drop A Color Here!
	</div>
</div>

<style>
	.container {
		display: flex;
		align-items: flex-start;
		padding: 2rem;
		flex-wrap: wrap;
		height: 80vh;
	}

	.items {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.item {
		width: 100px;
		height: 100px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		font-weight: bold;
		border-radius: 1rem;
		cursor: grab;
		position: relative;
		z-index: 1;
		font-size: 1.2rem;
	}

	.highlight {
		outline: 5px solid #000;
	}

	.bucket {
		width: 300px;
		height: 300px;
		border: 5px solid black;
		border-radius: 1rem;
		display: flex;
		align-items: center;
		justify-content: center;
		align-self: flex-end;
		font-size: 1.5rem;
		font-weight: bold;
		padding: 1rem;
		text-align: center;
	}
</style>
