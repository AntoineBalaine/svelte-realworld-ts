<script lang="ts">
	import Form_Favorites from "$Components/Form_Favorites.svelte";
	import type { PageData } from "./$types";
	import FormFollow from "$Components/Form_Follow.svelte";
	import ButtonsEditDelete from "$Components/Buttons_Edit_Delete.svelte";
	import CommentCard from "$Components/CommentCard.svelte";
	import CommentInput from "$Components/CommentInput.svelte";
	export let data: PageData;

	let { user } = data;
	let comments = data.comments;
	const { author, updatedAt, title, body, description, slug } = data.articleData;
	let { favoritesCount, favorited } = data.articleData;
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

				{#if !data.user || (data.user && data.user.username !== author.username)}
					<FormFollow {following} {username} {user} />
					<Form_Favorites {favorited} {favoritesCount} data={{ slug }} />
				{:else}
					<div class="row" style="margin-top: 10px;">
						<ButtonsEditDelete {slug} />
					</div>
				{/if}
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
		<CommentInput {slug} {user} />
		{#each comments as comment}
			<CommentCard {comment} />
		{/each}
		{#if !data.user || (data.user && data.user.username !== author.username)}
			<div class="article-actions">
				<div class="article-meta">
					<a href="profile.html"><img src={author?.image} alt="author profile" /></a>
					<div class="info">
						<a href="/profile/@{author?.username}" class="author">{author?.username}</a>
						<span class="date">{updatedAt}</span>
					</div>

					<FormFollow {following} {username} />
					&nbsp;
					<Form_Favorites {favorited} {favoritesCount} data={data.articleData} />
				</div>
			</div>
		{/if}
	</div>
</div>
