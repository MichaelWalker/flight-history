import type { FunctionComponent } from "react";
import React from "react";
import { H2, Section } from "../../wrappers/StyledWrappers";
import * as styles from "./cardSection.styles";

interface CardSectionProps {
    title: string;
}

export const CardSection: FunctionComponent<CardSectionProps> = ({ title, children }) => {
    return (
        <Section css={styles.cardSection}>
            <H2 css={styles.sectionTitle}>{title}</H2>
            {children}
        </Section>
    );
};
