<script>
	import { enhance } from "$app/forms";
	export let favorited = false;
	export let favoritesCount = 0;
	export let data = { slug: "" };
</script>

<form
	style="padding: 0;"
	method="POST"
	class="btn"
	use:enhance={({ form }) => {
		favorited = !favorited;
		favorited ? (favoritesCount += 1) : (favoritesCount -= 1);
		const button = form.querySelector("button");
		if (button) {
			button.disabled = true;
		}
		return (actionresult) => {
			// un-disable the toggle
			if (button) {
				button.disabled = false;
			}
			const { result } = actionresult;
			if (result.type !== "success") {
				// if the form submission fails, reset the form to previous state
				favorited = !favorited;
				favorited ? (favoritesCount += 1) : (favoritesCount -= 1);
			}
		};
	}}
>
	<button
		formaction="/article/{data.slug}?/toggleFavorite&favorited={favorited}"
		class="btn btn-sm {favorited ? 'btn-primary' : 'btn-outline-primary'}"
	>
		<i class="ion-heart" />
		<span class="counter">{favoritesCount}</span>
	</button>
</form>
