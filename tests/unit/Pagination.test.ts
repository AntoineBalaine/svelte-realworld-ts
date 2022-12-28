import { render } from "@testing-library/svelte";
import { describe, test, expect } from "vitest";
import Pagination from "src/components/Pagination.svelte";

import type { ComponentProps } from "svelte";

describe("Pagination Component", () => {
	test("should render the component", () => {
		const props: ComponentProps<Pagination> = {};
		const paginationPreview = render(Pagination, props);

		expect(paginationPreview.getByTestId("pagination-list")).toBeDefined();

		expect(paginationPreview.container).toMatchSnapshot();
	});
});
