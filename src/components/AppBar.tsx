
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, Search, Bell, Settings, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AppBarProps {
  toggleSidebar: () => void;
}

const AppBar = ({ toggleSidebar }: AppBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="bg-primary text-primary-foreground w-full p-2 flex items-center justify-between shadow-md">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar} 
          className="text-primary-foreground hover:bg-sidebar-accent"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>
        <Link to="/" className="text-xl font-bold">
          Market Asset View
        </Link>
      </div>

      <form onSubmit={handleSearch} className="flex-1 mx-4 max-w-md">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search assets..."
            className="w-full bg-primary-foreground text-foreground pl-9 focus-visible:ring-secondary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </form>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-sidebar-accent">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
        <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-sidebar-accent">
          <Settings className="h-5 w-5" />
          <span className="sr-only">Settings</span>
        </Button>
        <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-sidebar-accent">
          <User className="h-5 w-5" />
          <span className="sr-only">User profile</span>
        </Button>
      </div>
    </header>
  );
};

export default AppBar;
