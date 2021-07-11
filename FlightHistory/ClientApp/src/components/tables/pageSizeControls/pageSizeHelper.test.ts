import { getNewPagination } from "./pageSizeHelper";

describe("getNewPagination", function () {
    it.each`
        oldPage | oldPageSize | newPageSize | expectedNewPage
        ${1}    | ${10}       | ${10}       | ${1}
        ${1}    | ${10}       | ${20}       | ${1}
        ${1}    | ${10}       | ${50}       | ${1}
        ${9}    | ${10}       | ${10}       | ${9}
        ${9}    | ${10}       | ${20}       | ${5}
        ${9}    | ${10}       | ${50}       | ${2}
        ${5}    | ${20}       | ${10}       | ${9}
        ${5}    | ${20}       | ${20}       | ${5}
        ${5}    | ${20}       | ${50}       | ${2}
        ${2}    | ${50}       | ${10}       | ${6}
        ${2}    | ${50}       | ${20}       | ${3}
        ${2}    | ${50}       | ${50}       | ${2}
    `(
        "should maintain list location when switching $oldPageSize per page to $newPageSize per page",
        ({ oldPage, oldPageSize, newPageSize, expectedNewPage }) => {
            const oldPagination = {
                page: oldPage,
                pageSize: oldPageSize,
            };

            const newPagination = getNewPagination(oldPagination, newPageSize);

            expect(newPagination).toEqual({
                page: expectedNewPage,
                pageSize: newPageSize,
            });
        },
    );
});
