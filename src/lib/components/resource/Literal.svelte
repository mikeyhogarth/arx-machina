<script lang="ts">
	import type { Literal } from 'n3';
	import { store as example } from '$lib/example';
	import { store as ontology } from '$lib/ontology';
	import ARX from '$lib/nodes/arx';
	import RDFS from '$lib/nodes/rdfs';
	export let value: Literal;
</script>

{value.value}
