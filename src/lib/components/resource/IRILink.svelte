<script lang="ts">
	import type { NamedNode } from 'n3';
	import { Link } from '$lib/components';
	import IRI from './IRI.svelte';

	export let value: NamedNode;
</script>

<Link href={`/locations/${encodeURIComponent(value.value)}`}>
	<IRI {value} />
</Link>
