<script lang="ts">
	export let slug: string | null;
	export let user: import("$lib/ApiTypes").components["schemas"]["User"] | null = null;
</script>

<div class="row">
	<div class="col-xs-12 col-md-8 offset-md-2">
		<form class="card comment-form" method="POST" action="/article/{slug}?/addComment">
			<div class="card-block">
				<textarea class="form-control" placeholder="Write a comment..." rows="3" />
			</div>
			<div class="card-footer">
				<img
					src={user?.image || "http://i.imgur.com/Qr71crq.jpg"}
					class="comment-author-img"
					alt={user?.username}
				/>
				<button class="btn btn-sm btn-primary">Post Comment</button>
			</div>
		</form>
	</div>
</div>
