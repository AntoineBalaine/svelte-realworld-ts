<script lang="ts">
	import { enhance } from "$app/forms";
	import type * as ApiTypes from "$lib/ApiTypes";
	export let article: ApiTypes.components["schemas"]["Article"];
	const { author, updatedAt, tagList, title, description, slug } = article;
	let { favoritesCount, favorited } = article;
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
		<form
			method="POST"
			action="/article/{article.slug}?/toggleFavorite"
			use:enhance={({ form }) => {
				favorited = !favorited;
				favorited ? (favoritesCount += 1) : (favoritesCount -= 1);
				const button = form.querySelector("button");
				if (button) {
					button.disabled = true;
				}
				return (actionresult) => {
					// un-disable the toggle
					if (button) {
						button.disabled = false;
					}
					const { result } = actionresult;
					if (result.type !== "success") {
						// if the form submission fails, reset the form to previous state
						favorited = !favorited;
						favorited ? (favoritesCount += 1) : (favoritesCount -= 1);
					}
				};
			}}
		>
			<input hidden type="checkbox" id="checkbox" name="favorited" bind:value={favorited} />
			<button class="btn btn-outline-primary btn-sm pull-xs-right">
				<i class="ion-heart" />
				{favoritesCount}
			</button>
		</form>
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
