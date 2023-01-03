<script lang="ts">
	import Form_Follow from "./Form_Follow.svelte";
	import Form_Favorites from "$Components/Form_Favorites.svelte";
	import type * as ApiTypes from "$lib/ApiTypes";
	import ButtonsEditDelete from "./Buttons_Edit_Delete.svelte";
	export let article: ApiTypes.components["schemas"]["Article"];
	const { author, updatedAt, tagList, title, description, slug } = article;
	let { favoritesCount, favorited } = article;
	export let user: import("$lib/ApiTypes").components["schemas"]["User"] | null = null;
</script>

<div class="article-preview">
	<div class="article-meta">
		<a href="/profile/@{author?.username}"><img src={author.image} alt="author thumbnail" /></a>
		<div class="info">
			<a href="/profile/@{author?.username}" data-testid="author-username" class="author"
				>{author.username}</a
			>
			<span data-testid="author-updatedAt" class="date">{updatedAt}</span>
		</div>
		{#if user}
			{#if user && user.username === author.username}
				<div class="row" style="margin-top: 10px;">
					<ButtonsEditDelete {slug} />
				</div>
			{:else}
				<div class="primary pull-xs-right">
					<Form_Favorites {favorited} {favoritesCount} data={{ slug }} />
					<Form_Follow following={author.following} username={author.username} {user} />
				</div>
			{/if}
		{/if}
	</div>
	<a href="/article/{slug}" class="preview-link">
		<h1 data-testid="article-title">{title}</h1>
		<p data-testid="article-description">{description}</p>
		<span>Read more...</span>
		<ul class="tag-list">
			{#each tagList as tag}
				<li>
					<a href="/?tag={tag}" class="tag-pill tag-default tag-outline">{tag}</a>
				</li>
			{/each}
		</ul>
	</a>
</div>
