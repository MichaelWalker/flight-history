import React, {FunctionComponent, ReactElement, useState} from "react";
import {TableHeader} from "./TableHeader";
import {TableRow} from "./TableRow";

export interface TableItem {
    id: number;
}

interface Header {
    displayName: string;
    sortName?: string;
}

interface Pagination {
    page: number;
    pageSize: number;
}

const defaultPagination: Pagination = {
    page: 1,
    pageSize: 20,
}

export type SortDirection = 'ASC' | 'DESC';

export interface Sort {
    sortBy: string;
    sortDirection: SortDirection;
}

interface TableProps<T extends TableItem> {
    fetchItems: () => T[];
    renderRow: (data: T) => ReactElement;
    headers: Header[];
}

export function Table<T extends TableItem>({fetchItems, renderRow, headers}: TableProps<T>): ReactElement {
    const [sort, setSort] = useState<Sort | null>(null);
    const [pagination, setPagination] = useState<Pagination>(defaultPagination);
    const [items, setItems] = useState<T[]>([]);
    
    return (
        <table>
            <thead>
                <tr>{headers.map(header => <TableHeader {...header} currentSort={sort} setSort={setSort}/>)}</tr>
            </thead>
            <tbody>
                {items.map(item => <TableRow item={item} renderRow={renderRow}/>)}
            </tbody>
        </table>
    );
}