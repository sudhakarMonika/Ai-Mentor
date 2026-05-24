import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutGrid,
  BookOpen,
  MessageCircle,
  BarChart3,
  Video,
  Award,
  Settings,
  LogOut,
  ChevronRight
} from "lucide-react";

import { useSidebar } from "../context/SidebarContext";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    sidebarOpen,
    setSidebarOpen,
    sidebarCollapsed,
    setSidebarCollapsed,
  } = useSidebar();

  const { logout } = useAuth();

  const menuItems = [
    { id: "dashboard", label: "Dashboard", path: "/dashboard", icon: <LayoutGrid size={20} /> },
    { id: "courses", label: "My Courses", path: "/courses", icon: <BookOpen size={20} /> },
    { id: "discussions", label: "Discussions", path: "/discussions", icon: <MessageCircle size={20} /> },
    { id: "analytics", label: "Analytics", path: "/analytics", icon: <BarChart3 size={20} /> },
    { id: "watched", label: "Watched Videos", path: "/watched", icon: <Video size={20} /> },
    { id: "certificates", label: "Certificates", path: "/certificates", icon: <Award size={20} /> },
    { id: "settings", label: "Settings", path: "/settings", icon: <Settings size={20} /> },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      {/* 🔹 Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

<<<<<<< HEAD
      {/* 🔹 Sidebar */}
      <div
        className={`
          fixed left-0 top-16 h-[calc(100%-4rem)] bg-white border-r shadow-md z-50
          transition-all duration-300
          ${sidebarCollapsed ? "w-20" : "w-64"}
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* 🔹 Collapse Button */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="hidden lg:flex absolute -right-4 top-6 bg-gray-200 p-2 rounded-full shadow"
        >
          <ChevronRight
            size={16}
            className={`transition-transform ${
              sidebarCollapsed ? "" : "rotate-180"
            }`}
          />
        </button>

        {/* 🔹 Logo / Title */}
        <div className="p-4 font-bold text-lg border-b text-center">
          {sidebarCollapsed ? "AI" : "AI Tutor"}
        </div>

        {/* 🔹 Menu Items */}
        <div className="p-2 space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <div
                key={item.id}
                onClick={() => {
                  navigate(item.path);
                  setSidebarOpen(false);
                }}
                className={`
                  flex items-center gap-3 p-3 rounded-lg cursor-pointer transition
                  ${isActive ? "bg-blue-500 text-white" : "hover:bg-gray-100"}
                  ${sidebarCollapsed ? "justify-center" : ""}
                `}
              >
                {item.icon}

                {!sidebarCollapsed && (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
              </div>
            );
          })}
        </div>

        {/* 🔹 Logout */}
        <div className="absolute bottom-4 w-full px-2">
          <div
            onClick={handleLogout}
            className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-red-100 text-red-500 transition"
          >
            <LogOut size={20} />
            {!sidebarCollapsed && <span>Logout</span>}
=======
      <div className={`fixed lg:fixed top-18.5 left-0 z-[70] bg-card/70 backdrop-blur-2xl border-r border-border/80 transform transition-all duration-500 ease-out lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"} ${sidebarCollapsed ? "lg:w-24" : "lg:w-80"} w-80 h-[calc(100vh-4rem)] overflow-visible`}>

        <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="hidden lg:flex absolute -right-5 top-8 w-10 h-10 bg-card border border-border rounded-xl items-center justify-center hover:bg-teal-500 hover:text-white transition-all shadow-xl z-80">
          <ChevronRight className={`w-5 h-5 transition-transform duration-500 ${sidebarCollapsed ? "" : "rotate-180"}`} />
        </button>

        <nav className={`mt-8 px-4 h-[calc(100vh-16rem)] scrollbar-hide ${sidebarCollapsed ? "overflow-visible" : "overflow-y-auto"}`}>
          <div className="space-y-3">
            {navigationItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <div key={item.id} onClick={() => { navigate(item.path); setSidebarOpen(false); }} className={`group relative flex items-center px-4 py-4 rounded-3xl cursor-pointer transition-all duration-300 ${sidebarCollapsed ? "justify-center" : ""} ${isActive ? "bg-teal-500 text-white shadow-xl shadow-teal-500/30" : "hover:bg-canvas-alt"}`}>
                  <img src={item.icon} alt={item.label} className={`w-5 h-5 shrink-0 transition-transform group-hover:scale-110 ${isActive ? "brightness-0 invert" : "opacity-80"}`} />
                  {!sidebarCollapsed && <span className={`ml-4 text-sm font-black uppercase tracking-tight ${isActive ? "text-white" : ""}`} style={isActive ? {} : { color: '#b2b2b3' }}>{t(`nav.${item.id}`)}</span>}
                  {sidebarCollapsed && (
                    <div className="absolute left-full ml-6 px-4 py-2 bg-slate-900 text-white text-[10px] font-black rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all shadow-2xl z-50 uppercase tracking-widest">{t(`nav.${item.id}`)}</div>
                  )}
                </div>
              );
            })}
          </div>
        </nav>

        {/* --- BOTTOM PROFILE WITH POPUP --- */}
        <div className="absolute bottom-8 left-0 right-0 px-4" ref={profileRef}>
          {profilePopupOpen && (
            <div className={`absolute bottom-full mb-6 left-4 right-4 bg-card/95 backdrop-blur-2xl border border-border/50 rounded-[2.5rem] shadow-[0_-20px_80px_rgba(0,0,0,0.3)] overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300 z-90 ${sidebarCollapsed ? "w-52 -left-2" : ""}`}>
              <div className="p-6 border-b border-border/50 bg-linear-to-tr from-teal-500/10 to-transparent text-center">
                 <img 
                   src={user?.avatar_url || `https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(`${user?.firstName || ""} ${user?.lastName || ""}`.trim() || user?.name || displayName)}`} 
                   className="w-16 h-16 rounded-3xl mx-auto mb-3 shadow-2xl border-2 border-card object-cover" 
                   alt="User" 
                   onError={(e) => {
                     const seed = encodeURIComponent(`${user?.firstName || ""} ${user?.lastName || ""}`.trim() || user?.name || displayName);
                     e.target.src = `https://api.dicebear.com/8.x/initials/svg?seed=${seed}`;
                   }}
                 />
                 <h4 className="text-xs font-black text-main uppercase tracking-tighter">{displayName}</h4>
              </div>
              <div className="p-2">
                <button onClick={() => {navigate("/settings"); setProfilePopupOpen(false);}} className="flex items-center w-full px-4 py-4 text-[10px] font-black uppercase text-main hover:bg-teal-500 hover:text-white rounded-3xl transition-all"><Settings className="w-4 h-4 mr-3" /> {t("header.dashboard_settings")}</button>
                <button onClick={handleLogout} className="flex items-center w-full px-4 py-4 text-[10px] font-black uppercase text-red-500 hover:bg-red-500 hover:text-white rounded-3xl transition-all mt-1"><LogOut className="w-4 h-4 mr-3" /> {t("auth.logout")}</button>
              </div>
            </div>
          )}

          <div
            onClick={() => setProfilePopupOpen(!profilePopupOpen)}
            className={`cursor-pointer group relative p-0.5 rounded-4xl bg-linear-to-br from-teal-500/20 via-blue-500/10 to-transparent transition-all duration-500 shadow-lg hover:shadow-teal-500/5 ${profilePopupOpen ? 'ring-2 ring-teal-500/50' : 'ring-1 ring-white/5'}`}
          >
            <div className={`bg-card dark:bg-[#0a0f1e] rounded-[1.9rem] transition-all duration-300 ${sidebarCollapsed ? 'p-1' : 'p-4 flex items-center'}`}>
              <img 
                src={user?.avatar_url || `https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(`${user?.firstName || ""} ${user?.lastName || ""}`.trim() || user?.name || displayName)}`} 
                className={`${sidebarCollapsed ? 'w-12 h-12' : 'w-10 h-10'} rounded-[1.2rem] shadow-md border-2 border-white dark:border-slate-800 transition-all object-cover`} 
                alt="Avatar" 
                onError={(e) => {
                  const seed = encodeURIComponent(`${user?.firstName || ""} ${user?.lastName || ""}`.trim() || user?.name || displayName);
                  e.target.src = `https://api.dicebear.com/8.x/initials/svg?seed=${seed}`;
                }}
              />
              {!sidebarCollapsed && (
                <div className="ml-3 flex-1 min-w-0">
                  <div className="text-[11px] font-black truncate uppercase tracking-tight" style={{ color: '#a3a2a3' }}>{displayName}</div>
                  <div className="text-[9px] font-bold uppercase tracking-widest mt-0.5" style={{ color: '#a3a2a3' }}>{t("nav.account")}</div>
                </div>
              )}
            </div>
>>>>>>> 46475d46a8b8297766ec84501c47bd26576c41d9
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;