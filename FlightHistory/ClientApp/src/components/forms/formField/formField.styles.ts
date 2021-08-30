import { css } from "@emotion/css";
import {
    COLOUR_PALETTES,
    ColourPalette,
    COLOURS,
    setColourPalette,
} from "../../../styles/colours.styles";
import { len, SPACING, TRANSITIONS } from "../../../styles/constants.styles";
import { font, FONTS } from "../../../styles/fonts.styles";

function getPalette(
    isFocused: boolean,
    validationError: string | null,
    defaultPalette: ColourPalette,
): ColourPalette {
    if (validationError) {
        return COLOUR_PALETTES.ERROR_MESSAGE;
    }

    if (isFocused) {
        return COLOUR_PALETTES.ACTIVE;
    }

    return defaultPalette;
}

export function field(isFocused: boolean, validationError: string | null): string {
    return css`
        ${setColourPalette(getPalette(isFocused, validationError, COLOUR_PALETTES.DEFAULT))}
        position: relative;
        display: block;
        padding-top: ${len(FONTS.INPUT_LABEL_COLLAPSED.lineHeight)};
        margin-bottom: ${SPACING.MEDIUM};
    `;
}

export function label(
    isFocused: boolean,
    isCollapsed: boolean,
    validationError: string | null,
): string {
    const common = css`
        ${setColourPalette(getPalette(isFocused, validationError, COLOUR_PALETTES.LABEL))}
        transition: all ease ${TRANSITIONS.DEFAULT};
        position: absolute;
        display: inline-block;
        left: 0;
        z-index: 1;
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
}

export function inputContainer(isLabelCollapsed: boolean) {
    return css`
        border-bottom: 1px solid ${COLOURS.FOREGROUND};
        transition: all ease ${TRANSITIONS.DEFAULT};

        * {
            opacity: ${isLabelCollapsed ? 1 : 0};
        }
    `;
}

export const validationError = css`
    ${font(FONTS.DEFAULT)}
    ${setColourPalette(COLOUR_PALETTES.ERROR_MESSAGE)}
`;
