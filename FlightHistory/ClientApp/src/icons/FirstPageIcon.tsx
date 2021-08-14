import type { FunctionComponent } from "react";
import React from "react";
import styles from "./Icons.module.scss";

// https://fonts.google.com/icons?selected=Material%20Icons%20Round%3Afirst_page%3A
export const FirstPageIcon: FunctionComponent = () => {
    return (
        <svg className={styles.icon} viewBox="0 0 24 24">
            <path d="M24 0v24H0V0h24z" fill="none" opacity=".87" />
            <path d="M17.7 15.89L13.82 12l3.89-3.89c.39-.39.39-1.02 0-1.41-.39-.39-1.02-.39-1.41 0l-4.59 4.59c-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0 .38-.38.38-1.02-.01-1.4zM7 6c.55 0 1 .45 1 1v10c0 .55-.45 1-1 1s-1-.45-1-1V7c0-.55.45-1 1-1z" />
        </svg>
    );
};
