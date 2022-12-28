import { render } from "@testing-library/svelte";
import { describe, test, expect } from "vitest";
import SignUp_SignIn from "src/components/SignUp_SignIn.svelte";
import { SignIn_Up_Alternatives } from "$lib/Types";
import type { ComponentProps } from "svelte";

describe("SignUp_SignIn Component", () => {
	test("Sign In: should render the component", () => {
		const props: ComponentProps<SignUp_SignIn> = {
			SignInUp_prop: SignIn_Up_Alternatives.SignIn
		};
		const signUpPreview = render(SignUp_SignIn, props);

		expect(signUpPreview.getByTestId("signInUp-title").innerHTML).toEqual("Sign in");
		expect(signUpPreview.getByTestId("signInUp-switch").innerHTML).toEqual(
			"Don’t have an account yet?"
		);
		const name_input = (() => {
			try {
				return signUpPreview.getByPlaceholderText("Your Name");
			} catch {
				return undefined;
			}
		})();
		expect(name_input).toBeUndefined;
		expect(signUpPreview.getByPlaceholderText("Email")).not.toBeUndefined;
		expect(signUpPreview.getByPlaceholderText("Password")).not.toBeUndefined;

		expect(signUpPreview.container).toMatchSnapshot();
	});
	test("Sign Up: should render the component", () => {
		const props: ComponentProps<SignUp_SignIn> = {
			SignInUp_prop: SignIn_Up_Alternatives.SignUp
		};
		const signUpPreview = render(SignUp_SignIn, props);

		expect(signUpPreview.getByTestId("signInUp-title").innerHTML).toEqual("Sign up");
		expect(signUpPreview.getByTestId("signInUp-switch").innerHTML).toEqual(
			"Already have an account?"
		);
		expect(signUpPreview.getByPlaceholderText("Your Name")).not.toBeUndefined;
		expect(signUpPreview.getByPlaceholderText("Email")).not.toBeUndefined;
		expect(signUpPreview.getByPlaceholderText("Password")).not.toBeUndefined;

		expect(signUpPreview.container).toMatchSnapshot();
	});
});
