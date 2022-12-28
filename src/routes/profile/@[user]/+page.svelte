<script lang="ts">
	import ArticlePreview from "$Components/ArticlePreview.svelte";
	import type { PageData } from "./$types";
	import { store } from "$store";

	export let data: PageData;
	const { profile } = data.author;
	let isLoggedIn = false;
	store.subscribe((data) => (isLoggedIn = data.isLoggedIn));
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
							<a class="nav-link active" href={null}>My Articles</a>
						</li>
						{#if data.user}
							<li class="nav-item">
								<a class="nav-link" href="/profile/@{data.user.username}/favorites"
									>Favorited Articles</a
								>
							</li>
						{/if}
					</ul>
				</div>
				{#each data.articles.articles as article}
					<ArticlePreview {article} />
				{/each}
			</div>
		</div>
	</div>
</div>
