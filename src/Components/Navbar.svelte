<script lang="ts">
	import { page } from "$app/stores";
	import type { PageData } from "../routes/$types";
	export let data: PageData;
	let route: string | null;
	const { user } = data;
	page.subscribe((pageContents) => {
		route = pageContents.route.id;
	});
</script>

<nav class="navbar navbar-light">
	<div class="container">
		<a class="navbar-brand" data-testid="TitleNav" href="/">conduit</a>
		<ul class="nav navbar-nav pull-xs-right">
			<li class="nav-item">
				<!-- Add "active" class when you're on that page" -->
				<a
					class="nav-link active"
					data-testid="HomeNav"
					class:active={!route || route === "/"}
					href="/">Home</a
				>
			</li>
			{#if user}
				<li class="nav-item">
					<a class="nav-link" data-testid="ArticleNav" href="/">
						<i class="ion-compose" />&nbsp;New Article
					</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" data-testid="SettingsNav" href="/settings">
						<i class="ion-gear-a" />&nbsp;Settings
					</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" data-testid="SignOutNav" href="/sign-out">Sign out</a>
				</li>
			{:else}
				<li class="nav-item">
					<a
						class="nav-link"
						data-testid="SignInNav"
						class:active={route === "/sign-in"}
						href="/sign-in">Sign in</a
					>
				</li>
				<li class="nav-item">
					<a
						class="nav-link"
						data-testid="SignUpNav"
						class:active={route === "/sign-up"}
						href="/sign-up">Sign up</a
					>
				</li>
			{/if}
		</ul>
	</div>
</nav>
