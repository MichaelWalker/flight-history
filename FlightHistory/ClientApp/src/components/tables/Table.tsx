import type { ReactElement } from "react";
import React, { useCallback, useEffect, useState } from "react";
import { TableHeader } from "./TableHeader";
import { TableRow } from "./TableRow";
import type { Item, ItemListResponse, Pagination, Sort } from "../../api/apiHelpers";
import styles from "./Table.module.scss";
import { useFetchData } from "../../hooks/useFetchData";
import { TableOverlay } from "./tableOverlay/TableOverlay";
import { PageControls } from "./pageControls/PageControls";
import { PageSizeControls } from "./pageSizeControls/PageSizeControls";

export interface Header {
    displayName: string;
    sortName?: string;
}

const defaultPagination: Pagination = {
    page: 1,
    pageSize: 10,
};

interface TableProps<T extends Item> {
    fetchItems: (
        pagination: Pagination,
        sort?: Sort,
        search?: string,
    ) => Promise<ItemListResponse<T>>;
    renderRow: (data: T) => ReactElement;
    headers: Header[];
}

export function Table<T extends Item>({
    fetchItems,
    renderRow,
    headers,
}: TableProps<T>): ReactElement {
    const [pagination, setPagination] = useState<Pagination>(defaultPagination);
    const [sort, setSort] = useState<Sort | undefined>();
    const [search] = useState<string | undefined>();
    const [startFetchData, fetchState] = useFetchData(fetchItems);

    const fetchData = useCallback(() => {
        startFetchData(pagination, sort, search);
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [pagination, sort, search]);

    useEffect(fetchData, [fetchData]);

    function items(): T[] {
        if (fetchState.status === "RELOADING" || fetchState.status === "SUCCESS") {
            return fetchState.data.items;
        }
        return [];
    }

    function itemCount(): number {
        if (fetchState.status === "RELOADING" || fetchState.status === "SUCCESS") {
            return fetchState.data.count;
        }
        return 0;
    }

    return (
        <>
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            {headers.map((header) => (
                                <TableHeader
                                    {...header}
                                    key={header.displayName}
                                    currentSort={sort}
                                    setSort={setSort}
                                />
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {items().map((item) => (
                            <TableRow key={item.id} item={item} renderRow={renderRow} />
                        ))}
                    </tbody>
                </table>
                <TableOverlay state={fetchState} reload={fetchData} />
            </div>
            <div className={styles.pagination}>
                <PageSizeControls pagination={pagination} setPagination={setPagination} />
                <PageControls
                    pagination={pagination}
                    setPagination={setPagination}
                    totalCount={itemCount()}
                />
            </div>
        </>
    );
}
