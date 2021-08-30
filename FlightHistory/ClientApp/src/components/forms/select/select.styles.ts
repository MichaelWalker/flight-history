import { css, CSSObject } from "@emotion/css";
import { OptionProps } from "react-select";
import {
    COLOUR_PALETTES,
    COLOURS,
    setColourPalette,
    setColourPaletteObject,
} from "../../../styles/colours.styles";
import { len, TRANSITIONS } from "../../../styles/constants.styles";
import { fontObject, FONTS } from "../../../styles/fonts.styles";
import { fieldContainer, label, validationError } from "../formField.styles";

export const selectContainer = fieldContainer;
export const selectLabel = label;
export const selectValidationError = validationError;

export const dropdownIndicator = css`
    width: ${len(6)};
    height: ${len(6)};
`;

export const clearIndicator = css`
    width: ${len(5)};
    height: ${len(5)};
    background: transparent;
`;

export const control = (): CSSObject => {
    return {
        position: "relative",
        minHeight: len(FONTS.INPUT.lineHeight),
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        border: "none",
        borderRadius: 0,
        borderBottom: `1px solid ${COLOURS.FOREGROUND}`,
        boxShadow: "none",
        transition: `all ease ${TRANSITIONS.DEFAULT}`,

        ":focus-within": {
            ...setColourPaletteObject(COLOUR_PALETTES.ACTIVE),
        },
    };
};

export const input = () => {
    return {
        ...setColourPaletteObject(COLOUR_PALETTES.DEFAULT),
        ...fontObject(FONTS.INPUT),
    };
};

export const indicatorSeparator = () => {
    return {
        display: "none",
    };
};

export const valueContainer = (base: CSSObject) => {
    return {
        ...base,
        paddingLeft: 0,
    };
};

export const singleValue = (base: CSSObject) => {
    return {
        ...base,
        ...setColourPaletteObject(COLOUR_PALETTES.DEFAULT),
        ...fontObject(FONTS.INPUT),
        marginLeft: 0,
    };
};

export const loadingMessage = (base: CSSObject) => {
    return {
        ...base,
        ...fontObject(FONTS.DEFAULT),
    };
};

export const noOptionsMessage = (base: CSSObject) => {
    return {
        ...base,
        ...fontObject(FONTS.DEFAULT),
    };
};

export const option = <T>(base: CSSObject, state: OptionProps<T, false, any>) => {
    return {
        ...base,
        ...fontObject(FONTS.DEFAULT),
        backgroundColor:
            state.isSelected || state.isFocused ? COLOURS.BACKGROUND_SELECTED : COLOURS.BACKGROUND,
    };
};
