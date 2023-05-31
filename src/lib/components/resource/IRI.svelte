<script lang="ts">
	import type { NamedNode } from 'n3';
	import { store as example } from '$lib/example';
	import { store as ontology } from '$lib/ontology';
	import ARX from '$lib/nodes/arx';
	import RDFS from '$lib/nodes/rdfs';
	export let value: NamedNode;

	// Name can come from rdfs:label or arx:name
	const name = [
		...example.getObjects(value, ARX.name, null),
		...ontology.getObjects(value, RDFS.label, null)
	];
</script>

{name[0]?.value || value.value}
