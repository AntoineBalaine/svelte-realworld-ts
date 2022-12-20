<script lang="ts">
	import type { PageData } from "./$types";
	export let data: PageData;

	const { author, updatedAt, favoritesCount, title, body, description } = data;
</script>

<div class="article-page">
	<div class="banner">
		<div class="container">
			<h1>{title}</h1>

			<div class="article-meta">
				<a href="/{author?.username}"><img src={author?.image} alt="author profile" /></a>
				<div class="info">
					<a href="/{author?.username}" class="author">{author?.username}</a>
					<span class="date">{updatedAt}</span>
				</div>
				<button class="btn btn-sm btn-outline-secondary">
					<i class="ion-plus-round" />
					&nbsp; Follow {author?.username} <span class="counter">({favoritesCount})</span>
				</button>
				&nbsp;&nbsp;
				<button class="btn btn-sm btn-outline-primary">
					<i class="ion-heart" />
					&nbsp; Favorite Post <span class="counter">({favoritesCount})</span>
				</button>
			</div>
		</div>
	</div>

	<div class="container page">
		<div class="row article-content">
			<div class="col-md-12">
				<p>
					{description}
				</p>
				<!-- 				<h2 id="introducing-ionic">{slug}</h2> -->
				<p>{body}</p>
			</div>
		</div>

		<hr />

		<div class="article-actions">
			<div class="article-meta">
				<a href="profile.html"><img src={author?.image} alt="author profile" /></a>
				<div class="info">
					<a href="/{author?.username}" class="author">{author?.username}</a>
					<span class="date">{updatedAt}</span>
				</div>

				<button class="btn btn-sm btn-outline-secondary">
					<i class="ion-plus-round" />
					&nbsp; Follow {author?.username}
				</button>
				&nbsp;
				<button class="btn btn-sm btn-outline-primary">
					<i class="ion-heart" />
					&nbsp; Favorite Post <span class="counter">({favoritesCount})</span>
				</button>
			</div>
		</div>
	</div>
</div>
