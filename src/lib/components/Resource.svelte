<script lang="ts">
	import type { Term } from 'n3';
	import { Literal, IRI } from './resource';

	export let value: Term;
	export let link = true;
</script>

{#if value.termType == 'NamedNode'}
	<IRI {value} {link} />
{:else if value.termType == 'Literal'}
	<Literal {value} />
{/if}
