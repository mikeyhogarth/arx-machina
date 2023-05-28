<script lang="ts">
	import clsx from 'clsx';

	// Props
	export let text: string;
	export let el: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' = 'h2';

	// State
	export let classes = {
		h1: 'text-6xl',
		h2: 'text-5xl',
		h3: 'text-4xl',
		h4: 'text-3xl',
		h5: 'text-2xl'
	};
</script>

<svelte:element this={el} class={clsx(classes[el])}>{text}</svelte:element>
