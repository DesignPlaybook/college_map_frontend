// context/AuthContext.js

import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const savedSession = localStorage.getItem("userSession");
        if (savedSession) {
            setUser(JSON.parse(savedSession));
        }
    }, []);

    const login = (userData) => {
        localStorage.setItem("userSession", JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem("userSession");
        localStorage.removeItem("authToken");
        setUser(null);
    };

    const isLoggedIn = !!user;

    return (
        <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
