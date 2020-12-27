import React from "react";
import {User} from "../models/user";
import {createContext, FunctionComponent, useEffect, useState} from "react";
import {accessToken, getCurrentUser} from "../helpers/tokenHelper";
import {ApiClient} from "../api/apiClient";

interface UserContextProps {
    loading: boolean;
    currentUser?: User; 
}

export const UserContext = createContext<UserContextProps>({
    loading: false,
    currentUser: undefined,
})

export const UserContextProvider: FunctionComponent = ({children}) => {
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState<User | undefined>();
    
    function updateUser() {
        setCurrentUser(getCurrentUser());
    }
    
    useEffect(() => {
        accessToken.subscribe(updateUser);
        return () => accessToken.unsubscribe(updateUser);
    }, []);
    
    useEffect(() => {
        ApiClient.refreshToken()
            .catch(() => { /* Do nothing - user will be shown the sign in page */ })
            .finally(() => setLoading(false));
    });
    
    return (
        <UserContext.Provider value={{ loading, currentUser }}>
            {children}
        </UserContext.Provider>
    );
}