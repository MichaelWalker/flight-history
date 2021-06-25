import type { FunctionComponent } from "react";
import React from "react";
import styles from "./Icons.module.scss";

export const PreviousPageIcon: FunctionComponent = () => {
    return (
        <svg className={styles.icon} viewBox="0 0 24 24">
            <title>Previous Page</title>
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M15.61 7.41L14.2 6l-6 6 6 6 1.41-1.41L11.03 12l4.58-4.59z" />
        </svg>
    );
};
