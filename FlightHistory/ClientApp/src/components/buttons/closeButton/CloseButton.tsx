import React, { FC } from "react";
import { CloseIcon } from "../../../icons/CloseIcon";
import * as styles from "../button.styles";

interface CloseButtonProps {
    onClick: () => void;
}

export const CloseButton: FC<CloseButtonProps> = ({ onClick, children }) => {
    return (
        <button
            onClick={onClick}
            type="button"
            aria-label={"Close"}
            className={styles.transparentButton}
        >
            <CloseIcon />
        </button>
    );
};
