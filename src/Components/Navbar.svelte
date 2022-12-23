<script lang="ts">
	import { page } from "$app/stores";
	import type { PageData } from "../routes/$types";
	export let data: PageData;
	let route: string | null;
	let isLoggedIn: boolean;
	const { user } = data;
	page.subscribe((pageContents) => {
		isLoggedIn = pageContents.data.isLoggedIn;
		route = pageContents.route.id;
	});
</script>

<nav class="navbar navbar-light">
	<div class="container">
		<a class="navbar-brand" href="/">conduit</a>
		<ul class="nav navbar-nav pull-xs-right">
			<li class="nav-item">
				<!-- Add "active" class when you're on that page" -->
				<a class="nav-link active" class:active={!route || route === "/"} href="/">Home</a>
			</li>
			{#if user}
				<li class="nav-item">
					<a class="nav-link" href="/"> <i class="ion-compose" />&nbsp;New Article </a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="/settings"> <i class="ion-gear-a" />&nbsp;Settings </a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="/sign-out">Sign out</a>
				</li>
			{:else}
				<li class="nav-item">
					<a class="nav-link" class:active={route === "/sign-in"} href="/sign-in">Sign in</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" class:active={route === "/sign-up"} href="/sign-up">Sign up</a>
				</li>
			{/if}
		</ul>
	</div>
</nav>
