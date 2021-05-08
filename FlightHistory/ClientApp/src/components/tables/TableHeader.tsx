import React, {FunctionComponent, useState} from "react";
import {Sort, SortDirection} from "../../api/apiHelpers";
import styles from "./TableHeader.module.scss";

interface TableHeaderProps {
    displayName: string;
    setSort: (sort: Sort) => void;
    currentSort?: Sort;
    sortBy?: string;
}

export const TableHeader: FunctionComponent<TableHeaderProps> = ({displayName, currentSort, setSort, sortBy}) => {
    const [sortDirection, setSortDirection] = useState<SortDirection>('ASC');
    const isSortEnabled = !!sortBy;
    const isCurrentSort = isSortEnabled && currentSort?.sortBy === sortBy;
    
    function onClick() {
        if (!sortBy) {
            return;
        }
        
        if (!isCurrentSort) {
            setSort({sortBy, sortDirection});
        } else {
            const newSortDirection = sortDirection === 'ASC' ? 'DESC' : 'ASC';
            setSortDirection(newSortDirection);
            setSort({sortBy, sortDirection: newSortDirection});
        }
    }
    
    if (isSortEnabled) {
        return (
            <th className={styles.tableHeader}>
                <button onClick={onClick}>{displayName}</button>   
            </th>
        )
    }
    
    return (
        <th className={styles.tableHeader}>{displayName}</th>
    );
}