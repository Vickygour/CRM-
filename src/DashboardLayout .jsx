import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
  ShieldCheck,
  Zap,
} from 'lucide-react';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: '/admin/dashboard', icon: BarChart3, label: 'Dashboard' },
    { path: '/admin/TeamManagement', icon: Users, label: 'Team Management' },
    { path: '/admin/customers', icon: UserCheck, label: 'All Customers' },
    { path: '/admin/calls', icon: Phone, label: 'Call Records' },
    { path: '/admin/followups', icon: Calendar, label: 'Follow-ups' },
    { path: '/admin/reports', icon: TrendingUp, label: 'Reports' },
    { path: '/admin/settings', icon: Settings, label: 'Settings' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans text-slate-900">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        animate={{ width: sidebarCollapsed ? 88 : 280 }}
        className={`
          fixed lg:static inset-y-0 left-0 z-[70]
          bg-[#0F172A] text-white flex flex-col shadow-2xl shadow-blue-900/20
          ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }
          transition-all duration-300 ease-in-out
        `}
      >
        {/* Logo Section */}
        <div className="h-20 flex items-center px-6 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/40 flex-shrink-0">
              <Zap className="w-6 h-6 text-white fill-current" />
            </div>
            {!sidebarCollapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xl font-black tracking-tight italic"
              >
                NEXUS
                <span className="text-blue-500 text-xs not-italic font-bold ml-1">
                  CRM
                </span>
              </motion.span>
            )}
          </div>
          <button
            className="lg:hidden ml-auto"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-6 h-6 text-slate-400" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto no-scrollbar">
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
                  ${sidebarCollapsed ? 'justify-center' : 'px-4 gap-4'}
                  ${
                    isActive
                      ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.15)]'
                      : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                  }
                `}
              >
                {/* Active Indicator Line */}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute left-0 w-1 h-6 bg-blue-500 rounded-r-full"
                  />
                )}

                <Icon
                  size={isActive ? 22 : 20}
                  className={
                    isActive
                      ? 'text-blue-500'
                      : 'group-hover:scale-110 transition-transform'
                  }
                />

                {!sidebarCollapsed && (
                  <span
                    className={`text-sm font-bold tracking-tight ${
                      isActive ? 'text-white' : ''
                    }`}
                  >
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Profile Section */}
        <div className="p-4 bg-slate-800/30 border-t border-slate-800/50">
          <div
            className={`flex items-center ${
              sidebarCollapsed ? 'justify-center' : 'gap-3'
            } p-2 rounded-2xl`}
          >
            <div className="relative">
              <img
                src="https://ui-avatars.com/api/?name=Admin+User&background=2563eb&color=fff"
                className="w-10 h-10 rounded-xl border-2 border-slate-700"
                alt="avatar"
              />
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-slate-900 rounded-full"></div>
            </div>
            {!sidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold truncate">Admin User</p>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
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
                  ? 'bg-transparent text-slate-400 hover:text-red-400'
                  : 'bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white'
              }
            `}
            title="Logout"
          >
            <LogOut size={18} />
            {!sidebarCollapsed && (
              <span className="text-xs font-black uppercase tracking-widest">
                Logout
              </span>
            )}
          </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 px-8 flex items-center justify-between z-40">
          <div className="flex items-center gap-4">
            <button
              className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
              onClick={() => {
                if (window.innerWidth < 1024) setSidebarOpen(true);
                else setSidebarCollapsed(!sidebarCollapsed);
              }}
            >
              <Menu size={20} className="text-slate-600" />
            </button>
            <h1 className="text-lg font-bold text-slate-800 tracking-tight">
              Super Admin Panel
            </h1>
          </div>

          <div className="flex items-center gap-4 lg:gap-8">
            {/* Professional Search */}
            <div className="relative hidden md:flex items-center">
              <Search className="absolute left-3 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search analytics..."
                className="pl-10 pr-4 py-2 w-64 bg-slate-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 transition-all outline-none font-medium"
              />
            </div>

            <div className="flex items-center gap-4">
              <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-xl transition-all">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-blue-600 rounded-full border-2 border-white"></span>
              </button>

              <div className="h-8 w-[1px] bg-slate-200 mx-2 hidden lg:block"></div>

              <button className="flex items-center gap-2 group">
                <div className="w-9 h-9 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold shadow-md group-hover:shadow-blue-200 transition-all">
                  A
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-[#F8FAFC]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
