import { useAuth } from "@/components/auth/auth-provider";
import { LoginForm } from "@/components/auth/login-form";
import { useLocation } from "wouter";
import { useEffect } from "react";

export default function Login() {
  const { user, isLoading } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isLoading && user) {
      setLocation("/");
    }
  }, [user, isLoading, setLocation]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center gradient-bg">
        <div className="animate-pulse">
          <div className="w-16 h-16 gradient-bg rounded-xl flex items-center justify-center">
            <div className="w-8 h-8 bg-white/20 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (user) {
    return null; // Will redirect to dashboard
  }

  return <LoginForm />;
}
