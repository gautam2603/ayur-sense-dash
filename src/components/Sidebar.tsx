import { useState } from "react";
import { BarChart3, History, Settings, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: BarChart3, isActive: true },
  { id: "history", label: "Test History", icon: History, isActive: false },
  { id: "settings", label: "Settings", icon: Settings, isActive: false },
];

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={cn(
      "bg-card border-r shadow-soft transition-all duration-300 flex flex-col",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="p-4 border-b flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 gradient-primary rounded"></div>
            <span className="font-semibold text-primary">Navigation</span>
          </div>
        )}
        <Button
          variant="ghost" 
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8"
        >
          <ChevronRight className={cn(
            "h-4 w-4 transition-transform",
            collapsed ? "rotate-0" : "rotate-180"
          )} />
        </Button>
      </div>
      
      <nav className="flex-1 p-2">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={item.isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 h-12",
                  collapsed && "px-2 justify-center",
                  item.isActive && "gradient-primary text-primary-foreground shadow-accent"
                )}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Button>
            );
          })}
        </div>
      </nav>
    </aside>
  );
};