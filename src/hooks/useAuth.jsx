import { useContext, createContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const login = (token, user_id) => {
        localStorage.setItem("token", token);
        localStorage.setItem("user_id", user_id);
    };

    return (
        <AuthContext.Provider value={{ login }}>
            {children}
        </AuthContext.Provider>
    );
};