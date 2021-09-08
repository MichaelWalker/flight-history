import React, { FC, MouseEvent, useEffect } from "react";
import { CloseIcon } from "../../../icons/CloseIcon";
import { CloseButton } from "../../buttons/closeButton/CloseButton";
import * as styles from "./modal.styles";

interface ModalProps {
    title: string;
    closeModal: () => void;
}

export const Modal: FC<ModalProps> = ({ title, closeModal, children }) => {
    return (
        <div
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
        >
            <div className={styles.headingRow}>
                <h2 className={styles.heading}>{title}</h2>
                <CloseButton onClick={closeModal} />
            </div>
            {children}
        </div>
    );
};
