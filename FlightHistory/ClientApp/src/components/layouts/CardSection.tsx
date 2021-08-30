import type { FunctionComponent, ReactNode } from "react";
import React from "react";
import * as styles from "./cardSection.styles";

interface CardSectionProps {
    title: string;
    actions?: ReactNode;
    className?: string;
}

export const CardSection: FunctionComponent<CardSectionProps> = ({
    title,
    actions,
    className,
    children,
}) => {
    return (
        <section className={styles.cardSection(className)}>
            <div className={styles.headingRow}>
                <h2 className={styles.sectionTitle}>{title}</h2>
                {actions}
            </div>
            {children}
        </section>
    );
};
