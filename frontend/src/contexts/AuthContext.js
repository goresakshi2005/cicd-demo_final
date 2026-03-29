import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth } from '../services/api';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (token) {
            // Optionally verify token with backend
            setUser({ token });
        }
        setLoading(false);
    }, []);

    const login = async (username, password) => {
        const formData = new URLSearchParams();
        formData.append('username', username);
        formData.append('password', password);
        const res = await auth.login(formData);
        localStorage.setItem('access_token', res.data.access_token);
        setUser({ username });
        return res.data;
    };

    const register = async (userData) => {
        const res = await auth.register(userData);
        return res.data;
    };

    const logout = () => {
        localStorage.removeItem('access_token');
        setUser(null);
    };

    const value = { user, login, register, logout, loading };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}