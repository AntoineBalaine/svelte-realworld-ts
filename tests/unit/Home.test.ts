import { render } from "@testing-library/svelte";
import { describe, test, expect } from "vitest";
import Home from "src/components/Home.svelte";

import type { ComponentProps } from "svelte";
import { articleSample } from "tests/DataSamples";

describe("Home Component", () => {
	test("should render the component", () => {
		const homeProps: ComponentProps<Home> = {
			data: {
				articles: [articleSample],
				user: null,
				tags: { tags: Array<string>("a tag") },
				pages: 1,
				isLoggedIn: false,
				pageNumber: 1
			}
		};
		const homePreview = render(Home, homeProps);

		const links = homePreview.getAllByRole("link");
		expect(links[0].innerHTML).toEqual("Global Feed");
		expect(links[1].innerHTML).toEqual("Sign in to see your Feed");
		expect(homePreview.getByTestId("homepage-tag")).not.toBeUndefined();

		expect(homePreview.container).toMatchSnapshot();
	});
});
