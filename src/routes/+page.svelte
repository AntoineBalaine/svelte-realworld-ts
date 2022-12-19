<script lang="ts">
	import ArticlePreview from "../components/ArticlePreview.svelte";
	import Home from "../components/Home.svelte";
	import type { PageData } from "./$types";
	export let data: PageData;
</script>

<svelte:head>
	<title>Conduit</title>
</svelte:head>
<Home {data}>
	{#each data.articles as article}
		<ArticlePreview {article} />
	{/each}
</Home>
