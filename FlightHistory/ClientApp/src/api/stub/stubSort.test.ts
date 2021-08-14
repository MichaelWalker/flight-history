import { parseSort, stubSort } from "./stubSort";

describe("sort helpers", () => {
    describe("stubSort", () => {
        it("sorts strings", () => {
            const a = { name: "Mike" };
            const b = { name: "Walker" };
            const c = { name: "Mike" };

            const ascSort = stubSort({ sortBy: "name", sortDirection: "ASC" });
            const descSort = stubSort({ sortBy: "name", sortDirection: "DESC" });

            expect(ascSort(a, b)).toBe(1);
            expect(ascSort(a, c)).toBe(0);
            expect(ascSort(b, c)).toBe(-1);
            expect(descSort(a, b)).toBe(-1);
            expect(descSort(a, c)).toBe(0);
            expect(descSort(b, c)).toBe(1);
        });

        it("sorts numbers", () => {
            const a = { age: 21 };
            const b = { age: 31 };
            const c = { age: 21 };

            const ascSort = stubSort({ sortBy: "age", sortDirection: "ASC" });
            const descSort = stubSort({ sortBy: "age", sortDirection: "DESC" });

            expect(ascSort(a, b)).toBe(1);
            expect(ascSort(a, c)).toBe(0);
            expect(ascSort(b, c)).toBe(-1);
            expect(descSort(a, b)).toBe(-1);
            expect(descSort(a, c)).toBe(0);
            expect(descSort(b, c)).toBe(1);
        });

        it("doesn't sort objects", () => {
            const a = { user: { name: "Mike" } };
            const b = { user: { name: "Walker" } };

            const sort = stubSort({ sortBy: "user", sortDirection: "ASC" });

            expect(sort(a, b)).toBe(0);
        });

        it("doesn't sort if prop isn't a valid key", () => {
            const a = { name: "Mike" };
            const b = { name: "Walker" };

            const sort = stubSort({ sortBy: "invalid", sortDirection: "ASC" });

            expect(sort(a, b)).toBe(0);
        });

        it("doesn't sort if sort is not given", () => {
            const a = { name: "Mike" };
            const b = { name: "Walker" };

            const sort = stubSort(undefined);

            expect(sort(a, b)).toBe(0);
        });
    });

    describe("parseSort", () => {
        it("returns undefined if no sort params", () => {
            const url = new URL("https://foo.com");
            expect(parseSort(url)).toBeUndefined();
        });

        it("returns undefined if no sortBy", () => {
            const url = new URL("https://foo.com?sortDirction=ASC");
            expect(parseSort(url)).toBeUndefined();
        });

        it("returns undefined if no sortDirection", () => {
            const url = new URL("https://foo.com?sortBy=name");
            expect(parseSort(url)).toBeUndefined();
        });

        it("returns undefined if invalid sortDirection", () => {
            const url = new URL("https://foo.com?sortBy=name&sortDirection=invalid");
            expect(parseSort(url)).toBeUndefined();
        });

        it("returns sort if both fields are valid", () => {
            const url = new URL("https://foo.com?sortBy=name&sortDirection=DESC");
            expect(parseSort(url)).toEqual({ sortBy: "name", sortDirection: "DESC" });
        });
    });
});
