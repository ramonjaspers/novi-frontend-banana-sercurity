import React, { createContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

export const AuthContext = createContext({});

export default function AuthContextProvider({ children }) {
    const [isAuth, toggleIsAuth] = useState({ isAuth: false, user: null, status: 'pending' });
    const history = useHistory();

    useEffect(() => {
        // check if we got a token
        const token = localStorage.getItem('token');
        if (token) {
            const userData = jwtDecode(token);
            axios.get(`http://localhost:3000/600/users/${userData.sub}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            }).then(({ data }) => {
                toggleIsAuth({
                    isAuth: true,
                    user: {
                        email: data.email,
                        username: data.username,
                        id: data.id
                    },
                    status: 'done'
                })
            });
        } else {
            toggleIsAuth({ ...isAuth, status: 'done' })
        }
    }, []);

    function login(JWT) {
        // insert JWT into local storage, fetch user data and set auth = true
        localStorage.setItem('token', JWT);
        const token = jwtDecode(JWT);
        toggleIsAuth({ user: { id: token.sub, email: token.email }, isAuth: true, status: 'done' });
        console.log('Gebruiker is ingelogd!');
        history.push('/profile');
    }

    function logout() {
        localStorage.removeItem('token')
        toggleIsAuth({ ...isAuth, isAuth: false });
        console.log('Gebruiker is uitgelogd!');
        history.push('/');
    }

    const contextData = {
        isAuth: isAuth.isAuth,
        user: isAuth.user,
        login,
        logout,
    }

    return (
        <AuthContext.Provider value={contextData}>
            {isAuth.status === 'done' ? children : <h1>Loading... please wait.</h1>}
        </AuthContext.Provider>
    )
}
