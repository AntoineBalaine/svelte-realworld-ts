<script lang="ts">
	import { page } from "$app/stores";

	let pages: number;
	let pageNumber: number;
	page.subscribe((thing) => {
		pageNumber = thing.data.pageNumber;
		pages = thing.data.pages;
	});

	const findPaginationRange = (pageNumber: number, pagesCount: number): number[] => {
		const left = pageNumber - 1 < 4 ? pageNumber - 1 : 4;
		const right = pagesCount - pageNumber < 4 ? pagesCount - pageNumber : 4;
		const leftIdx = pageNumber - left;
		const rightIdx = pageNumber + right;
		const range = Array<number>();
		for (let i = leftIdx; i <= rightIdx; i++) {
			range.push(i);
		}
		return range;
	};

	let paginationRange = Array<number>();
	$: {
		paginationRange = findPaginationRange(pageNumber, pages);
	}
</script>

<nav aria-label="Page navigation example">
	<ul class="pagination" data-testid="pagination-list">
		{#if pageNumber - 1 > 0}
			<li class="page-item">
				<a class="page-link" href="/?page={pageNumber - 1}">Previous</a>
			</li>
		{/if}
		{#each paginationRange as paginationElement, i (paginationElement)}
			<li class="page-item" class:active={pageNumber === paginationElement}>
				<a class="page-link" href="/?page={paginationElement}"
					>{i < paginationRange.length - 1 ? paginationElement : "…"}</a
				>
			</li>
		{/each}

		{#if pageNumber < pages}
			<li class="page-item"><a class="page-link" href="/?page={pageNumber + 1}">Next</a></li>
		{/if}
	</ul>
</nav>
