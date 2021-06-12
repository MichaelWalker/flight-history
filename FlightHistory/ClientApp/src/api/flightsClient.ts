import { getList, ItemListResponse, Pagination, Sort } from "./apiHelpers";
import { Flight } from "../models/flight";

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
