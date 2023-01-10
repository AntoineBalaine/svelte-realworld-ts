<script lang="ts">
	import type { PageData } from "../routes/$types";
	export let data: PageData;
	import { page } from "$app/stores";
	import { enhance } from "$app/forms";

	$: tag = $page.url.searchParams.get("tag");
	$: tab = $page.url.searchParams.get("tab");
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
							<a
								class="nav-link"
								rel="external"
								class:active={(tab === "all" || !tab) && !tag}
								href="/">Global Feed</a
							>
						</li>
						{#if data.user}
							<li class="nav-item">
								<a href="/?tab=feed" rel="external" class="nav-link" class:active={tab === "feed"}
									>Your Feed</a
								>
							</li>
						{:else}
							<li class="nav-item">
								<a href="/sign-in" class="nav-link">Sign in to see your Feed</a>
							</li>
						{/if}
						{#if tag}
							<li class="nav-item">
								<a href="/?tag={tag}" class="nav-link active">
									<i class="ion-pound" />
									{tag}
								</a>
							</li>
						{/if}
					</ul>
				</div>

				<slot />
			</div>

			<div class="col-md-3">
				<div class="sidebar">
					<p>Popular Tags</p>

					<div class="tag-list">
						{#each data.tags.tags as tag}
							<a
								href="/?tag={tag}"
								rel="external"
								data-testid="homepage-tag"
								class="tag-pill tag-default">{tag}</a
							>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
