import {getList, ItemListResponse, Pagination, Sort} from "./apiHelpers";
import {Airport} from "../models/airport";

async function list(pagination: Pagination, sort: Sort, search: string): Promise<ItemListResponse<Airport>> {
    return getList('/api/airports', pagination, sort, search);
}

export const AirportsClient = {
    list,
}
