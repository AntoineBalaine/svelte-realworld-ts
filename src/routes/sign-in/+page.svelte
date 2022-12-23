<script lang="ts">
	import SignUpSignIn from "$Components/SignUp_SignIn.svelte";
	import { SignIn_Up_Alternatives } from "$lib/Types";
	import type { ActionData } from "./$types";
	const SignInUp_prop = SignIn_Up_Alternatives.SignIn;
	export let form: ActionData;
</script>

<SignUpSignIn {form} {SignInUp_prop} />
