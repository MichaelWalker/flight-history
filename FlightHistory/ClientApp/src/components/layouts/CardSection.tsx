import type { FunctionComponent } from "react";
import React from "react";
import styles from "./CardSection.module.scss";

interface CardSectionProps {
    title: string;
}

export const CardSection: FunctionComponent<CardSectionProps> = ({ title, children }) => {
    return (
        <section className={styles.cardSection}>
            <h2 className={styles.sectionTitle}>{title}</h2>
            {children}
        </section>
    );
};
