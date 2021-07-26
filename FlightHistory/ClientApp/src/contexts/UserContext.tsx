import type { User } from "../models/user";
import type { FunctionComponent } from "react";
import React, { createContext, useEffect, useState } from "react";
import { getAccessToken, getCurrentUser } from "../helpers/tokenHelper";
import { Api } from "../api/apiClient";
import { get } from "../api/apiHelpers";

interface UserContextProps {
    loading: boolean;
    currentUser?: User;
}

export const UserContext = createContext<UserContextProps>({
    loading: false,
    currentUser: undefined,
});

export const UserContextProvider: FunctionComponent = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState<User | undefined>();

    function updateUser() {
        setCurrentUser(getCurrentUser());
    }

    useEffect(() => {
        getAccessToken().subscribe(updateUser);
        return () => getAccessToken().unsubscribe(updateUser);
    }, []);

    useEffect(() => {
        Api.auth
            .refreshToken()
            .catch(() => {
                /* Do nothing - user will be shown the sign in page */
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return <UserContext.Provider value={{ loading, currentUser }}>{children}</UserContext.Provider>;
};
