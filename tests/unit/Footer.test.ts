import { render } from "@testing-library/svelte";
import { describe, test, expect } from "vitest";
import Footer from "src/components/Footer.svelte";
import type { ComponentProps } from "svelte";

describe("Footer Component", () => {
	test("should render the component", () => {
		const props: ComponentProps<Footer> = {};
		const footerPreview = render(Footer, props);
		expect(footerPreview.getByTestId("footer-component")).not.toBeUndefined();

		const allLinks = footerPreview.getAllByRole("link");
		expect(allLinks[0].innerHTML).toEqual("conduit");
		expect(allLinks[1].innerHTML).toEqual("Thinkster");

		expect(footerPreview.container).toMatchSnapshot();
	});
});
