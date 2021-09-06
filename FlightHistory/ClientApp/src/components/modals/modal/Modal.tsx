import React, { FC, MouseEvent, useEffect } from "react";
import * as styles from "./modal.styles";

interface ModalProps {
    closeModal: () => void;
}

export const Modal: FC<ModalProps> = ({ closeModal, children }) => {
    return (
        <div
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
        >
            <button onClick={closeModal}>Close!</button>
            {children}
        </div>
    );
};
