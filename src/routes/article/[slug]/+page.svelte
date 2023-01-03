<script lang="ts">
	import Form_Favorites from "$Components/Form_Favorites.svelte";
	import { enhance } from "$app/forms";
	import type { PageData } from "./$types";
	import FormFollow from "$Components/Form_Follow.svelte";
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
					<FormFollow {following} {username} />
				{:else}
					<a href="/sign-in" class="btn btn-sm btn-outline-secondary action-btn">
						<i class="ion-plus-round" />
						&nbsp; Follow
						{username}
					</a>
				{/if}
				<Form_Favorites {favorited} {favoritesCount} {data} />
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

				<FormFollow {following} {username} />
				&nbsp;
				<Form_Favorites {favorited} {favoritesCount} {data} />
			</div>
		</div>
	</div>
</div>
