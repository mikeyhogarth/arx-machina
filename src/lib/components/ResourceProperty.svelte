<script lang="ts">
	import type { Term } from 'n3';
	import { Resource } from '$lib/components';
	import { store as example } from '$lib/example';
	export let resource: Term;
	export let property: Term;

	const values = example.getObjects(resource, property, null);
</script>

{#each values as value}
	<Resource resource={value} />
{/each}
