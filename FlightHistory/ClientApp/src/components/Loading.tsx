import React, {FunctionComponent} from "react";
import styles from "./Loading.module.scss";

export const Loading: FunctionComponent = () => {
    return (
        <div className={styles.loadingRipple}>
            <div/>
            <div/>
        </div>
    );
};