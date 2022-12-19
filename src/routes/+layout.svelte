<script lang="ts">
	import Navbar from "../Components/Navbar.svelte";
	import Footer from "../Components/Footer.svelte";
</script>

<Navbar />

<main>
	<slot />
</main>

<Footer />
