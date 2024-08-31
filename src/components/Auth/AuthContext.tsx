import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { UserCredentials } from "../../models/UserCredentials";
import { UserModel } from "../../models/UserModel";
import { UserService } from "../../services/UserService";

interface AuthContextType {
    user: UserModel | null;
    login: (tokens: UserCredentials) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserModel | null>(null);
    const [loading, setLoading] = useState(true); // Adicione o estado de carregamento

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            UserService.getProfile(accessToken).then((userResponse) => {
                setUser(userResponse);
            }).catch(() => {
                logout();
            }).finally(() => {
                setLoading(false); // Finalize o carregamento
            });
        } else {
            setLoading(false); // Finalize o carregamento se não houver token
        }
    }, []);

    const login = async (tokens: UserCredentials): Promise<UserModel | null> => {
        const userResponse = await UserService.getProfile(tokens.access);

        localStorage.setItem('accessToken', tokens.access);
        localStorage.setItem('refreshToken', tokens.refresh);
        setUser(userResponse);

        return user
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setUser(null);
    };

    if (loading) {
        return <div>Loading...</div>; // Ou qualquer outro indicador de carregamento
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};