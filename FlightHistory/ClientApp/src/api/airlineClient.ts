import {getList, Pagination, Sort} from "./apiHelpers";

async function list(pagination: Pagination, sort: Sort, search: string) {
    return getList('/api/airlines', pagination, sort, search);
}

export const AirlineClient = {
    list,
}