<script lang="ts">
	import SignUpSignIn from "$Components/SignUp_SignIn.svelte";
	import { SignIn_Up_Alternatives } from "$lib/Types";
	const SignInUp_prop = SignIn_Up_Alternatives.SignIn;
</script>

<SignUpSignIn {SignInUp_prop} />
