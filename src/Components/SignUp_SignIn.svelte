<script lang="ts">
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
	$: SignIn_or_Up = SignInUp_prop === SignIn_Up_Alternatives.SignUp ? SignUp : SignInDta;
</script>

<div class="auth-page">
	<div class="container page">
		<div class="row">
			<div class="col-md-6 offset-md-3 col-xs-12">
				<h1 class="text-xs-center">{SignIn_or_Up.buttonText}</h1>
				<p class="text-xs-center">
					<a href={SignIn_or_Up.path}>{SignIn_or_Up.question}</a>
				</p>

				{#if false}
					<ul class="error-messages">
						<li>That email is already taken</li>
					</ul>
				{/if}

				<form>
					{#if SignInUp_prop === SignIn_Up_Alternatives.SignUp}
						<fieldset class="form-group">
							<input class="form-control form-control-lg" type="text" placeholder="Your Name" />
						</fieldset>
					{/if}
					<fieldset class="form-group">
						<input class="form-control form-control-lg" type="text" placeholder="Email" />
					</fieldset>
					<fieldset class="form-group">
						<input class="form-control form-control-lg" type="password" placeholder="Password" />
					</fieldset>
					<button class="btn btn-lg btn-primary pull-xs-right">{SignIn_or_Up.buttonText}</button>
				</form>
			</div>
		</div>
	</div>
</div>
