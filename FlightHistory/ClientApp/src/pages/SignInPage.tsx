import React, {FormEvent, FunctionComponent, useEffect, useState} from "react";
import {EmailInput, PasswordInput} from "../components/forms/Input";
import {SubmitButton, SubmitButtonState} from "../components/forms/SubmitButton";
import {ApiClient} from "../api/apiClient";
import styles from "./SignInPage.module.scss"; 

export const SignInPage: FunctionComponent = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [state, setState] = useState<SubmitButtonState>("READY");
    const [error, setError] = useState<string | undefined>();
    
    function onSubmit(event: FormEvent) {
        event.preventDefault();
        
        setState("SUBMITTING");
        setError(undefined);
        ApiClient
            .signIn(email, password)
            .catch(e => {
                if (e.status === 401) {
                    setError("Incorrect Email or Password");
                } else {
                    setError("Sorry, something went wrong. Please try again.");
                }
            })
            .finally(() => setState("READY"));
    }
    
    function isValid(): boolean {
        if (password === "") {
            return false;
        }
        if (email === "") {
            return false;
        }
        
        return true;
    }
    
    useEffect(() => {
        if (isValid()) {
            setState("READY");
        } else {
            setState("DISABLED");
        }
    }, [email, password]);
    
    return (
        <main className={styles.main}>
            <section className={styles.section}>
                <h1 className={styles.title}>Sign In</h1>
                <form onSubmit={onSubmit}>
                    <EmailInput value={email} updateValue={setEmail} required={true}>Email</EmailInput>
                    <PasswordInput value={password} updateValue={setPassword} required={true}>Password</PasswordInput>
                    <SubmitButton state={state}>Sign In</SubmitButton>
                    {error && <div className={styles.errorMessage}>{error}</div>}
                </form>
            </section>
        </main>
    );
};