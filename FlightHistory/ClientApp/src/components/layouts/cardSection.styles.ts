import { css } from "@emotion/css";
import { SECTION_SEPARATION, SPACING } from "../../styles/constants.styles";
import { font, FONTS } from "../../styles/fonts.styles";
import { card } from "../../styles/mixins.styles";

export function cardSection(extraCss?: string): string {
    return css`
        ${card()}
        margin-bottom: ${SECTION_SEPARATION};

        ${extraCss}
    `;
}

export const headingRow = css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: ${SPACING.MEDIUM};
`;

export const sectionTitle = css`
    ${font(FONTS.SECTION_TITLE)}
`;
