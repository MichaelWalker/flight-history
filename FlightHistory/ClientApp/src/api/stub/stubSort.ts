import type { Sort, SortDirection } from "../apiHelpers";

function hasOwnProperty<TObject extends Record<string, unknown>>(
    object: TObject,
    prop: string,
): object is TObject & Record<string, unknown> {
    // eslint-disable-next-line no-prototype-builtins
    return object.hasOwnProperty(prop);
}

export function parseSort(url: URL): Sort | undefined {
    const sortBy = url.searchParams.get("sortBy");
    const sortDirection = url.searchParams.get("sortDirection");

    if (sortBy && sortDirection && ["ASC", "DESC"].includes(sortDirection)) {
        return {
            sortBy,
            sortDirection: sortDirection as SortDirection,
        };
    }

    return undefined;
}

function compare(a: string | number, b: string | number, sortDirection: SortDirection): number {
    if (a === b) {
        return 0;
    }

    if (a > b) {
        return sortDirection === "ASC" ? -1 : 1;
    }

    return sortDirection === "ASC" ? 1 : -1;
}

function compareUnknowns(a: unknown, b: unknown, sortDirection: SortDirection): number {
    if (typeof a === "string" && typeof b === "string") {
        return compare(a, b, sortDirection);
    }
    if (typeof a === "number" && typeof b === "number") {
        return compare(a, b, sortDirection);
    }
    return 0;
}

export function stubSort<T extends Record<string, unknown>>(
    sort: Sort | undefined,
): (a: T, b: T) => number {
    if (!sort) {
        return () => 0;
    }

    return (a, b) => {
        if (hasOwnProperty(a, sort.sortBy) && hasOwnProperty(b, sort.sortBy)) {
            return compareUnknowns(a[sort.sortBy], b[sort.sortBy], sort.sortDirection);
        }

        return 0;
    };
}
