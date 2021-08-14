import type { FC } from "react";
import React, { memo } from "react";
import { SortDirectionIcon } from "../../../../../icons/SortDirectionIcon";
import styles from "./SortIndicator.module.scss";
import { SortableIcon } from "../../../../../icons/SortableIcon";
import type { SortDirection } from "../../../../../api/apiHelpers";

interface SortIndicatorProps {
    isCurrentSort: boolean;
    sortDirection: SortDirection;
}

export const SortIndicator: FC<SortIndicatorProps> = memo(({ isCurrentSort, sortDirection }) => {
    if (isCurrentSort) {
        return (
            <span className={sortDirection === "ASC" ? styles.ascending : styles.descending}>
                <SortDirectionIcon />
            </span>
        );
    }

    return (
        <span className={styles.sortable}>
            <SortableIcon />
        </span>
    );
});

SortIndicator.displayName = "SortIndicator";
