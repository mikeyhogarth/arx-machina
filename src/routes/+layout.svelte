<script>
	import '../app.css';
	import { Header, Footer } from '$lib/components';
</script>

<div class="font-body m-auto max-w-6xl text-2xl">
	<Header />
	<main class="min-h-screen mt-4 px-6">
		<slot />
	</main>
	<Footer />
</div>
