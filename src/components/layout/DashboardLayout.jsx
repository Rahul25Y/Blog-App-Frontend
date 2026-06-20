import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const DashboardLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Close mobile sidebar on window resize if screen crosses lg threshold
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 992) {
        setIsMobileSidebarOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleToggleSidebar = () => {
    if (window.innerWidth < 992) {
      setIsMobileSidebarOpen(!isMobileSidebarOpen);
    } else {
      setIsSidebarCollapsed(!isSidebarCollapsed);
    }
  };

  return (
    <div className="app-container">
      {/* Top Navbar */}
      <Navbar onToggleSidebar={handleToggleSidebar} />

      {/* Main Container */}
      <div className="main-layout">
        {/* Left Navigation Sidebar */}
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          isMobileOpen={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
        />

        {/* Right Content Area + Footer */}
        <div
          className={`content-wrapper ${
            isSidebarCollapsed ? "expanded" : ""
          }`}
          style={{ minHeight: "calc(100vh - 56px)" }}
        >
          <main className="flex-grow-1" style={{ flex: "1 0 auto" }}>
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
