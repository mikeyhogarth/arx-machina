<script lang="ts">
	import { Heading } from '$lib/components';
	import visionStore from '$lib/stores/visions.store';

	let href: string;
	function addVision() {
		visionStore.addVision(href);
		href = '';
	}
</script>

<Heading text="Visions" />

<form on:submit={addVision}>
	<label for="href">Href</label>
	<input
		type="text"
		class="border w-full"
		placeholder="http://www.example.com/"
		bind:value={href}
	/>
	<input type="submit" />
</form>

<ul>
	{#each $visionStore as { href }}
		<li>{href} <button on:click={() => visionStore.removeVision(href)}>remove</button></li>
	{/each}
</ul>
