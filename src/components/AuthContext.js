import React, { createContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

export const AuthContext = createContext({});

export default function AuthContextProvider({ children }) {
    // Set default states
    const [isAuth, toggleIsAuth] = useState({ isAuth: false, user: null, status: 'pending' });
    const history = useHistory();

    useEffect(() => {
        // On mount check if a token is present
        const token = localStorage.getItem('token');
        if (token) {
            // If a token is present decode this and request the user data
            const userData = jwtDecode(token);
            axios.get(`http://localhost:3000/600/users/${userData.sub}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            }).then(({ data }) => {
                // Set the recieved user data into the state
                toggleIsAuth({
                    isAuth: true,
                    user: {
                        email: data.email,
                        username: data.username,
                        id: data.id
                    },
                    status: 'done'
                })
                // If something goes wrong it means the token is corrupted, unset the token and logout
            }).catch(logout());
        } else {
            // Set default props
            toggleIsAuth({ ...isAuth, status: 'done' })
        }
    }, []);

    function login(JWT) {
        // insert JWT into local storage, fetch user data and set auth = true
        localStorage.setItem('token', JWT);
        //set user data
        const token = jwtDecode(JWT);
        toggleIsAuth({ user: { id: token.sub, email: token.email }, isAuth: true, status: 'done' });
        console.log('Gebruiker is ingelogd!');
        // goto profile page
        history.push('/profile');
    }

    function logout() {
        // Remove token and unset authentication
        localStorage.removeItem('token')
        toggleIsAuth({ ...isAuth, isAuth: false });
        console.log('Gebruiker is uitgelogd!');
        // Goto homepage
        history.push('/');
    }
    // Set ContextData which are being exported
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
