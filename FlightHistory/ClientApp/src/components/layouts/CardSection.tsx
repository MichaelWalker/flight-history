import type { FunctionComponent } from "react";
import React from "react";
import * as styles from "./cardSection.styles";

interface CardSectionProps {
    title: string;
    className?: string;
}

export const CardSection: FunctionComponent<CardSectionProps> = ({ title, className, children }) => {
    return (
        <section className={styles.cardSection(className)}>
            <h2 className={styles.sectionTitle}>{title}</h2>
            {children}
        </section>
    );
};
