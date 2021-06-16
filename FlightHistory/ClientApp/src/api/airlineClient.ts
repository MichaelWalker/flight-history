import type { ItemListResponse, Pagination, Sort } from "./apiHelpers";
import { getList } from "./apiHelpers";
import type { Airline } from "../models/airline";

async function list(
    pagination: Pagination,
    sort: Sort,
    search: string,
): Promise<ItemListResponse<Airline>> {
    return getList("/api/airlines", pagination, sort, search);
}

export const AirlineClient = {
    list,
};
