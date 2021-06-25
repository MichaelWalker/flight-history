import type { FunctionComponent } from "react";
import React from "react";
import styles from "./Icons.module.scss";

export const NextPageIcon: FunctionComponent = () => {
    return (
        <svg className={styles.icon} viewBox="0 0 24 24">
            <title>Next Page</title>
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M10.02 6L8.61 7.41 13.19 12l-4.58 4.59L10.02 18l6-6-6-6z" />
        </svg>
    );
};
