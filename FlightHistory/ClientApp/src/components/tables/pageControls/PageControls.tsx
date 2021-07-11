import type { FunctionComponent } from "react";
import React, { useCallback } from "react";
import type { Pagination } from "../../../api/apiHelpers";
import styles from "./PageControls.module.scss";
import { FirstPageIcon } from "../../../icons/FirstPageIcon";
import { PreviousPageIcon } from "../../../icons/PreviousPageIcon";
import { NextPageIcon } from "../../../icons/NextPageIcon";
import { LastPageIcon } from "../../../icons/LastPageIcon";

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

    // TODO Look up accessibility best practices. aria-controls?
    return (
        <div className={styles.pageControlsContainer} data-testid={"page-controls"}>
            <button
                type="button"
                className={styles.button}
                onClick={() => setPage(1)}
                disabled={currentPage === 1}
                data-testid={"first-page-button"}
            >
                <FirstPageIcon />
            </button>
            <button
                type="button"
                className={styles.button}
                onClick={() => setPage(currentPage - 1)}
                disabled={currentPage === 1}
                data-testid={"previous-page-button"}
            >
                <PreviousPageIcon />
            </button>
            <span className={styles.currentPage}>
                Page {currentPage} of {numberOfPages}
            </span>
            <button
                type="button"
                className={styles.button}
                onClick={() => setPage(currentPage + 1)}
                disabled={currentPage === numberOfPages}
                data-testid={"next-page-button"}
            >
                <NextPageIcon />
            </button>
            <button
                type="button"
                className={styles.button}
                onClick={() => setPage(numberOfPages)}
                disabled={currentPage === numberOfPages}
                data-testid={"last-page-button"}
            >
                <LastPageIcon aria-hidden={true} />
            </button>
        </div>
    );
};
