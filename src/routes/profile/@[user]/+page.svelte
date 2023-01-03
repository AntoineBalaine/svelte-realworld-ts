<script lang="ts">
	import ArticlePreview from "$Components/ArticlePreview.svelte";
	import FormFollow from "$Components/Form_Follow.svelte";
	import type { PageData } from "./$types";

	export let data: PageData;
	let { profile } = data.author;
	let { following, username } = profile;
	let { user } = data;
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
					{#if data.user}
						{#if data.user.username === profile.username}
							<a href="/settings">
								<button class="btn btn-sm btn-outline-secondary action-btn">
									<i class="ion-gear-a" />
									&nbsp; Edit Profile Settings
								</button>
							</a>
						{:else}
							<FormFollow {following} {username} {user} />
						{/if}
					{:else}
						<a href="/sign-in" class="btn btn-sm btn-outline-secondary action-btn">
							<i class="ion-plus-round" />
							&nbsp; Follow
							{username}
						</a>
					{/if}
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
					<ArticlePreview {article} user={data.user} />
				{/each}
			</div>
		</div>
	</div>
</div>
