<script lang="ts">
	import { Heading, Resource, ResourceProperty } from '$lib/components';
	import type { PageData } from './$types';
	import store from '$lib/n3Store';

	export let data: PageData;
	$: iri = data.iri;

	// State
	$: idea = store.getIdea(iri);
</script>

<Heading text={idea.name} />
{#if idea.description}
	<p>{idea.description}</p>
{/if}
<p>
	{#each idea.types as type}<Resource value={type} />{/each}
</p>

<div class="mt-6">
	<Heading text="Properties" el="h3" />
	<table class="w-full">
		<thead>
			<tr>
				<td>Property</td>
				<td>Value</td>
			</tr>
		</thead>
		<tbody>
			{#each idea.otherProperties as property (property)}
				<tr>
					<td><Resource value={property.predicate} link={false} /></td>
					<td><ResourceProperty resource={property.subject} property={property.predicate} /></td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
