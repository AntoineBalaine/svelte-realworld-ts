<script lang="ts">
	import type ApiTypes from "$lib/ApiTypes";
	import ArticlePreview from "$Components/ArticlePreview.svelte";
	import type { PageData } from "./$types";

	export let data: PageData;
	const { profile } = data.author;
</script>

<div class="profile-page">
	<div class="user-info">
		<div class="container">
			<div class="row">
				<div class="col-xs-12 col-md-10 offset-md-1">
					<img src={profile.image} class="user-img" alt="userimage" />
					<h4>{profile.username}</h4>
					<p>
						{profile.bio || ""}
					</p>
					<button class="btn btn-sm btn-outline-secondary action-btn">
						<i class="ion-plus-round" />
						&nbsp; Follow {profile.username}
					</button>
				</div>
			</div>
		</div>
	</div>

	<div class="container">
		<div class="row">
			<div class="col-xs-12 col-md-10 offset-md-1">
				<div class="articles-toggle">
					<ul class="nav nav-pills outline-active">
						<li class="nav-item">
							<a class="nav-link active" href="/">My Articles</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="/">Favorited Articles</a>
						</li>
					</ul>
				</div>
				{#each data.articles.articles as article}
					<ArticlePreview {article} />
				{/each}
			</div>
		</div>
	</div>
</div>
