<script lang="ts">
	import { enhance } from "$app/forms";
	import ArticlePreview from "$Components/ArticlePreview.svelte";
	import type { PageData } from "./$types";

	export let data: PageData;
	let { profile } = data.author;
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
						<form
							method="POST"
							action="?/togglefollow"
							use:enhance={({ form }) => {
								/**
								 * disable the toggle button during the form submission
								 */
								profile.following = !profile.following;
								const button = form.querySelector("button");
								if (button) {
									button.disabled = true;
								}
								/**
								 * the returned value is a function that gets
								 * called after the api call.
								 * the function takes an ActionResult
								 */
								return (actionresult) => {
									// un-disable the toggle
									if (button) {
										button.disabled = false;
									}
									const { result } = actionresult;
									if (result.type !== "success") {
										// if the form submission fails, reset the form to previous state
										profile.following = !profile.following;
									}
								};
							}}
						>
							<input
								hidden
								type="checkbox"
								id="checkbox"
								name="following"
								bind:value={profile.following}
							/>
							<button class="btn btn-sm btn-outline-secondary action-btn">
								<i class="ion-plus-round" />
								&nbsp; {profile.following ? "Unfollow" : "Follow"}
								{profile.username}
							</button>
						</form>
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
					<ArticlePreview {article} />
				{/each}
			</div>
		</div>
	</div>
</div>
