import React, {FunctionComponent, useCallback} from "react";
import {Pagination} from "../../../api/apiHelpers";
import styles from "./PageControls.module.scss";

interface PageControlProps {
    pagination: Pagination;
    setPagination: (pagination: Pagination) => void;
    totalCount: number;
}

export const PageControls: FunctionComponent<PageControlProps> = ({pagination, totalCount, setPagination}) => {
    const page = pagination.page;
    const numberOfPages = Math.ceil(totalCount / pagination.pageSize);
    
    const setPage = useCallback((page: number) => {
        setPagination({page, pageSize: pagination.pageSize});
    }, [pagination, setPagination]);
    
    if (numberOfPages <= 1) {
        return null;
    }
    
    // TODO Look up accessibility best practices. aria-controls?
    return (
        <div className={styles.pageControlsContainer} data-testid={'page-controls'}>
            <button className={styles.button} onClick={() => setPage(1)} disabled={page === 1}>«</button>
            <button className={styles.button} onClick={() => setPage(page - 1)} disabled={page === 1}>‹</button>
            <span className={styles.currentPage}>Page {page} of {numberOfPages}</span>
            <button className={styles.button} onClick={() => setPage(page + 1)} disabled={page === numberOfPages}>›</button>
            <button className={styles.button} onClick={() => setPage(numberOfPages)} disabled={page === numberOfPages}>»</button>
        </div>
    );
}
    