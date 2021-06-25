﻿import type { FunctionComponent } from "react";
import React from "react";
import styles from "./Icons.module.scss";

export const AirlineIcon: FunctionComponent = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={styles.icon}>
            <rect fill="none" height="24" width="24" y="0" />
            <path d="M17.34,18H5.8l8.25-12h5.54L17.34,18z M13,4L2,20h17l3-16H13z M14.5,9c-1.38,0-2.5,1.12-2.5,2.5s1.12,2.5,2.5,2.5 s2.5-1.12,2.5-2.5S15.88,9,14.5,9z" />
        </svg>
    );
};
