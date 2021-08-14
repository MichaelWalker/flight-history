import type { FunctionComponent } from "react";
import React from "react";
import styles from "./Icons.module.scss";

// https://fonts.google.com/icons?selected=Material%20Icons%20Round%3Sort%3A
export const SortableIcon: FunctionComponent = () => {
    return (
        <svg className={styles.icon} viewBox="0 0 24 24">
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M4 18h4c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zM3 7c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1zm1 6h10c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1z" />
        </svg>
    );
};
