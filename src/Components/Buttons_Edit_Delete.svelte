<script lang="ts">
	export let slug = "";
</script>

<a href="/write/{slug}">
	<button class="btn btn-sm btn-outline-secondary action-btn">
		<i class="ion-edit" />
		&nbsp; Edit Article
	</button>
</a>
&nbsp;
<form method="POST" action="/article/{slug}?/deleteArticle">
	<button class="btn btn-sm btn-outline-danger action-btn">
		<i class="ion-trash-a" />
		&nbsp; Delete Article
	</button>
</form>
