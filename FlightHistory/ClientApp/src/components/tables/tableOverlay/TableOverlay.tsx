import React, {FunctionComponent, ReactElement} from "react";
import {FetchDataState} from "../../../hooks/useFetchData";
import {LoadingAnimation} from "../../../icons/loadingAnimation/LoadingAnimation";
import styles from './TableOverlay.module.scss';

interface TableOverlayProps<T> {
    state: FetchDataState<T>;
    reload: () => void;
}

interface ErrorOverlayProps {
    reload: () => void;
}

export function ErrorOverlay({reload}: ErrorOverlayProps): ReactElement {
    return (
        <div className={styles.errorOverlay}>
            Sorry, something went went wrong.
            <button className={styles.retryButton} onClick={reload}>Retry</button>
        </div>
    );
}

export function TableOverlay<T>({state, reload}: TableOverlayProps<T>): ReactElement | null {
    switch (state.status) {
        case "RELOADING":
        case "LOADING":
            return <div className={styles.loadingOverlay}><LoadingAnimation size={'LARGE'}/></div>;
        case "FAILED":  
            return <ErrorOverlay reload={reload} />;
        default:
            return null;
    }
} 