import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { login, logout, getMe, register } from "../services/auth.api";

export const useAuth = () => {
    const context = useContext(AuthContext);

    const { user, setUser, loading, setLoading } = context;

    const handleLogin = async ({ email, password }) => {
        try {
            setLoading(true);

            const data = await login({ email, password });
            if (!data?.user) throw new Error("Invalid response from server");

            setUser(data.user);     

            return data;
        } catch (error) {
            console.error("Login Error:", error);

            throw error;
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async ({ username, email, password }) => {
        try {
            setLoading(true);
            const data = await register({ username, email, password });
    
            if (!data?.user) throw new Error("Invalid response from server"); // ✅ guard
    
            setUser(data.user);
            return data;
        } catch (error) {
            console.error("Register Error:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            setLoading(true);

            await logout();

            setUser(null);
        } catch (error) {
            console.error("Logout Error:", error);

            throw error;
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        user,
        handleLogin,
        handleRegister,
        handleLogout,
    };
};