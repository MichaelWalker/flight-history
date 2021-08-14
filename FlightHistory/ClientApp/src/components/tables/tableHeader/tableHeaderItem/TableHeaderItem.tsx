import type { FC } from "react";
import React from "react";
import type { Sort } from "../../../../api/apiHelpers";
import styles from "./TableHeaderItem.module.scss";
import { SortIndicator } from "./sortIndicator/SortIndicator";
import { SlideAndFade } from "../../../../transitions/SlideAndFade";

interface TableHeaderItemProps {
    displayName: string;
    setSort: (sort: Sort) => void;
    currentSort?: Sort;
    sortBy?: string;
}

export const TableHeaderItem: FC<TableHeaderItemProps> = ({
    displayName,
    currentSort,
    setSort,
    sortBy,
}) => {
    // TODO Table sort control Accessibility.

    const isCurrentSort = !!sortBy && currentSort?.sortBy === sortBy;
    const sortDirection = currentSort?.sortDirection ?? "ASC";

    function onClick(sortName: string) {
        if (!isCurrentSort) {
            setSort({ sortBy: sortName, sortDirection: "ASC" });
        } else {
            const newSortDirection = sortDirection === "ASC" ? "DESC" : "ASC";
            setSort({ sortBy: sortName, sortDirection: newSortDirection });
        }
    }

    if (sortBy) {
        return (
            <th className={styles.tableHeader}>
                <button className={styles.sortButton} type="button" onClick={() => onClick(sortBy)}>
                    {displayName}
                    <SlideAndFade stateKey={!isCurrentSort ? "not-current" : "current"}>
                        <SortIndicator
                            isCurrentSort={isCurrentSort}
                            sortDirection={sortDirection}
                        />
                    </SlideAndFade>
                </button>
            </th>
        );
    }

    return <th className={styles.tableHeader}>{displayName}</th>;
};
