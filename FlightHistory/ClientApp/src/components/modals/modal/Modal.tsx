import React, { FC } from "react";

interface ModalProps {
    closeModal: () => void;
}

export const Modal: FC<ModalProps> = ({ closeModal, children }) => {
    return (
        <div>
            <button onClick={closeModal}>Close!</button>
            {children}
        </div>
    );
};
