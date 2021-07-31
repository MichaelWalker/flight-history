import type { FormEvent, ReactElement, ReactNode } from "react";
import React, { useEffect, useState } from "react";
import { SubmitButton } from "./SubmitButton";
import styles from "./Form.module.scss";
import { CSSTransition } from "react-transition-group";
import type { ApiError } from "../../api/requests";

export type FormState<T> =
    | { status: "INCOMPLETE" }
    | { status: "COMPLETE" }
    | { status: "SUBMITTING" }
    | { status: "ERROR"; error: ApiError }
    | { status: "SUCCESS"; data: T };

interface FormProps<T> {
    children: ReactNode;
    buttonText: string;
    apiRequest: () => Promise<T>;
    errorMessage: (error: ApiError) => string;
    validateCallback: () => boolean;
    renderOnSuccess?: (data: T) => ReactElement;
}

export function Form<T>({
    children,
    buttonText,
    apiRequest,
    errorMessage,
    validateCallback,
    renderOnSuccess,
}: FormProps<T>): ReactElement {
    const [state, setState] = useState<FormState<T>>({
        status: "INCOMPLETE",
    });
    const [errorText, setErrorText] = useState("");

    function submit(event: FormEvent) {
        event.preventDefault();
        setState({ status: "SUBMITTING" });
        apiRequest()
            .then((data) => setState({ status: "SUCCESS", data }))
            .catch((error) => {
                setState({ status: "ERROR", error });
                setErrorText(errorMessage(error));
            });
    }

    useEffect(() => {
        if (state.status === "SUCCESS") {
            return;
        }
        if (validateCallback()) {
            setState({ status: "COMPLETE" });
        } else {
            setState({ status: "INCOMPLETE" });
        }
    }, [state.status, validateCallback]);

    if (state.status === "SUCCESS" && renderOnSuccess) {
        return renderOnSuccess(state.data);
    }

    return (
        <form onSubmit={submit}>
            {children}
            <SubmitButton state={state}>{buttonText}</SubmitButton>
            <CSSTransition
                in={state.status === "ERROR"}
                timeout={200}
                classNames={{
                    enterActive: styles.messageEnter,
                    enterDone: styles.messageEnter,
                    exitActive: styles.messageExit,
                }}
            >
                <div className={styles.errorMessage}>{errorText}</div>
            </CSSTransition>
        </form>
    );
}
