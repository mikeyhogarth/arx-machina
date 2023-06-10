<script lang="ts">
	import type { NamedNode } from 'n3';
	import { Link } from '$lib/components';
	import store from '$lib/n3Store';

	export let value: NamedNode;
	export let link = false;

	$: name = store.getName(value);
</script>

{#if link}
	<Link href={`/ideas/${encodeURIComponent(value.value)}`}>
		{name}
	</Link>
{:else}
	{name}
{/if}
