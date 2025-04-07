
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Home, Search, Upload, BarChart4, PieChart, Briefcase, Star, HelpCircle, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SidebarProps {
  isOpen: boolean;
}

const AppSidebar = ({ isOpen }: SidebarProps) => {
  return (
    <aside 
      className={cn(
        "fixed left-0 top-[57px] z-30 h-[calc(100vh-57px)] w-64 bg-sidebar border-r border-sidebar-border transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex flex-col h-full">
        <ScrollArea className="flex-1 py-4">
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-sm font-semibold text-sidebar-foreground/70">
              Navigation
            </h2>
            <div className="space-y-1">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground transition-all hover:bg-sidebar-accent",
                    isActive ? "bg-sidebar-accent" : ""
                  )
                }
                end
              >
                <Home className="h-5 w-5" />
                <span>Dashboard</span>
              </NavLink>
              <NavLink
                to="/search"
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground transition-all hover:bg-sidebar-accent",
                    isActive ? "bg-sidebar-accent" : ""
                  )
                }
              >
                <Search className="h-5 w-5" />
                <span>Search Assets</span>
              </NavLink>
              <NavLink
                to="/import"
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground transition-all hover:bg-sidebar-accent",
                    isActive ? "bg-sidebar-accent" : ""
                  )
                }
              >
                <Upload className="h-5 w-5" />
                <span>Import Portfolio</span>
              </NavLink>
            </div>
          </div>
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-sm font-semibold text-sidebar-foreground/70">
              Analysis
            </h2>
            <div className="space-y-1">
              <Button variant="ghost" className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent">
                <BarChart4 className="mr-3 h-5 w-5" />
                <span>Market Analysis</span>
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent">
                <PieChart className="mr-3 h-5 w-5" />
                <span>Asset Allocation</span>
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent">
                <Briefcase className="mr-3 h-5 w-5" />
                <span>Portfolio</span>
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent">
                <Star className="mr-3 h-5 w-5" />
                <span>Watchlist</span>
              </Button>
            </div>
          </div>
        </ScrollArea>
        <div className="flex border-t border-sidebar-border p-4">
          <div className="flex w-full items-center justify-between">
            <Button variant="ghost" className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent">
              <HelpCircle className="mr-3 h-5 w-5" />
              <span>Help</span>
            </Button>
            <Button variant="ghost" className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent">
              <Settings className="mr-3 h-5 w-5" />
              <span>Settings</span>
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AppSidebar;
