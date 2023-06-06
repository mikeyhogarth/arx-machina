<script lang="ts">
	import { Heading, Resource, ResourceProperty } from '$lib/components';
	import type { PageData } from './$types';
	import store from '$lib/n3Store';
	import ARX from '$lib/nodes/arx';
	import RDF from '$lib/nodes/rdf';

	export let data: PageData;
	$: iri = data.iri;

	// Details
	$: name = $store.getObjects(iri, ARX.name, null)[0]?.value;
	$: description = $store.getObjects(iri, ARX.description, null)[0]?.value;
	$: types = $store.getObjects(iri, RDF.type, null);

	// Rest of properties
	$: properties = $store.getQuads(iri, null, null, null);
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
