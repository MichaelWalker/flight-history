import type { FunctionComponent } from "react";
import React from "react";
import type { FlattenSimpleInterpolation } from "styled-components";
import { H2, Section } from "../../wrappers/StyledWrappers";
import * as styles from "./cardSection.styles";

interface CardSectionProps {
    title: string;
    css?: FlattenSimpleInterpolation;
}

export const CardSection: FunctionComponent<CardSectionProps> = ({ title, css, children }) => {
    return (
        <Section css={styles.cardSection(css)}>
            <H2 css={styles.sectionTitle}>{title}</H2>
            {children}
        </Section>
    );
};
