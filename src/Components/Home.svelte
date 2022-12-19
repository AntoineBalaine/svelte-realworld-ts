<script>
	import ArticlePreview from "./ArticlePreview.svelte";
	import TagSection from "./TagSection.svelte";
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

				<div class="article-preview">
					<div class="article-meta">
						<a href="profile.html"
							><img alt="profile thumbnail" src="http://i.imgur.com/N4VcUeJ.jpg" /></a
						>
						<div class="info">
							<a href="" class="author">Albert Pai</a>
							<span class="date">January 20th</span>
						</div>
						<button class="btn btn-outline-primary btn-sm pull-xs-right">
							<i class="ion-heart" /> 32
						</button>
					</div>
					<a href="" class="preview-link">
						<h1>The song you won't ever stop singing. No matter how hard you try.</h1>
						<p>This is the description for the post.</p>
						<span>Read more...</span>
					</a>
				</div>
			</div>

			<TagSection />
		</div>
	</div>
</div>
