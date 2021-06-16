import type { FunctionComponent } from "react";
import React, { useCallback } from "react";
import type { Pagination } from "../../../api/apiHelpers";
import styles from "./PageControls.module.scss";

interface PageControlProps {
    pagination: Pagination;
    setPagination: (pagination: Pagination) => void;
    totalCount: number;
}

export const PageControls: FunctionComponent<PageControlProps> = ({
    pagination,
    totalCount,
    setPagination,
}) => {
    const currentPage = pagination.page;
    const numberOfPages = Math.ceil(totalCount / pagination.pageSize);

    const setPage = useCallback(
        (page: number) => {
            setPagination({ page, pageSize: pagination.pageSize });
        },
        [pagination, setPagination],
    );

    if (numberOfPages <= 1) {
        return null;
    }

    // TODO Look up accessibility best practices. aria-controls?
    return (
        <div className={styles.pageControlsContainer} data-testid={"page-controls"}>
            <button
                type="button"
                className={styles.button}
                onClick={() => setPage(1)}
                disabled={currentPage === 1}
            >
                «
            </button>
            <button
                type="button"
                className={styles.button}
                onClick={() => setPage(currentPage - 1)}
                disabled={currentPage === 1}
            >
                ‹
            </button>
            <span className={styles.currentPage}>
                Page {currentPage} of {numberOfPages}
            </span>
            <button
                type="button"
                className={styles.button}
                onClick={() => setPage(currentPage + 1)}
                disabled={currentPage === numberOfPages}
            >
                ›
            </button>
            <button
                type="button"
                className={styles.button}
                onClick={() => setPage(numberOfPages)}
                disabled={currentPage === numberOfPages}
            >
                »
            </button>
        </div>
    );
};
