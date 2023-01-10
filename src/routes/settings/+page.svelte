<script lang="ts">
	import { enhance } from "$app/forms";
	import type { ActionData, PageData } from "./$types";
	export let data: PageData;
	const { user } = data;
	export let form: ActionData;
</script>

<div class="settings-page">
	<div class="container page">
		<div class="row">
			<div class="col-md-6 offset-md-3 col-xs-12">
				<h1 class="text-xs-center">Your Settings</h1>

				{#if form}
					<ul class="error-messages">
						<!-- As unpleasant as it is, it turns out that the swagger api is not describing the returned errors correctly. -->
						{#each Object.entries(form.errors) as [key, value]}
							<li>{key} {value}</li>
						{/each}
					</ul>
				{/if}
				<form method="POST" use:enhance action="?/save">
					<fieldset>
						<fieldset class="form-group">
							<input
								class="form-control"
								type="text"
								placeholder="URL of profile picture"
								name="image"
								value={user?.image}
							/>
						</fieldset>
						<fieldset class="form-group">
							<input
								class="form-control form-control-lg"
								type="text"
								placeholder="Your Name"
								name="username"
								value={user?.username}
							/>
						</fieldset>
						<fieldset class="form-group">
							<textarea
								class="form-control form-control-lg"
								rows="8"
								placeholder="Short bio about you"
								name="bio"
								value={user?.bio}
							/>
						</fieldset>
						<fieldset class="form-group">
							<input
								class="form-control form-control-lg"
								type="text"
								placeholder="Email"
								name="email"
								value={user?.email}
							/>
						</fieldset>
						<fieldset class="form-group">
							<input
								class="form-control form-control-lg"
								type="password"
								name="password"
								placeholder="Password"
							/>
						</fieldset>
						<button class="btn btn-lg btn-primary pull-xs-right">Update Settings</button>
					</fieldset>
				</form>
				<hr />
				<form method="POST" use:enhance action="?/logout">
					<button class="btn btn-outline-danger">Or click here to logout.</button>
				</form>
			</div>
		</div>
	</div>
</div>
