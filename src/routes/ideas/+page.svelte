<script lang="ts">
	import { Heading, Resource, ResourceProperty } from '$lib/components';
	import store from '$lib/n3Store';
	import { getAllIdeas } from '$lib/util/query';

	$: ideas = getAllIdeas($store);
</script>

<Heading text="Ideas" />
<table class="w-full mt-10">
	<thead class="border-b border-double border-black">
		<tr>
			<td>Name</td>
			<td>Description</td>
		</tr>
	</thead>
	{#each ideas as idea}
		<tr>
			<td><Resource value={idea.iri} /></td>
			<td>{idea.description}</td>
		</tr>
	{/each}
</table>
