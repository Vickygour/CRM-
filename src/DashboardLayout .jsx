import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
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

  // Toggle sidebar collapse on desktop
  const toggleSidebarCollapse = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed lg:static inset-y-0 left-0 z-30
        bg-gray-900 text-white flex flex-col
        transform transition-all duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        ${sidebarCollapsed ? 'lg:w-20' : 'lg:w-64'}
        w-64
      `}
      >
        {/* Logo */}
        <div className="p-6 flex items-center justify-between">
          <div
            className={`flex items-center space-x-3 ${
              sidebarCollapsed ? 'lg:justify-center lg:w-full' : ''
            }`}
          >
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Phone className="w-6 h-6" />
            </div>
            {!sidebarCollapsed && (
              <span className="text-xl font-bold whitespace-nowrap">
                CRM Pro
              </span>
            )}
          </div>
          <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`
                  flex items-center ${
                    sidebarCollapsed ? 'lg:justify-center' : 'space-x-3'
                  } px-4 py-3 rounded-lg transition
                  ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }
                `}
                title={sidebarCollapsed ? item.label : ''}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!sidebarCollapsed && (
                  <span className="whitespace-nowrap">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-800">
          {!sidebarCollapsed ? (
            <>
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center font-semibold flex-shrink-0">
                  A
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">Admin User</p>
                  <p className="text-xs text-gray-400 truncate">
                    admin@crm.com
                  </p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm">Logout</span>
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center space-y-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center font-semibold">
                A
              </div>
              <button
                onClick={handleLogout}
                className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Mobile Menu Button */}
              <button
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-6 h-6 text-gray-600" />
              </button>

              {/* Desktop Sidebar Toggle Button */}
              <button
                className="hidden lg:block p-2 hover:bg-gray-100 rounded-lg transition"
                onClick={toggleSidebarCollapse}
              >
                <Menu className="w-6 h-6 text-gray-600" />
              </button>

              <h1 className="text-xl lg:text-2xl font-bold text-gray-800">
                Super Admin Panel
              </h1>
            </div>

            <div className="flex items-center space-x-3 lg:space-x-6">
              {/* Search Bar */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search customers, calls..."
                  className="pl-10 pr-4 py-2 w-60 lg:w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              {/* Notifications */}
              <button className="relative">
                <Bell className="w-6 h-6 text-gray-600" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </button>

              {/* User Dropdown */}
              <button className="hidden lg:flex items-center space-x-2">
                <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                  A
                </div>
                <span className="font-medium text-gray-700">Admin User</span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>
        </header>

        {/* Main Content - Yahan Outlet render hoga */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
