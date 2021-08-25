import { css } from "@emotion/css";
import { formInput, formInputContainer, formLabel } from "../common.styles";

export const container = formInputContainer;

export function inputLabel(isCollapsed: boolean, isFocused: boolean): string {
    return formLabel(isCollapsed, isFocused);
}

export const input = formInput;
