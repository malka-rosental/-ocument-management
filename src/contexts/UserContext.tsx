// context/UserContext.tsx
import React, { useState, useEffect, useContext, createContext } from 'react';

import { useConfig } from './ConfigContext';
import apiService from '../services/api-service';

import type { User } from '../types';



interface UserContextValue {
    user: User | null;
    setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const {getDmUserApi} = useConfig();

    useEffect(() => {
        const loadUser = async () => {
            try {
                const userData = await apiService.get<User>(`${getDmUserApi}/DMUserDetails/GetDMUser`); // or your user endpoint
                setUser(userData);
            } catch (error) {
                console.error('Failed to fetch user', error);
                setUser(null);
            }
        };

        loadUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextValue => {
    const context = useContext(UserContext);
    if (!context) throw new Error('useUser must be used within a UserProvider');
    return context;
};
