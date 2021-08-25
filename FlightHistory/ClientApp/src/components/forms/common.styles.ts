import { css } from "@emotion/css";
import { COLOUR_PALETTES, COLOURS, setColourPalette } from "../../styles/colours.styles";
import { len, SPACING, TRANSITIONS } from "../../styles/constants.styles";
import { font, FONTS } from "../../styles/fonts.styles";
import { focusable } from "../../styles/mixins.styles";

export const formInputContainer = css`
    position: relative;
    display: block;
    padding-top: ${len(FONTS.INPUT_LABEL_COLLAPSED.lineHeight)};
    margin-bottom: ${SPACING.MEDIUM};
`;

export const formLabel = (isCollapsed: boolean, isFocused: boolean): string => {
    const common = css`
        ${setColourPalette(isFocused ? COLOUR_PALETTES.ACTIVE : COLOUR_PALETTES.LABEL)}
        transition: all ease ${TRANSITIONS.DEFAULT};
        position: absolute;
        display: inline-block;
        left: 0;
    `;

    if (isCollapsed) {
        return css`
            ${common}
            ${font(FONTS.INPUT_LABEL_COLLAPSED)}
            top: 0;
        `;
    }

    return css`
        ${common}
        ${font(FONTS.INPUT_LABEL_EXPANDED)}
        top: ${len(FONTS.INPUT_LABEL_COLLAPSED.lineHeight)};
    `;
};

export function formInput(labelIsCollapsed: boolean) {
    return css`
        ${font(FONTS.INPUT)}
        color: ${labelIsCollapsed ? COLOURS.FOREGROUND : COLOURS.BACKGROUND};
        width: 100%;
        height: ${len(FONTS.INPUT.lineHeight)};
        border: none;
        border-bottom: 1px solid ${COLOURS.FOREGROUND};
        outline: none;
        transition: all ease ${TRANSITIONS.DEFAULT};

        &:focus-within {
            border-color: ${COLOURS.PRIMARY};
        }
    `;
}
