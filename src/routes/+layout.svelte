<script>
	import '../app.css';
	import { Header } from '$lib/components';
</script>

<div class="font-body m-auto max-w-6xl text-3xl">
	<Header />
	<main class="min-h-screen mt-4">
		<slot />
	</main>
	<footer>&copy; Mikey</footer>
</div>
