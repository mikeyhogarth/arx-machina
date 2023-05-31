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

<nav class="py-2 my-2 px-6 border-y border-red-600">
	<ul>
		{#each navItems as { title, href }}
			<li class="inline-block mr-4"><a {href}>{title}</a></li>
		{/each}
	</ul>
</nav>
