<script lang="ts">
	import Navbar from "$Components/Navbar.svelte";
	import Footer from "$Components/Footer.svelte";
	import type { PageData } from "./$types";
	export let data: PageData;
</script>

<Navbar {data} />

<main>
	<slot />
</main>

<Footer />
