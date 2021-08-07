import type { FunctionComponent } from "react";
import React, { useState } from "react";
import type { Sort, SortDirection } from "../../../api/apiHelpers";
import styles from "./TableHeader.module.scss";

interface TableHeaderProps {
    displayName: string;
    setSort: (sort: Sort) => void;
    currentSort?: Sort;
    sortBy?: string;
}

export const TableHeader: FunctionComponent<TableHeaderProps> = ({
    displayName,
    currentSort,
    setSort,
    sortBy,
}) => {
    const isCurrentSort = !!sortBy && currentSort?.sortBy === sortBy;

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const initialSortDirection = isCurrentSort ? currentSort!.sortDirection : "ASC";

    const [sortDirection, setSortDirection] = useState<SortDirection>(initialSortDirection);

    function onClick(sortName: string) {
        if (!isCurrentSort) {
            setSort({ sortBy: sortName, sortDirection });
        } else {
            const newSortDirection = sortDirection === "ASC" ? "DESC" : "ASC";
            setSortDirection(newSortDirection);
            setSort({ sortBy: sortName, sortDirection: newSortDirection });
        }
    }

    if (sortBy) {
        return (
            <th className={styles.tableHeader}>
                <button type="button" onClick={() => onClick(sortBy)}>
                    {displayName}
                </button>
            </th>
        );
    }

    return <th className={styles.tableHeader}>{displayName}</th>;
};
