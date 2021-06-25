import type { FunctionComponent } from "react";
import React from "react";
import styles from "./Icons.module.scss";

export const FirstPageIcon: FunctionComponent = () => {
    return (
        <svg className={styles.icon} viewBox="0 0 24 24">
            <title>First Page</title>
            <path d="M24 0v24H0V0h24z" fill="none" opacity=".87" />
            <path d="M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6 1.41-1.41zM6 6h2v12H6V6z" />
        </svg>
    );
};
