import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { api, csrf } from '../lib/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchMe = useCallback(async () => {
        try {
            const response = await api.get('/auth/me');
            setUser(response.data.data);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchMe();
    }, [fetchMe]);

    const login = async (payload) => {
        await csrf();
        const response = await api.post('/auth/login', payload);
        setUser(response.data.data);
        return response.data.data;
    };

    const register = async (payload) => {
        await csrf();
        const response = await api.post('/auth/register', payload);
        setUser(response.data.data);
        return response.data.data;
    };

    const logout = async () => {
        await api.post('/auth/logout');
        setUser(null);
    };

    const value = useMemo(
        () => ({
            user,
            loading,
            isAdmin: user?.role === 'admin',
            login,
            register,
            logout,
            refresh: fetchMe,
        }),
        [user, loading, fetchMe]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
