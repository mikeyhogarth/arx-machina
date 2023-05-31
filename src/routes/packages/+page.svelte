<script lang="ts">
	import { Heading } from '$lib/components';
	import packageStore from '$lib/stores/packages.store';

	let href: string;
	function addPackage() {
		packageStore.addPackage(href);
		href = '';
	}
</script>

<Heading text="Packages" />

<form on:submit={addPackage}>
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
	{#each $packageStore as { href }}
		<li>{href} <button on:click={() => packageStore.removePackage(href)}>remove</button></li>
	{/each}
</ul>
