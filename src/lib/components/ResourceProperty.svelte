<script lang="ts">
	import type { Term } from 'n3';
	import { Resource } from '$lib/components';
	import store from '$lib/n3Store';
	export let resource: Term;
	export let property: Term;

	$: values = $store.getObjects(resource, property, null);
</script>

{#each values as value}
	<Resource {value} />
{/each}
