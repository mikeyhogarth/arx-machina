<script lang="ts">
	import type { Term } from 'n3';
	import { Link } from '$lib/components';
	import { store as example } from '$lib/example';
	import { store as ontology } from '$lib/ontology';
	import ARX from '$lib/nodes/arx';
	import RDFS from '$lib/nodes/rdfs';
	export let resource: Term;

	export let link = true;

	const name = [
		...example.getObjects(resource, ARX.name, null),
		...ontology.getObjects(resource, RDFS.label, null)
	];
</script>

{#if resource.termType == 'NamedNode'}
	{#if link}
		<Link href={`/locations/detail?iri=${encodeURIComponent(resource.value)}`}
			>{name[0]?.value || resource.value}</Link
		>
	{:else}
		{name[0]?.value || resource.value}
	{/if}
{:else if resource.termType == 'Literal'}
	{resource.value}
{/if}
