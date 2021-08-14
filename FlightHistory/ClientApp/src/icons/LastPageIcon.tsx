import type { FunctionComponent } from "react";
import React from "react";
import styles from "./Icons.module.scss";

// https://fonts.google.com/icons?selected=Material%20Icons%20Round%3Alast_page%3A
export const LastPageIcon: FunctionComponent = () => {
    return (
        <svg className={styles.icon} viewBox="0 0 24 24">
            <path d="M0 0h24v24H0V0z" fill="none" opacity=".87" />
            <path d="M6.29 8.11L10.18 12l-3.89 3.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41L7.7 6.7c-.39-.39-1.02-.39-1.41 0-.38.39-.38 1.03 0 1.41zM17 6c.55 0 1 .45 1 1v10c0 .55-.45 1-1 1s-1-.45-1-1V7c0-.55.45-1 1-1z" />
        </svg>
    );
};
