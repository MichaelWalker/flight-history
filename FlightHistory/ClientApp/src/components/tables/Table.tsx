import React, {FunctionComponent, ReactElement, useEffect, useState} from "react";
import {TableHeader} from "./TableHeader";
import {TableRow} from "./TableRow";
import {Item, ItemListResponse, Pagination, Sort} from "../../api/apiHelpers";
import styles from "./Table.module.scss";

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
    const [items, setItems] = useState<T[]>([]);
    const [count, setCount] = useState<number>(0);
    
    useEffect(() => {
        fetchItems(pagination, sort, search)
            .then(results => {
                setItems(results.items);
                setCount(results.count);
            });
    }, [sort, pagination, search]);
    
    return (
        <table className={styles.table}>
            <thead>
                <tr>{headers.map(header => <TableHeader {...header} currentSort={sort} setSort={setSort}/>)}</tr>
            </thead>
            <tbody>
                {items.map(item => <TableRow item={item} renderRow={renderRow}/>)}
            </tbody>
        </table>
    );
}