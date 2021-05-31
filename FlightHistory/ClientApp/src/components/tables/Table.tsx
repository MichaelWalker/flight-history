import React, {FunctionComponent, ReactElement, useEffect, useState} from "react";
import {TableHeader} from "./TableHeader";
import {TableRow} from "./TableRow";
import {Item, ItemListResponse, Pagination, Sort} from "../../api/apiHelpers";
import styles from "./Table.module.scss";
import {useFetchData} from "../../hooks/useFetchData";

export interface Header {
    displayName: string;
    sortName?: string;
}

const defaultPagination: Pagination = {
    page: 1,
    pageSize: 20,
}

interface TableProps<T extends Item> {
    fetchItems: (pagination: Pagination, sort?: Sort, search?: string) => Promise<ItemListResponse<T>>;
    renderRow: (data: T) => ReactElement;
    headers: Header[];
}

export function Table<T extends Item>({fetchItems, renderRow, headers}: TableProps<T>): ReactElement {
    const [pagination, setPagination] = useState<Pagination>(defaultPagination);
    const [sort, setSort] = useState<Sort | undefined>();
    const [search, setSearch] = useState<string | undefined>();
    const [startFetchData, fetchState] = useFetchData(fetchItems);

    useEffect(() => {
        startFetchData(pagination, sort, search)
    }, [pagination, sort, search]);
    
    function items() {
        if (fetchState.status === 'RELOADING' || fetchState.status === 'SUCCESS') {
            return fetchState.data.items
        }
        return [];
    }
    
    return (
        <table className={styles.table}>
            <thead>
                <tr>{headers.map(header => <TableHeader key={header.displayName} {...header} currentSort={sort} setSort={setSort}/>)}</tr>
            </thead>
            <tbody>
                {items().map(item => <TableRow key={item.id} item={item} renderRow={renderRow}/>)}
            </tbody>
        </table>
    );
}