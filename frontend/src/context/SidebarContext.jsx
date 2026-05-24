import { createContext, useContext, useState, useEffect } from "react";

const SidebarContext = createContext();

// ✅ Custom Hook
export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used inside SidebarProvider");
  }
  return context;
};

// ✅ Provider
export const SidebarProvider = ({ children }) => {
<<<<<<< HEAD
  const [sidebarOpen, setSidebarOpen] = useState(false);
=======
    // sidebarOpen is for mobile/tablet responsive view
    const [sidebarOpen, setSidebarOpen] = useState(true);
>>>>>>> 46475d46a8b8297766ec84501c47bd26576c41d9

  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("sidebarCollapsed")) || false;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", JSON.stringify(sidebarCollapsed));
  }, [sidebarCollapsed]);

  const toggleSidebar = () => setSidebarOpen(prev => !prev);
  const toggleCollapse = () => setSidebarCollapsed(prev => !prev);

  return (
    <SidebarContext.Provider
      value={{
        sidebarOpen,
        setSidebarOpen,
        sidebarCollapsed,
        setSidebarCollapsed,
        toggleSidebar,
        toggleCollapse,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};