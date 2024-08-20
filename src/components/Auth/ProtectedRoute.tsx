import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export const ProtectedRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { user } = useAuth();
    console.log(user)
    if (!user) {
        return <Navigate to="/login" />;
    }

    return <>{children}</>;
};
