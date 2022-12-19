<script lang="ts">
	import type { PageData } from "../routes/$types";

	export let data: PageData;
</script>

<div class="home-page">
	<div class="banner">
		<div class="container">
			<h1 class="logo-font">conduit</h1>
			<p>A place to share your knowledge.</p>
		</div>
	</div>

	<div class="container page">
		<div class="row">
			<div class="col-md-9">
				<div class="feed-toggle">
					<ul class="nav nav-pills outline-active">
						<li class="nav-item">
							<a class="nav-link disabled" href="">Your Feed</a>
						</li>
						<li class="nav-item">
							<a class="nav-link active" href="">Global Feed</a>
						</li>
					</ul>
				</div>

				<slot />
			</div>

			<div class="col-md-3">
				<div class="sidebar">
					<p>Popular Tags</p>

					<div class="tag-list">
						{#each data.tags.tags as tag}
							<a href="" class="tag-pill tag-default">{tag}</a>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
