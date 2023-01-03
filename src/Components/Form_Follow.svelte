<script lang="ts">
	import { enhance } from "$app/forms";
	export let following = false;
	export let username = "";
	export let user: import("$lib/ApiTypes").components["schemas"]["User"] | null = null;
</script>

{#if !user}
	<a href="/login">
		<button class="btn btn-sm btn-outline-secondary action-btn">
			<i class="ion-plus-round" />
			&nbsp; {"Sign-in to Follow"}
			{username}
		</button>
	</a>
{:else}
	<form
		class="btn"
		method="POST"
		action="/profile/@{username}?/togglefollow"
		use:enhance={({ form }) => {
			/**
			 * disable the toggle button during the form submission
			 */
			following = !following;
			const button = form.querySelector("button");
			if (button) {
				button.disabled = true;
			}
			/**
			 * the returned value is a function that gets
			 * called after the api call.
			 * the function takes an ActionResult
			 */
			return (actionresult) => {
				// un-disable the toggle
				if (button) {
					button.disabled = false;
				}
				const { result } = actionresult;
				if (result.type !== "success") {
					// if the form submission fails, reset the form to previous state
					following = !following;
				}
			};
		}}
	>
		<input hidden type="checkbox" id="checkbox" name="following" bind:value={following} />
		<button class="btn btn-sm btn-outline-secondary action-btn">
			<i class="ion-plus-round" />
			&nbsp; {following ? "Unfollow" : "Follow"}
			{username}
		</button>
	</form>
{/if}
