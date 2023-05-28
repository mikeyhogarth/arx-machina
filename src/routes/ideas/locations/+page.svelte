<script lang="ts">
	import { NamedNode, type Term } from 'n3';
	import { Heading } from '$lib/components';
	import { store as example } from '$lib/example';
	import { store as ontology } from '$lib/ontology';
	import RDF from '$lib/nodes/rdf';
	import ARX from '$lib/nodes/arx';
	example.addQuads([...ontology]);

	const locations = example.match(null, RDF.type, ARX.Location);
</script>

<Heading text="Locations" />
<p>This is just a test page</p>

<Heading text="Quads" el="h3" />

<p>Store contains {example.size} quads.</p>
<table>
	{#each [...locations] as quad}
		<tr>
			<td>{quad.subject.value}</td> <td> {quad.predicate.value}</td><td> {quad.object.value}</td><td
			>
				{quad.graph.value}</td
			>
		</tr>
	{/each}
</table>
