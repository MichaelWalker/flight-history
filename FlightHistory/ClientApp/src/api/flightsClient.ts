import type { ItemListResponse, Pagination, Sort } from "./apiHelpers";
import { getList } from "./apiHelpers";
import type { Flight } from "../models/flight";

async function list(
    pagination: Pagination,
    sort: Sort,
    search: string,
): Promise<ItemListResponse<Flight>> {
    return getList("/api/flights", pagination, sort, search);
}

export const FlightClient = {
    list,
};
