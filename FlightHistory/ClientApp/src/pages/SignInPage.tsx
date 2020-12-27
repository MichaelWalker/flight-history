import React, {FormEvent, FunctionComponent, useState} from "react";
import {EmailInput, PasswordInput} from "../components/forms/Input";
import {SubmitButton, SubmitButtonState} from "../components/forms/SubmitButton";
import {ApiClient} from "../api/apiClient";

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
    
    return (
        <main>
            <div>
                <h1>Sign In</h1>
                <form onSubmit={onSubmit}>
                    <EmailInput value={email} updateValue={setEmail} required={true}>Email</EmailInput>
                    <PasswordInput value={password} updateValue={setPassword} required={true}>Password</PasswordInput>
                    <SubmitButton state={state}>Submit</SubmitButton>
                    {error && <div>{error}</div>}
                </form>
            </div>
        </main>
    );
};