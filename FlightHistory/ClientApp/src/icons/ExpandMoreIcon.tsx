import type { FunctionComponent } from "react";
import React from "react";
import * as styles from "./icons.styles";

// https://fonts.google.com/icons?selected=Material%20Icons%20Round%3Aexpand_more%3A
export const ExpandMoreIcon: FunctionComponent = () => {
    return (
        <svg className={styles.icon} viewBox="0 0 24 24">
            <path d="M24 24H0V0h24v24z" fill="none" opacity=".87" />
            <path d="M15.88 9.29L12 13.17 8.12 9.29c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z" />
        </svg>
    );
};
