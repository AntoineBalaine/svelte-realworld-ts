<script lang="ts">
	import type * as ApiTypes from "../ApiTypes";
	export let article: ApiTypes.components["schemas"]["Article"];
	const { author, updatedAt, favoritesCount, tagList, title, description } = article;
</script>

<div class="article-preview">
	<div class="article-meta">
		<a href=""><img src={author.image} alt="author thumbnail" /></a>
		<div class="info">
			<a href="" class="author">{author.username}</a>
			<span class="date">{updatedAt}</span>
		</div>
		<button class="btn btn-outline-primary btn-sm pull-xs-right">
			<i class="ion-heart" />
			{favoritesCount}
		</button>
	</div>
	<a href="" class="preview-link">
		<h1>{title}</h1>
		<p>{description}</p>
		<span>Read more...</span>
		<ul class="tag-list">
			{#each tagList as tag}
				<li>
					<a href="" class="tag-pill tag-default">{tag}</a>
				</li>
			{/each}
		</ul>
	</a>
</div>
