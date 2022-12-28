<script lang="ts">
	import { enhance } from "$app/forms";
	import type ApiTypes from "$lib/ApiTypes";
	import { SignIn_Up_Alternatives } from "$lib/Types";

	interface SignDta {
		path: string;
		question: string;
		buttonText: string;
	}

	const SignInDta: SignDta = {
		path: "/sign-up",
		question: "Don’t have an account yet?",
		buttonText: "Sign in"
	};

	const SignUp: SignDta = {
		path: "/sign-in",
		question: "Already have an account?",
		buttonText: "Sign up"
	};

	export let SignInUp_prop: SignIn_Up_Alternatives;
	export let form:
		| ApiTypes.operations["CreateUser"]["responses"]["422"]["content"]["application/json"]
		| null = null;
	$: SignIn_or_Up = SignInUp_prop === SignIn_Up_Alternatives.SignUp ? SignUp : SignInDta;
</script>

<div class="auth-page">
	<div class="container page">
		<div class="row">
			<div class="col-md-6 offset-md-3 col-xs-12">
				<h1 class="text-xs-center" data-testid="signInUp-title">{SignIn_or_Up.buttonText}</h1>
				<p class="text-xs-center">
					<a href={SignIn_or_Up.path} data-testid="signInUp-switch">{SignIn_or_Up.question}</a>
				</p>
				{#if form}
					<ul class="error-messages">
						{#each Object.entries(form.errors) as [key, value]}
							<li>{key} {value}</li>
						{/each}
					</ul>
				{/if}

				<form method="POST" use:enhance>
					{#if SignInUp_prop === SignIn_Up_Alternatives.SignUp}
						<fieldset class="form-group">
							<input
								data-testid="signUp-name"
								class="form-control form-control-lg"
								type="text"
								name="username"
								placeholder="Your Name"
							/>
						</fieldset>
					{/if}
					<fieldset class="form-group">
						<input
							data-testid="signUp-email"
							class="form-control form-control-lg"
							name="email"
							type="email"
							placeholder="Email"
						/>
					</fieldset>
					<fieldset class="form-group">
						<input
							data-testid="signUp-password"
							class="form-control form-control-lg"
							name="password"
							type="password"
							placeholder="Password"
						/>
					</fieldset>
					<button class="btn btn-lg btn-primary pull-xs-right">{SignIn_or_Up.buttonText}</button>
				</form>
			</div>
		</div>
	</div>
</div>
