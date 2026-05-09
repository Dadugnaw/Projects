"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if token exists in localStorage on initial load
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    
    if (token && role) {
      setUser({ token, role });
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", { username, password });
      const { token, role } = response.data;
      
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      setUser({ token, role });

      // Redirect based on role
      switch (role) {
        case "ADMIN":
          router.push("/admin");
          break;
        case "RECEPTIONIST":
          router.push("/reception");
          break;
        case "TRAINER":
          router.push("/trainer");
          break;
        case "MEMBER":
          router.push("/member");
          break;
        default:
          router.push("/");
      }
      return { success: true };
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      return { success: false, message: error.response?.data?.error || "Login failed" };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
