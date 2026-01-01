import React, { useState } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  UserCheck,
  Phone,
  Calendar,
  TrendingUp,
  Bell,
  Search,
  Menu,
  ChevronDown,
  BarChart3,
  Settings,
  LogOut,
  X,
  Zap,
} from "lucide-react";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: "/admin/dashboard", icon: BarChart3, label: "DASHBOARD" },
    { path: "/admin/TeamManagement", icon: Users, label: "TEAM MANAGEMENT" },
    { path: "/admin/customers", icon: UserCheck, label: "ALL CUSTOMERS" },
    { path: "/admin/calls", icon: Phone, label: "CALL RECORDS" },
    { path: "/admin/followups", icon: Calendar, label: "FOLLOW-UPS" },
    { path: "/admin/reports", icon: TrendingUp, label: "REPORTS" },
    { path: "/admin/settings", icon: Settings, label: "SETTINGS" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  return (
    <div className="flex h-screen bg-[#050505] font-sans text-slate-200 selection:bg-amber-500/30">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        animate={{ width: sidebarCollapsed ? 88 : 280 }}
        className={`
          fixed lg:static inset-y-0 left-0 z-[70]
          bg-[#0A0A0A] border-r border-white/[0.05] flex flex-col
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }
          transition-all duration-300 ease-in-out
        `}
      >
        {/* Logo Section */}
        <div className="h-24 flex items-center px-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.2)] flex-shrink-0">
              <Zap className="w-6 h-6 text-black fill-current" />
            </div>
            {!sidebarCollapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-2xl font-black tracking-tighter italic text-white"
              >
                A2V
                <span className="text-amber-500 text-[10px] not-italic font-bold ml-1 tracking-widest block">
                  CRM PREMIUM
                </span>
              </motion.span>
            )}
          </div>
          <button
            className="lg:hidden ml-auto text-amber-500"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-1.5 mt-4 overflow-y-auto no-scrollbar">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`
                  relative flex items-center h-12 rounded-xl transition-all duration-200 group
                  ${sidebarCollapsed ? "justify-center" : "px-4 gap-4"}
                  ${
                    isActive
                      ? "bg-amber-500/10 text-amber-500 border border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.05)]"
                      : "text-slate-500 hover:text-slate-200 hover:bg-white/[0.03]"
                  }
                `}
              >
                <Icon
                  size={isActive ? 20 : 18}
                  className={
                    isActive
                      ? "text-amber-500"
                      : "group-hover:scale-110 transition-transform"
                  }
                />

                {!sidebarCollapsed && (
                  <span
                    className={`text-xs font-bold tracking-tight ${
                      isActive ? "text-white" : ""
                    }`}
                  >
                    {item.label}
                  </span>
                )}

                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute left-0 w-1 h-6 bg-amber-500 rounded-r-full"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Profile Section */}
        <div className="p-4 bg-white/[0.02] border-t border-white/[0.05]">
          <div
            className={`flex items-center ${
              sidebarCollapsed ? "justify-center" : "gap-3"
            } p-2 rounded-2xl`}
          >
            <div className="relative">
              <img
                src={`https://ui-avatars.com/api/?name=Admin+User&background=f59e0b&color=000&bold=true`}
                className="w-10 h-10 rounded-xl border-2 border-amber-500/20"
                alt="avatar"
              />
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-[#0A0A0A] rounded-full"></div>
            </div>
            {!sidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white truncate">
                  Admin User
                </p>
                <p className="text-[10px] font-black text-amber-500/60 uppercase tracking-widest">
                  Super Admin
                </p>
              </div>
            )}
          </div>

          <button
            onClick={handleLogout}
            className={`
              mt-4 w-full flex items-center justify-center gap-2 h-10 rounded-xl transition-all
              ${
                sidebarCollapsed
                  ? "text-slate-500 hover:text-red-500"
                  : "bg-red-500/5 text-red-500 hover:bg-red-500 hover:text-white text-xs font-bold tracking-tight"
              }
            `}
          >
            <LogOut size={16} />
            {!sidebarCollapsed && <span>LOGOUT</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-20 bg-[#0A0A0A]/80 backdrop-blur-md border-b border-white/[0.05] px-8 flex items-center justify-between z-40">
          <div className="flex items-center gap-4">
            <button
              className="p-2 hover:bg-white/[0.05] rounded-xl transition-all text-slate-400 hover:text-amber-500"
              onClick={() => {
                if (window.innerWidth < 1024) setSidebarOpen(true);
                else setSidebarCollapsed(!sidebarCollapsed);
              }}
            >
              <Menu size={22} />
            </button>
            <h1 className="text-lg font-bold text-white tracking-tight hidden sm:block">
              Super Admin <span className="text-amber-500">Panel</span>
            </h1>
          </div>

          <div className="flex items-center gap-4 lg:gap-8">
            {/* Professional Search */}
            <div className="relative hidden md:flex items-center">
              <Search className="absolute left-3 text-slate-500" size={18} />
              <input
                type="text"
                placeholder="Search analytics..."
                className="pl-10 pr-4 py-2 w-64 bg-white/[0.03] border border-white/[0.05] rounded-xl text-sm text-white focus:ring-1 focus:ring-amber-500/50 transition-all outline-none font-medium"
              />
            </div>

            <div className="flex items-center gap-4">
              <button className="relative p-2 text-slate-400 hover:bg-white/[0.05] rounded-xl transition-all">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-amber-500 rounded-full border-2 border-[#0A0A0A]"></span>
              </button>

              <div className="h-8 w-[1px] bg-white/[0.1] mx-2 hidden lg:block"></div>

              <button className="flex items-center gap-2 group">
                <div className="w-9 h-9 bg-amber-500 rounded-xl flex items-center justify-center text-black font-bold shadow-lg shadow-amber-500/10">
                  A
                </div>
                <ChevronDown className="w-4 h-4 text-slate-500 group-hover:text-amber-500 transition-colors" />
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-[#050505] p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
