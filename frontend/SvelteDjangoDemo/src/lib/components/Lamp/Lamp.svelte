<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { Draggable } from 'gsap/Draggable';
	import { InertiaPlugin } from 'gsap/InertiaPlugin';

	gsap.registerPlugin(Draggable);

	let cord: HTMLDivElement;
	let cordBall: HTMLDivElement;
	let cordBallContainer: HTMLDivElement;
	let light: HTMLDivElement;
	let shade: HTMLDivElement;

	let lightOn = $state(false);

	onMount(() => {
		Draggable.create(cordBall, {
			bounds: cordBallContainer,
			type: 'y',
			onDrag: function () {
				let cordBallY = this.y;
				const cordHeight = 40 + cordBallY;
				gsap.set(cord, { height: cordHeight });
			},
			onDragEnd: function () {
				let cordBallY = this.y;
				if (!lightOn && cordBallY > 30) {
					gsap.to(light, {
						opacity: 100,
						duration: 0.2,
						ease: 'power1.out'
					});
					gsap.to(shade, {
						backgroundColor: '#ffd764',
						duration: 0.3,
						ease: 'power1.out'
					});
					lightOn = true;
				} else if (lightOn && cordBallY > 30) {
					gsap.to(light, {
						opacity: 0,
						duration: 0.01,
						ease: 'power1.out'
					});
					gsap.to(shade, {
						backgroundColor: '#bbb',
						duration: 0.5,
						ease: 'power1.out'
					});
					lightOn = false;
				}
				gsap.to(this.target, {
					x: 0,
					y: 0,
					duration: 1,
					ease: 'elastic.out(1, 0.5)'
				});
				gsap.to(cord, {
					height: 40,
					rotation: 0,
					duration: 1,
					ease: 'elastic.out(1, 0.5)'
				});
			}
		});
	});
</script>

<div class="background">
	<div class="floor-lamp">
		<div class="base"></div>
		<div class="pole"></div>
		<div bind:this={shade} class="shade">
			<div bind:this={light} class="light"></div>
		</div>
		<div bind:this={cord} class="cord">
			<div bind:this={cordBallContainer} class="cordBallContainer">
				<div bind:this={cordBall} class="cord-ball"></div>
			</div>
		</div>
	</div>
	{#if lightOn}
		<h2 class="on">The light is on!</h2>
	{:else}
		<h2 class="off">The light is off.</h2>
	{/if}
</div>

<style>
	.background {
		width: 100vw;
		height: 100vh;
		background-color: #000;
		position: absolute;
		top: 0;
		left: 0;
	}
	.on {
		color: #ffd764;
		position: absolute;
		top: 300px;
		right: 980px;
		width: 250px;
		text-shadow: 0px 0px 0.25rem #ffd764;
	}
	.off {
		color: #c6c6c66c;
		position: absolute;
		top: 300px;
		right: 980px;
		width: 250px;
	}
	.floor-lamp {
		position: relative;
		width: 120px;
		height: 300px;
		margin: 100px auto;
	}

	.base {
		width: 100px;
		height: 20px;
		background: #444;
		border-radius: 50%;
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
	}

	.pole {
		width: 8px;
		height: 247.5px;
		background: #666;
		position: absolute;
		bottom: 12.5px;
		left: 50%;
		transform: translateX(-50%);
		z-index: 100;
		border-radius: 0rem 0rem 0.25rem 0.25rem;
	}

	.shade {
		width: 120px;
		height: 60px;
		background-color: #bbb;
		border-radius: 60px 60px 10px 10px;
		position: absolute;
		bottom: 260px;
		left: 50%;
		transform: translateX(-50%);
		box-shadow: 0 0 30px rgba(255, 223, 100, 0); /* light off */
		transition: box-shadow 0.3s ease;
	}

	.light {
		position: absolute;
		bottom: -30px;
		left: 50%;
		transform: translateX(-50%);
		width: 120px;
		height: 90px;
		background: radial-gradient(circle, #ffd764 0%, transparent 70%);
		opacity: 0;
		transition: opacity 0.3s ease;
		z-index: -100;
	}

	.cord {
		width: 2px;
		height: 40px;
		background: #999;
		position: absolute;
		top: 40px;
		left: 65%;
		transform: translateX(-50%);
	}
	.cord-ball {
		width: 12px;
		height: 12px;
		background: #666;
		border-radius: 50%;
		position: absolute;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
	}
	.cord-ball:hover {
		z-index: 1000;
	}
	.cordBallContainer {
		height: 60px;
		width: 40px;
		border-radius: 50%;
		position: absolute;
		top: 40px;
		left: 50%;
		transform: translateX(-50%);
	}
</style>
