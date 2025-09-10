import { User, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Header = () => {
  return (
    <header className="bg-card border-b shadow-soft h-16 flex items-center justify-between px-6">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-sm">AS</span>
        </div>
        <h1 className="text-2xl font-bold text-primary">Ayur-Sense</h1>
        <span className="text-sm text-muted-foreground">Scientific Analysis Platform</span>
      </div>
      
      <div className="flex items-center space-x-3">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <User className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};