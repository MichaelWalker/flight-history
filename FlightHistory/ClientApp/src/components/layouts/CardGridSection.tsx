import React, {FunctionComponent} from "react";
import styles from "./CardGridSection.module.scss";

const CardGridSection: FunctionComponent = ({children}) => {
    return (
        <section className={styles.cardGrid}>
            {children}
        </section>
    );
}