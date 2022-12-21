<script lang="ts">
	import { page } from "$app/stores";

	let isLoggedIn: boolean;
	page.subscribe((pageContents) => {
		isLoggedIn = pageContents.data.isLoggedIn;
	});
</script>

<nav class="navbar navbar-light">
	<div class="container">
		<a class="navbar-brand" href="/">conduit</a>
		<ul class="nav navbar-nav pull-xs-right">
			<li class="nav-item">
				<!-- Add "active" class when you're on that page" -->
				<a class="nav-link active" href="/">Home</a>
			</li>
			{#if isLoggedIn}
				<li class="nav-item">
					<a class="nav-link" href="/"> <i class="ion-compose" />&nbsp;New Article </a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="/"> <i class="ion-gear-a" />&nbsp;Settings </a>
				</li>
			{/if}
			<li class="nav-item">
				<a class="nav-link" href="/sign-in">Sign in</a>
			</li>
			<li class="nav-item">
				<a class="nav-link" href="/sign-up">Sign up</a>
			</li>
		</ul>
	</div>
</nav>
