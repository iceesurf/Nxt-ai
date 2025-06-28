import { Bell, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth/auth-provider";

interface HeaderProps {
  title: string;
  description?: string;
  onMenuClick?: () => void;
}

export function Header({ title, description, onMenuClick }: HeaderProps) {
  const { user } = useAuth();

  return (
    <header className="bg-card border-b p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div>
            <h2 className="text-xl font-semibold text-foreground">{title}</h2>
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Bell className="h-5 w-5 text-muted-foreground hover:text-foreground cursor-pointer" />
            <span className="absolute -top-2 -right-2 w-4 h-4 bg-destructive rounded-full text-xs flex items-center justify-center text-destructive-foreground">
              3
            </span>
          </div>
          <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center cursor-pointer">
            <span className="text-sm font-medium text-accent-foreground">
              {user?.email?.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
