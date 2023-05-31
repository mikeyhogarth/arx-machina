<script lang="ts">
	import type { Term } from 'n3';
	import { Literal, IRI, IRILink } from './resource';

	export let value: Term;
	export let link = true;
</script>

{#if value.termType == 'NamedNode'}
	{#if link}
		<IRILink {value} />
	{:else}
		<IRI {value} />
	{/if}
{:else if value.termType == 'Literal'}
	<Literal {value} />
{/if}
