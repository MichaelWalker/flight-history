import { css } from "@emotion/css";
import {
    COLOUR_PALETTES,
    COLOURS,
    gradientBackground,
    setColourPalette,
} from "../styles/colours.styles";
import { shadow } from "../styles/mixins.styles";
import { font, FONTS } from "../styles/fonts.styles";
import { len, SPACING } from "../styles/constants.styles";

const NAV_WIDTH = "30ch";
const NAV_GUTTERS = SPACING.MEDIUM;
const CONTENT_GUTTERS = SPACING.LARGE;
const PAGE_TOP_MARGIN = SPACING.SMALL;

export const pageContainer = css`
    ${setColourPalette(COLOUR_PALETTES.DEFAULT)}
    background: ${COLOURS.BACKGROUND};
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
`;

export const navContainer = css`
    ${setColourPalette(COLOUR_PALETTES.NAV)}
    ${shadow()}
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    width: ${NAV_WIDTH};
    background: ${COLOURS.BACKGROUND};
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    z-index: 1;
    overflow: hidden;
`;

export const homeLink = css`
    ${font(FONTS.LOGO)}
    margin: ${PAGE_TOP_MARGIN} ${NAV_GUTTERS} ${len(24)};
    padding-bottom: ${SPACING.SMALL};
    text-align: center;
`;

export const pageContent = css`
    position: fixed;
    left: ${NAV_WIDTH};
    top: 0;
    right: 0;
    bottom: 0;
    overflow-y: auto;
`;

export const header = css`
    ${gradientBackground()}
    height: ${len(32)};
`;

export const title = css`
    ${font(FONTS.PAGE_TITLE)}
    margin: ${PAGE_TOP_MARGIN} ${CONTENT_GUTTERS} 0;
    display: inline-block;
`;

export const main = css`
    padding: 0 ${CONTENT_GUTTERS} ${SPACING.LARGE};
    margin-top: -${SPACING.MEDIUM};
    display: inline-block;
    width: 100%;
    box-sizing: border-box;
`;

export const modalRoot = css`
    z-index: 2;
`;
