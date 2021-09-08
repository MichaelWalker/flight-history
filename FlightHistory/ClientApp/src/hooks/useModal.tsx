import React, { ReactNode, useCallback, useState } from "react";
import { createPortal } from "react-dom";
import { Modal } from "../components/modals/modal/Modal";
import { ModalContainer } from "../components/modals/modalContainer/ModalContainer";

export const MODAL_ROOT_ID = "modal-root";

interface UseModalResult {
    openModal: () => void;
    renderInModal: (modal: ReactNode) => ReactNode;
}

export function useModal(title: string): UseModalResult {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = useCallback(() => {
        setIsOpen(true);
        document.addEventListener("keydown", closeOnEscape);
    }, [setIsOpen]);

    const closeModal = useCallback(() => {
        setIsOpen(false);
        document.removeEventListener("keydown", closeOnEscape);
    }, [setIsOpen]);

    const closeOnEscape = useCallback(
        (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                closeModal();
            }
        },
        [closeModal],
    );

    function renderInModal(modalContents: ReactNode): ReactNode {
        const rootElement = document.getElementById(MODAL_ROOT_ID);
        if (!rootElement) {
            return null;
        }

        return createPortal(
            <ModalContainer isOpen={isOpen} closeModal={closeModal}>
                <Modal title={title} closeModal={closeModal}>
                    {modalContents}
                </Modal>
            </ModalContainer>,
            rootElement,
        );
    }

    return {
        openModal,
        renderInModal,
    };
}
