import React, {FormEvent, FunctionComponent, ReactElement, ReactNode, useEffect, useState} from "react";
import {ApiError} from "../../api/apiError";
import {SubmitButton} from "./SubmitButton";
import styles from "./Form.module.scss";

export type FormState<T> = 
    | { status: 'INCOMPLETE' }
    | { status: 'COMPLETE' }
    | { status: 'SUBMITTING' }
    | { status: 'ERROR', errorMessage: string }
    | { status: 'SUCCESS', data: T };


interface FormProps<T> {
    children: ReactNode;
    buttonText: string;
    apiRequest: () => Promise<T>;
    errorMessage: (error: ApiError) => string;
    validateCallback: () => boolean;
    renderOnSuccess?: (data: T) => ReactElement;
}

export function Form<T>({children, buttonText, apiRequest, errorMessage, validateCallback, renderOnSuccess}: FormProps<T>): ReactElement {
    const [state, setState] = useState<FormState<T>>({ status: 'INCOMPLETE'});
    
    function submit(event: FormEvent) {
        event.preventDefault();
        setState({ status: 'SUBMITTING' });
        apiRequest()
            .then(data => setState({ status: 'SUCCESS', data }))
            .catch(error => setState({ status: 'ERROR', errorMessage: errorMessage(error) }));
    }
    
    if (state.status === 'SUCCESS' && renderOnSuccess) {
        return renderOnSuccess(state.data);
    }
    
    useEffect(() => {
        if (state.status === 'SUCCESS') {
            return;
        }
        if (validateCallback()) {
            setState({ status: 'COMPLETE' });
        } else {
            setState({ status: 'INCOMPLETE' });
        }
    }, [validateCallback])
    
    return (
        <form onSubmit={submit}>
            {children}
            <SubmitButton state={state}>{buttonText}</SubmitButton>
            { state.status === 'ERROR' && <ErrorMessage text={state.errorMessage}/> }
        </form>  
    );
}

interface ErrorMessageProps {
    text: string;
}

const ErrorMessage: FunctionComponent<ErrorMessageProps> = ({text}) => {
    return (
        <div className={styles.errorMessage}>{text}</div>
    );
}
