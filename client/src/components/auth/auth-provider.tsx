import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { User, Company } from "@shared/schema";

interface AuthContextType {
  user: User | null;
  company: Company | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [, setLocation] = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const [company, setCompany] = useState<Company | null>(null);

  // Check if user is authenticated
  const { data, isLoading } = useQuery({
    queryKey: ["/api/auth/me"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      if (!token) return null;
      
      const response = await fetch("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        localStorage.removeItem("token");
        return null;
      }
      
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  useEffect(() => {
    if (data) {
      setUser(data.user);
      setCompany(data.company);
    }
  }, [data]);

  const login = async (email: string, password: string) => {
    try {
      const response = await apiRequest("POST", "/api/auth/login", { email, password });
      const data = await response.json();
      
      localStorage.setItem("token", data.token);
      setUser(data.user);
      setCompany(data.company);
      setLocation("/");
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setCompany(null);
    setLocation("/login");
  };

  // Redirect to login if not authenticated
  useEffect(() => {
    const currentPath = window.location.pathname;
    if (!isLoading && !user && currentPath !== "/login") {
      setLocation("/login");
    }
  }, [user, isLoading, setLocation]);

  return (
    <AuthContext.Provider value={{ user, company, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
