import React, { ReactNode, useCallback, useState } from "react";
import { createPortal } from "react-dom";
import { Modal } from "../components/modals/modal/Modal";
import { ModalContainer } from "../components/modals/modalContainer/ModalContainer";

export const MODAL_ROOT_ID = "modal-root";

interface UseModalResult {
    openModal: () => void;
    renderInModal: (modal: ReactNode) => ReactNode;
}

export function useModal(): UseModalResult {
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
            console.log("keyboard event");
            if (event.key === "Escape") {
                closeModal();
            }
        },
        [closeModal],
    );

    function renderInModal(modal: ReactNode): ReactNode {
        const rootElement = document.getElementById(MODAL_ROOT_ID);
        if (!rootElement) {
            return null;
        }

        return createPortal(
            <ModalContainer isOpen={isOpen} closeModal={closeModal}>
                <Modal closeModal={closeModal}>{modal}</Modal>
            </ModalContainer>,
            rootElement,
        );
    }

    return {
        openModal,
        renderInModal,
    };
}
