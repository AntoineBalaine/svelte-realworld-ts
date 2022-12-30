<script lang="ts">
	import { enhance } from "$app/forms";
	import type { PageData } from "./$types";
	export let data: PageData;

	const { author, updatedAt, title, body, description } = data;
	let { favoritesCount, favorited } = data;
	let { following, username } = author;
</script>

<div class="article-page">
	<div class="banner">
		<div class="container">
			<h1>{title}</h1>

			<div class="article-meta">
				<a href="/profile/@{author?.username}"><img src={author?.image} alt="author profile" /></a>
				<div class="info">
					<a href="/profile/@{author?.username}" class="author">{author?.username}</a>
					<span class="date">{updatedAt}</span>
				</div>

				{#if data.user}
					<form
						class="btn"
						method="POST"
						action="/profile?/togglefollow"
						use:enhance={({ form }) => {
							/**
							 * disable the toggle button during the form submission
							 */
							following = !following;
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
									following = !following;
								}
							};
						}}
					>
						<input hidden type="checkbox" id="checkbox" name="following" bind:value={following} />
						<button class="btn btn-sm btn-outline-secondary action-btn">
							<i class="ion-plus-round" />
							&nbsp; {following ? "Unfollow" : "Follow"}
							{username}
						</button>
					</form>
				{:else}
					<a href="/sign-in" class="btn btn-sm btn-outline-secondary action-btn">
						<i class="ion-plus-round" />
						&nbsp; Follow
						{username}
					</a>
				{/if}
				<form
					method="POST"
					action="/article/{data.slug}?/toggleFavorite"
					class="btn"
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
					<button class="btn btn-sm btn-outline-primary">
						<i class="ion-heart" />
						&nbsp; Favorite Post <span class="counter">({favoritesCount})</span>
					</button>
				</form>
			</div>
		</div>
	</div>

	<div class="container page">
		<div class="row article-content">
			<div class="col-md-12">
				<p>
					{description}
				</p>
				<p>{body}</p>
			</div>
		</div>

		<hr />

		<div class="article-actions">
			<div class="article-meta">
				<a href="profile.html"><img src={author?.image} alt="author profile" /></a>
				<div class="info">
					<a href="/profile/@{author?.username}" class="author">{author?.username}</a>
					<span class="date">{updatedAt}</span>
				</div>

				<button class="btn btn-sm btn-outline-secondary">
					<i class="ion-plus-round" />
					&nbsp; Follow {author?.username}
				</button>
				&nbsp;
				<form
					method="POST"
					action="/article/{data.slug}?/toggleFavorite"
					class="btn"
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
					<button class="btn btn-sm btn-outline-primary">
						<i class="ion-heart" />
						&nbsp; Favorite Post <span class="counter">({favoritesCount})</span>
					</button>
				</form>
			</div>
		</div>
	</div>
</div>
