<script lang="ts">
	import { Heading, Resource, ResourceProperty } from '$lib/components';
	import { store as example } from '$lib/example';
	import ARX from '$lib/nodes/arx';
	import RDF from '$lib/nodes/rdf';

	const locations = example.getSubjects(RDF.type, ARX.Location, null);
</script>

<Heading text="Locations" />
<table class="w-full mt-10">
	<thead class="border-b border-double border-black">
		<tr>
			<td>Name</td>
			<td>Description</td>
		</tr>
	</thead>
	{#each locations as location}
		<tr>
			<td><Resource resource={location} /></td>
			<td><ResourceProperty resource={location} property={ARX.description} /></td>
		</tr>
	{/each}
</table>
