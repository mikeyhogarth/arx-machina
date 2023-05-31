<script lang="ts">
	import { Heading, Resource, ResourceProperty } from '$lib/components';
	import type { Term } from 'n3';
	import type { PageData } from './$types';
	import { store as example } from '$lib/example';
	import ARX from '$lib/nodes/arx';
	import RDF from '$lib/nodes/rdf';

	export let data: PageData;
	$: iri = data.iri;

	// Details
	$: name = example.getObjects(iri, ARX.name, null)[0]?.value;
	$: description = example.getObjects(iri, ARX.description, null)[0]?.value;
	$: types = example.getObjects(iri, RDF.type, null);

	// Rest of properties
	$: properties = example.getQuads(iri, null, null, null);
</script>

<Heading text={name} />
<p>{description}</p>
<p>
	{#each types as type}<Resource value={type} />{/each}
</p>

<div class="mt-6">
	<Heading text="Properties" el="h3" />
	<table class="w-full">
		<thead>
			<tr>
				<td>Property</td>
				<td>Value</td>
			</tr>
		</thead>
		<tbody>
			{#each properties as property (property)}
				<tr>
					<td><Resource value={property.predicate} link={false} /></td>
					<td><ResourceProperty resource={property.subject} property={property.predicate} /></td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
