<script lang="ts">
	import type ApiTypes from "$lib/ApiTypes";
	export let comment: ApiTypes.components["schemas"]["Comment"];
	const { id, createdAt, updatedAt, body, author } = comment;
</script>

<div class="row">
	<div class="col-xs-12 col-md-8 offset-md-2">
		<div class="card">
			<div class="card-block">
				<p class="card-text">{body}</p>
			</div>
			<div class="card-footer">
				<a href={null} class="comment-author">
					<img src={author.image} class="comment-author-img" alt="author-thumbnail" />
				</a>
				&nbsp;
				<a href={null} class="comment-author">{author.username}</a>
				<span class="date-posted">{updatedAt}</span>
			</div>
		</div>
	</div>
</div>
