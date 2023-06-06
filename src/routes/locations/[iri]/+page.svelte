<script lang="ts">
	import { Heading, Resource, ResourceProperty } from '$lib/components';
	import type { PageData } from './$types';
	import store from '$lib/n3Store';
	import ARX from '$lib/nodes/arx';
	import RDF from '$lib/nodes/rdf';

	import { getName } from '$lib/util/n3Util';

	export let data: PageData;
	$: iri = data.iri;

	// Details
	$: name = getName($store, iri);

	// Should the rest of these be abstracted away like the name is?
	$: description = $store.getObjects(iri, ARX.description, null)[0]?.value;
	$: types = $store.getObjects(iri, RDF.type, null);
	$: properties = $store.getQuads(iri, null, null, null);
</script>

<Heading text={name} />
{#if description}
	<p>{description}</p>
{/if}
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
