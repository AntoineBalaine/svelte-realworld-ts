<script lang="ts">
	import ArticlePreview from "$Components/ArticlePreview.svelte";
	import { navigating } from "$app/stores";
	import Home from "$Components/Home.svelte";
	import type { PageData } from "./$types";
	export let data: PageData;
	import { page } from "$app/stores";

	import { store } from "$store";

	import Loading from "$Components/Loading.svelte";
	import Pagination from "$Components/Pagination.svelte";
	store.set({ ...data });

	$: tag = $page.url.searchParams.get("tag");
	$: articles = !!tag
		? data.articles.filter((article) => {
				return !!tag && article.tagList.includes(tag);
		  })
		: data.articles;
</script>

<svelte:head>
	<title>Conduit</title>
</svelte:head>
{#if $navigating}
	<Loading />
{/if}
<Home {data}>
	{#each articles as article}
		<ArticlePreview {article} />
	{/each}
	<Pagination />
</Home>
