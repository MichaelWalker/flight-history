import type { ItemListResponse, Pagination, Sort } from "./apiHelpers";
import { getList } from "./apiHelpers";
import type { Aircraft } from "../models/aircraft";

async function list(
    pagination: Pagination,
    sort: Sort,
    search: string,
): Promise<ItemListResponse<Aircraft>> {
    return getList("/api/aircraft", pagination, sort, search);
}

export const AircraftClient = {
    list,
};
