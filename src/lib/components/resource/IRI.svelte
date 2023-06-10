<script lang="ts">
	import type { NamedNode } from 'n3';
	import { getName } from '$lib/util/n3Util';
	import { Link } from '$lib/components';
	import store from '$lib/n3Store';

	export let value: NamedNode;
	export let link = false;

	$: name = getName($store, value);
</script>

{#if link}
	<Link href={`/locations/${encodeURIComponent(value.value)}`}>
		{name}
	</Link>
{:else}
	{name}
{/if}
