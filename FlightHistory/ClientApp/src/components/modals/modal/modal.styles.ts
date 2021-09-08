import { css } from "@emotion/css";
import { len, SPACING } from "../../../styles/constants.styles";
import { font, FONTS } from "../../../styles/fonts.styles";
import { card } from "../../../styles/mixins.styles";

export const modal = css`
    ${card()}
    min-width: ${len(120)};
    max-height: ${len(240)};
    overflow-y: auto;
`;

export const headingRow = css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: ${SPACING.MEDIUM};
`;

export const heading = css`
    ${font(FONTS.SECTION_TITLE)};
`;
