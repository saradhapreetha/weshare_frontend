import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_UPLOAD_SERVICE_URL}/api/auth/user`, { withCredentials: true });
                setData(response.data);
                localStorage.setItem('session', JSON.stringify(response.data));
            } catch (error) {
                console.error('Error fetching session', error);
            }
        };

        fetchSession();
    }, []);

    const signIn = () => {
        window.location.href = `${process.env.REACT_APP_UPLOAD_SERVICE_URL}/api/auth/oauth2/authorize/google`;
    };

    const signOut = () => {
        localStorage.removeItem('session');
        setData(null);
    };

    return (
        <AuthContext.Provider value={{ data, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};