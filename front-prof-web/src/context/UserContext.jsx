"use client";
import React, { createContext, useContext, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '@/app/api/auth/auth';


export const UserStateContext = createContext({
    user: {},
    authenticated: false,
    setUser: () => {
    },
    logout: () => {
    },
    login: (data) => {
    },
    setAuthenticated: () => {
    },
})

export default function UserContext({ children }) {

    const [user, setUser] = useState({})
    const [authenticated, _setAuthenticated] = useState(localStorage.getItem('auth'))
    const router = useRouter();

    // Memoized logout function
    const logout = useCallback(async () => {
        try {
            await authApi.logout();
            _setAuthenticated(false);
            setUser({});
            localStorage.removeItem("auth");
            router.push('/login');
        } catch (error) {
            console.error("Logout failed:", error);
        }
    }, [router]);

    const setAuthenticated = (isAuthenticated) => {
        _setAuthenticated(isAuthenticated)
        window.localStorage.setItem('auth', isAuthenticated)
    }
    // Memoized login function
    const login = useCallback(async (data) => {
        try {
            await authApi.getCsrfToken();
            const result = await authApi.login(data);
            return result;
        } catch (error) {
            throw error;
        }
    }, []);

    return <>
        <UserStateContext.Provider value={{
            user,
            login,
            logout,
            setUser,
            authenticated,
            setAuthenticated,
        }}>
            {children}
        </UserStateContext.Provider>
    </>
}

export const useUserContext = () => useContext(UserStateContext);


