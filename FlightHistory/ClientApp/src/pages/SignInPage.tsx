import React, {FunctionComponent, useCallback, useState} from "react";
import {EmailInput, PasswordInput} from "../components/forms/Input";
import {ApiClient} from "../api/apiClient";
import styles from "./SignInPage.module.scss";
import {Form} from "../components/forms/Form";
import {ApiError} from "../api/apiError"; 

export const SignInPage: FunctionComponent = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const validateCallback = useCallback(() => {
        return !(password === "" || email === "");
        
    }, [password, email]);
    
    function errorMessage(error: ApiError) {
        if (error.status === 401) {
            return "Incorrect email or password";
        }
        return "Sorry - something went wrong. Please try again."
    }
        
    function signIn() {
        return ApiClient.signIn(email, password);
    }
    
    return (
        <main className={styles.main}>
            <section className={styles.section}>
                <h1 className={styles.title}>Sign In</h1>
                <Form buttonText={'Sign In'} apiRequest={signIn} errorMessage={errorMessage} validateCallback={validateCallback}>
                    <EmailInput value={email} updateValue={setEmail} required={true}>Email</EmailInput>
                    <PasswordInput value={password} updateValue={setPassword} required={true}>Password</PasswordInput>
                </Form>
            </section>
        </main>
    );
};