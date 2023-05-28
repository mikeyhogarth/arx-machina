<script lang="ts">
	const navItems: { title: string; href: string }[] = [
		{
			title: 'Locations',
			href: '/ideas/locations'
		},
		{
			title: 'Characters',
			href: '/ideas/characters'
		},
		{
			title: 'Creatures',
			href: '/ideas/creatures'
		},
		{
			title: 'Visions',
			href: '/visions'
		}
	];
</script>

<nav class="py-2 my-2 border-y border-red-600">
	<ul>
		{#each navItems as { title, href }}
			<li class="inline-block mr-4"><a {href}>{title}</a></li>
		{/each}
	</ul>
</nav>
