import {getList, ItemListResponse, Pagination, Sort} from "./apiHelpers";
import {Airline} from "../models/airline";

async function list(pagination: Pagination, sort: Sort, search: string): Promise<ItemListResponse<Airline>> {
    return getList('/api/airlines', pagination, sort, search);
}

export const AirlineClient = {
    list,
}
