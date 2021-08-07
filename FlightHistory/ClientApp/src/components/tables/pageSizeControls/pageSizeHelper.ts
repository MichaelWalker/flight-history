import type { Pagination } from "../../../api/apiHelpers";

export function getNewPagination(oldPagination: Pagination, newPageSize: number): Pagination {
    const firstItemIndex = (oldPagination.page - 1) * oldPagination.pageSize;
    const newPage = Math.floor(firstItemIndex / newPageSize) + 1;

    return {
        page: newPage,
        pageSize: newPageSize,
    };
}
