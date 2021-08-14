import { css } from "styled-components";
import { SECTION_SEPARATION, SPACING } from "../../styles/constants.styles";
import { font, FONTS } from "../../styles/fonts.styles";
import { card } from "../../styles/mixins.styles";

export const cardSection = css`
    ${card()}
    margin-bottom: ${SECTION_SEPARATION};
`;

export const sectionTitle = css`
    ${font(FONTS.SECTION_TITLE)}
    margin-bottom: ${SPACING.MEDIUM};
`;
