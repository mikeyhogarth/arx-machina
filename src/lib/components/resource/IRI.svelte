<script lang="ts">
	import type { NamedNode } from 'n3';
	import store from '$lib/n3Store';
	import ARX from '$lib/nodes/arx';
	import RDFS from '$lib/nodes/rdfs';
	import { getName } from '$lib/util/n3Util';

	export let value: NamedNode;

	// Name can come from rdfs:label or arx:name
	$: name = [
		...$store.getObjects(value, ARX.name, null),
		...$store.getObjects(value, RDFS.label, null)
	];
</script>

{name[0]?.value || value.value}
