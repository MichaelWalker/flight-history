import { css, FlattenSimpleInterpolation } from "styled-components";
import { SECTION_SEPARATION, SPACING } from "../../styles/constants.styles";
import { font, FONTS } from "../../styles/fonts.styles";
import { card } from "../../styles/mixins.styles";
import { CSS } from "../../wrappers/StyledWrappers";

export function cardSection(extraCss?: CSS) {
    return css`
        ${card()}
        margin-bottom: ${SECTION_SEPARATION};

        ${extraCss}
    `;
}

export const sectionTitle = css`
    ${font(FONTS.SECTION_TITLE)}
    margin-bottom: ${SPACING.MEDIUM};
`;
