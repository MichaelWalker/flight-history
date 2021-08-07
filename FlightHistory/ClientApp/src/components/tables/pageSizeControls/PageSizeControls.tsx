import type { FunctionComponent } from "react";
import React from "react";
import type { Pagination } from "../../../api/apiHelpers";
import { getNewPagination } from "./pageSizeHelper";
import styles from "./PageSizeControls.module.scss";
import { useUniqueId } from "../../../hooks/useUniqueId";
import { PageSizeOption } from "./pageSizeOption/PageSizeOption";

interface PageSizeControlsProps {
    pagination: Pagination;
    setPagination: (pagination: Pagination) => void;
}

const OPTIONS = [10, 20, 50] as const;

export const PageSizeControls: FunctionComponent<PageSizeControlsProps> = ({
    pagination,
    setPagination,
}) => {
    const legendId = useUniqueId("page-size-controls-legend");
    const pageSize = pagination.pageSize;

    function updatePageSize(newPageSize: number) {
        setPagination(getNewPagination(pagination, newPageSize));
    }

    return (
        <div role="group" aria-labelledby={legendId} className={styles.fieldset}>
            <span className={styles.legend}>Showing</span>
            <div className={styles.inputsContainer}>
                {OPTIONS.map((option) => (
                    <PageSizeOption
                        key={option}
                        option={option}
                        pageSize={pageSize}
                        updatePageSize={updatePageSize}
                    />
                ))}
            </div>
            <span id={legendId} className={styles.legend}>
                results per page
            </span>
        </div>
    );
};
