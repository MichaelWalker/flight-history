import type { ReactElement } from "react";
import React from "react";
import type { FetchDataState } from "../../../hooks/useFetchData";
import { LoadingAnimation } from "../../../icons/loadingAnimation/LoadingAnimation";
import styles from "./TableOverlay.module.scss";

interface TableOverlayProps<T> {
    state: FetchDataState<T>;
    reload: () => void;
}

interface ErrorOverlayProps {
    reload: () => void;
}

export function ErrorOverlay({ reload }: ErrorOverlayProps): ReactElement {
    return (
        <div className={styles.errorOverlay} data-testid={"table-error-overlay"}>
            Sorry, something went wrong.
            <button type="button" className={styles.retryButton} onClick={reload}>
                Retry
            </button>
        </div>
    );
}

export function TableOverlay<T>({ state, reload }: TableOverlayProps<T>): ReactElement | null {
    switch (state.status) {
        case "RELOADING":
        case "LOADING":
            return (
                <div className={styles.loadingOverlay} data-testid={"table-loading-overlay"}>
                    <LoadingAnimation size={"LARGE"} />
                </div>
            );
        case "FAILED":
            return <ErrorOverlay reload={reload} />;
        default:
            return null;
    }
}
