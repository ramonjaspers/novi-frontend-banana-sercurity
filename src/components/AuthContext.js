import React, { createContext, useState, history } from 'react';
import { useHistory } from 'react-router-dom';

export const AuthContext = createContext({});


export default function AuthContextProvider({ children }) {
    const [isAuth, toggleIsAuth] = useState(false);
    const history = useHistory();

    function login() {
        toggleIsAuth(true);
        console.log('Gebruiker is ingelogd!');
        history.push('/profile');
    }

    function logout() {
        toggleIsAuth(false);
        console.log('Gebruiker is uitgelogd!');
        history.push('/');
    }

    const contextData = {
        isAuth,
        login,
        logout,
    }

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}
