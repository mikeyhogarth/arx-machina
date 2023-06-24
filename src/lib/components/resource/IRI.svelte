<script lang="ts">
	import type { NamedNode } from 'n3';
	import { Link } from '$lib/components';
	import store from '$lib/n3Store';
	import { getName } from '$lib/util/query';

	export let value: NamedNode;
	export let link = false;

	$: name = getName($store, value);
</script>

{#if link}
	<Link href={`/ideas/${encodeURIComponent(value.value)}`}>
		{name}
	</Link>
{:else}
	{name}
{/if}
