<script lang="ts">
	import { Heading, Resource, ResourceProperty } from '$lib/components';
	import type { Term } from 'n3';
	import type { PageData } from './$types';
	import { store as example } from '$lib/example';
	import ARX from '$lib/nodes/arx';
	import RDF from '$lib/nodes/rdf';

	export let data: PageData;
	const iri: Term = data.iri;

	// Details
	const name = example.getObjects(iri, ARX.name, null)[0];
	const description = example.getObjects(iri, ARX.description, null)[0];
	const types = example.getObjects(iri, RDF.type, null);
	//const akaNames = names.slice(1);

	// Rest of properties
	const properties = example.getQuads(iri, null, null, null);
</script>

<Heading text={name.value} />
<p>{description.value}</p>
<p>
	Types: {#each types as type}<Resource value={type} />{/each}
</p>

<Heading text="Properties" el="h3" />
<table>
	<thead>
		<tr>
			<td>Property</td>
			<td>Value</td>
		</tr>
	</thead>
	<tbody>
		{#each properties as property}
			<tr>
				<td><Resource value={property.predicate} /></td>
				<td><ResourceProperty resource={property.subject} property={property.predicate} /></td>
			</tr>
		{/each}
	</tbody>
</table>
