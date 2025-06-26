import { apiRequest } from "./queryClient";
import type { User, Company, LoginRequest } from "@shared/schema";

export interface AuthResponse {
  token: string;
  user: User;
  company: Company;
}

export class AuthService {
  private static TOKEN_KEY = "nxt_auth_token";

  static getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  static setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  static removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  static async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await apiRequest("POST", "/api/auth/login", credentials);
    const data = await response.json();
    
    this.setToken(data.token);
    return data;
  }

  static async getCurrentUser(): Promise<{ user: User; company: Company } | null> {
    const token = this.getToken();
    if (!token) return null;

    try {
      const response = await fetch("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        this.removeToken();
        return null;
      }

      return await response.json();
    } catch (error) {
      this.removeToken();
      return null;
    }
  }

  static logout(): void {
    this.removeToken();
  }

  static isAuthenticated(): boolean {
    return !!this.getToken();
  }

  static getAuthHeaders(): Record<string, string> {
    const token = this.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }
}

// Utility functions for role-based access control
export const hasRole = (user: User | null, role: string): boolean => {
  if (!user) return false;
  return user.role === role;
};

export const isAdmin = (user: User | null): boolean => {
  return hasRole(user, "admin");
};

export const isManager = (user: User | null): boolean => {
  return hasRole(user, "manager") || isAdmin(user);
};

// Utility function to check if user can access a feature
export const canAccessFeature = (user: User | null, feature: string): boolean => {
  if (!user) return false;
  
  // Admin can access everything
  if (isAdmin(user)) return true;
  
  // Define feature permissions based on roles
  const rolePermissions: Record<string, string[]> = {
    manager: [
      "crm", "marketing", "workflows", "chatbot", 
      "reports", "landing", "webhooks"
    ],
    user: [
      "crm", "chatbot", "reports"
    ],
  };
  
  const userPermissions = rolePermissions[user.role] || [];
  return userPermissions.includes(feature);
};

// Multi-tenant utility functions
export const getCurrentCompanyId = (user: User | null): number | null => {
  return user?.companyId || null;
};

export const isSameCompany = (user: User | null, companyId: number): boolean => {
  return user?.companyId === companyId;
};
