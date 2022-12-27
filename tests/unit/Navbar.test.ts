import { render } from "@testing-library/svelte";
import { describe, test, expect } from "vitest";
import Navbar from "src/components/Navbar.svelte";

import type { ComponentProps } from "svelte";
import { articleSample } from "tests/DataSamples";

describe("VerticalTabs Component", () => {
	test("should render the component", () => {
		const navbarProps: ComponentProps<Navbar> = {
			data: {
				articles: [articleSample],
				user: null,
				tags: { tags: Array<string>() },
				pages: 1,
				isLoggedIn: false,
				pageNumber: 1
			}
		};
		const navbarPreview = render(Navbar, navbarProps);

		expect(navbarPreview.getByTestId("HomeNav").innerHTML).toEqual("Home");

		expect(navbarPreview.container).toMatchSnapshot();
	});
});
