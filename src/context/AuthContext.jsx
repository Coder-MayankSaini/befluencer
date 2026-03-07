import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

// Mock users for demo
const MOCK_USERS = {
    influencer: {
        id: 1,
        name: 'Priya Sharma',
        email: 'priya@example.com',
        role: 'influencer',
        avatar: null,
    },
    brand: {
        id: 2,
        name: 'StyleCo',
        email: 'admin@styleco.com',
        role: 'brand',
        avatar: null,
    },
};

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const login = (email, password, role) => {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            const mockUser = role === 'brand' ? MOCK_USERS.brand : MOCK_USERS.influencer;
            setUser({ ...mockUser, email });
            setIsLoading(false);
        }, 800);
    };

    const register = (name, email, password, role) => {
        setIsLoading(true);
        setTimeout(() => {
            setUser({
                id: Date.now(),
                name,
                email,
                role,
                avatar: null,
            });
            setIsLoading(false);
        }, 800);
    };

    const logout = () => {
        setUser(null);
    };

    const value = {
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export default AuthContext;
