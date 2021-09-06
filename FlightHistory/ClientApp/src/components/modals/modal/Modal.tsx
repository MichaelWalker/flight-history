import React, { FC } from "react";
import * as styles from "./modal.styles";

interface ModalProps {
    closeModal: () => void;
}

export const Modal: FC<ModalProps> = ({ closeModal, children }) => {
    return (
        <div className={styles.modal}>
            <button onClick={closeModal}>Close!</button>
            {children}
        </div>
    );
};
