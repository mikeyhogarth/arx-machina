<script lang="ts">
	import { Heading, Resource, ResourceProperty } from '$lib/components';
	import type { PageData } from './$types';
	import store from '$lib/n3Store';
	import { getIdea, otherProperties } from '$lib/util/query';

	export let data: PageData;
	$: iri = data.iri;

	// State
	$: idea = getIdea($store, iri);
</script>

<Heading text={idea.name} />

{#if idea.flavourText}
	<p class="p-4 bg-orange-200 italic my-2 border border-orange-400">{idea.flavourText}</p>
{/if}

{#if idea.description}
	<p>{idea.description}</p>
{/if}

<p>
	{#each idea.types as type}<Resource value={type} />{/each}
</p>
{#if idea.otherProperties.length > 0}
	<div class="mt-6">
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
{/if}
