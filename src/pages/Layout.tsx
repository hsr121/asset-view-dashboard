
import { useState } from "react";
import { Outlet } from "react-router-dom";
import AppBar from "@/components/AppBar";
import AppSidebar from "@/components/AppSidebar";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AppBar toggleSidebar={toggleSidebar} />
      <div className="flex flex-1">
        <AppSidebar isOpen={sidebarOpen} />
        <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
