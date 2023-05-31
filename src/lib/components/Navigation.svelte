<script lang="ts">
	const navItems: { title: string; href: string }[] = [
		{
			title: 'Locations',
			href: '/locations'
		},
		{
			title: 'Packages',
			href: '/packages'
		}
	];
</script>

<nav class="py-2 mt-2 mb-4 px-6 border-y-8 border-double border-red-600">
	<ul>
		{#each navItems as { title, href }}
			<li class="inline-block mr-4"><a {href}>{title}</a></li>
		{/each}
	</ul>
</nav>
