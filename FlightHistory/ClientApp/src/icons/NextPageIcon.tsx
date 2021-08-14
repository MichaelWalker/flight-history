import type { FunctionComponent } from "react";
import React from "react";
import styles from "./Icons.module.scss";

// https://fonts.google.com/icons?selected=Material%20Icons%20Round%3Anavigate_next%3A
export const NextPageIcon: FunctionComponent = () => {
    return (
        <svg className={styles.icon} viewBox="0 0 24 24">
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M9.31 6.71c-.39.39-.39 1.02 0 1.41L13.19 12l-3.88 3.88c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41L10.72 6.7c-.38-.38-1.02-.38-1.41.01z" />
        </svg>
    );
};
