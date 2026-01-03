import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Phone,
  Mail,
  Calendar,
  Shield,
  Check,
  User,
  Grid3x3,
  List,
  Loader2,
  AlertCircle,
  Users,
  UserCheck,
  UserX,
  Award,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';

const TeamManagement = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    roles: {},
  });

  // Fetch users from API
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      // ⭐ Fetch from /auth/users
      const response = await api.get('/auth/users');

      if (response.data.success) {
        setUsers(response.data.data);
        calculateStats(response.data.data);
        console.log('✅ Users fetched:', response.data.count);
      }
    } catch (err) {
      console.error('❌ Error fetching users:', err);
      setError(err.response?.data?.message || 'Failed to fetch team members');
    } finally {
      setLoading(false);
    }
  };

  // Calculate statistics
  const calculateStats = (usersData) => {
    const total = usersData.length;
    const active = usersData.filter((u) => u.isActive).length;
    const inactive = usersData.filter((u) => !u.isActive).length;

    // Count by role
    const roles = {};
    usersData.forEach((u) => {
      roles[u.role] = (roles[u.role] || 0) + 1;
    });

    setStats({ total, active, inactive, roles });
  };

  // Delete user
  const handleDelete = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this member?')) return;

    try {
      await api.delete(`/auth/users/${userId}`);
      console.log('✅ User deleted');
      fetchUsers();
    } catch (err) {
      console.error('❌ Delete error:', err);
      alert(err.response?.data?.message || 'Failed to delete user');
    }
  };

  // Filter users
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = roleFilter === 'all' || user.role === roleFilter;

    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'active' && user.isActive) ||
      (statusFilter === 'inactive' && !user.isActive);

    return matchesSearch && matchesRole && matchesStatus;
  });

  // Stats cards
  const statsCards = [
    { label: 'Total Members', value: stats.total, icon: Users, color: 'amber' },
    { label: 'Active', value: stats.active, icon: UserCheck, color: 'emerald' },
    { label: 'Inactive', value: stats.inactive, icon: UserX, color: 'red' },
    {
      label: 'Roles',
      value: Object.keys(stats.roles).length,
      icon: Award,
      color: 'blue',
    },
  ];

  // Role badge color
  const getRoleColor = (role) => {
    const colors = {
      owner: 'bg-purple-500/10 text-purple-500',
      admin: 'bg-red-500/10 text-red-500',
      manager: 'bg-blue-500/10 text-blue-500',
      sales: 'bg-green-500/10 text-green-500',
      developer: 'bg-cyan-500/10 text-cyan-500',
      designer: 'bg-pink-500/10 text-pink-500',
      writer: 'bg-yellow-500/10 text-yellow-500',
    };
    return colors[role] || 'bg-slate-500/10 text-slate-500';
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  // Unique roles for filter
  const uniqueRoles = [...new Set(users.map((u) => u.role))];

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="text-center">
          <Loader2
            className="animate-spin text-amber-500 mx-auto mb-4"
            size={48}
          />
          <p className="text-slate-400 font-bold">Loading team...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <AlertCircle className="text-red-500 mx-auto mb-4" size={48} />
          <h3 className="text-xl font-bold text-white mb-2">
            Error Loading Team
          </h3>
          <p className="text-red-500 font-bold mb-4">{error}</p>
          <button
            onClick={fetchUsers}
            className="bg-amber-500 hover:bg-amber-600 text-black px-6 py-3 rounded-lg font-bold"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-white uppercase">
              Team <span className="text-amber-500">Management</span>
            </h1>
            <p className="text-slate-500 text-sm font-medium mt-1 uppercase tracking-widest">
              Manage your team • {stats.total} Members
            </p>
          </div>
          <button
            onClick={() => navigate('/admin/create-staff')}
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-black px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-amber-500/10 active:scale-95"
          >
            <Plus size={18} /> ADD MEMBER
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statsCards.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#0A0A0A] border border-white/[0.05] p-5 rounded-2xl relative overflow-hidden group"
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${
                  stat.color === 'amber'
                    ? 'bg-amber-500/10 text-amber-500'
                    : stat.color === 'emerald'
                    ? 'bg-emerald-500/10 text-emerald-500'
                    : stat.color === 'red'
                    ? 'bg-red-500/10 text-red-500'
                    : 'bg-blue-500/10 text-blue-500'
                }`}
              >
                <stat.icon size={20} />
              </div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                {stat.label}
              </p>
              <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
              <div className="absolute -right-2 -bottom-2 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
                <stat.icon size={80} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-[#0A0A0A] border border-white/[0.05] p-4 rounded-2xl mb-8 flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
              size={18}
            />
            <input
              type="text"
              placeholder="SEARCH BY NAME OR EMAIL..."
              className="w-full bg-white/[0.03] border border-white/[0.05] rounded-xl py-3 pl-12 pr-4 text-xs font-bold tracking-widest text-white placeholder:text-slate-600 focus:border-amber-500/50 outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Role Filter */}
          <div className="flex items-center bg-white/[0.03] p-1 rounded-xl border border-white/[0.05] flex-wrap gap-1">
            <button
              onClick={() => setRoleFilter('all')}
              className={`px-3 py-2 rounded-lg text-[9px] font-black tracking-widest uppercase ${
                roleFilter === 'all'
                  ? 'bg-amber-500 text-black'
                  : 'text-slate-500 hover:text-white'
              }`}
            >
              All
            </button>
            {uniqueRoles.map((role) => (
              <button
                key={role}
                onClick={() => setRoleFilter(role)}
                className={`px-3 py-2 rounded-lg text-[9px] font-black tracking-widest uppercase ${
                  roleFilter === role
                    ? 'bg-amber-500 text-black'
                    : 'text-slate-500 hover:text-white'
                }`}
              >
                {role}
              </button>
            ))}
          </div>

          {/* Status Filter */}
          <div className="flex items-center bg-white/[0.03] p-1 rounded-xl border border-white/[0.05] gap-1">
            {['all', 'active', 'inactive'].map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-2 rounded-lg text-[9px] font-black tracking-widest uppercase ${
                  statusFilter === s
                    ? 'bg-amber-500 text-black'
                    : 'text-slate-500 hover:text-white'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* View Toggle */}
          <div className="hidden lg:flex items-center gap-1 bg-white/[0.03] p-1 rounded-xl border border-white/[0.05]">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${
                viewMode === 'grid'
                  ? 'text-amber-500 bg-white/5'
                  : 'text-slate-500'
              }`}
            >
              <Grid3x3 size={18} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${
                viewMode === 'list'
                  ? 'text-amber-500 bg-white/5'
                  : 'text-slate-500'
              }`}
            >
              <List size={18} />
            </button>
          </div>
        </div>

        {/* Grid View */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredUsers.map((user, index) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                  key={user._id}
                  className="bg-[#0A0A0A] border border-white/[0.05] rounded-2xl p-6 group hover:border-amber-500/30 transition-all"
                >
                  {/* Avatar & Status */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center text-black font-black text-xl shadow-lg">
                      {user.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .toUpperCase()
                        .slice(0, 2)}
                    </div>
                    <span
                      className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${
                        user.isActive
                          ? 'bg-emerald-500/10 text-emerald-500'
                          : 'bg-red-500/10 text-red-500'
                      }`}
                    >
                      {user.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>

                  {/* Name & Role */}
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-500 transition-colors mb-1">
                    {user.name}
                  </h3>
                  <div className="mb-4">
                    <span
                      className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${getRoleColor(
                        user.role,
                      )}`}
                    >
                      {user.role}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                      <Mail
                        size={14}
                        className="text-amber-500 flex-shrink-0"
                      />
                      <span className="truncate">{user.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                      <Calendar
                        size={14}
                        className="text-amber-500 flex-shrink-0"
                      />
                      Joined: {formatDate(user.createdAt)}
                    </div>
                    {user.lastLogin && (
                      <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
                        <UserCheck size={14} className="flex-shrink-0" />
                        Last: {formatDate(user.lastLogin)}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        navigate(`/admin/edit-staff/${user._id}`, {
                          state: { user },
                        })
                      }
                      className="flex-1 bg-white/[0.05] hover:bg-white/[0.1] text-white py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
                    >
                      <Edit2 size={14} /> EDIT
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="w-12 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white py-2.5 rounded-xl transition-all flex items-center justify-center"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          /* List View */
          <div className="bg-[#0A0A0A] border border-white/[0.05] rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/[0.05] bg-white/[0.02]">
                    <th className="p-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                      Member
                    </th>
                    <th className="p-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                      Role
                    </th>
                    <th className="p-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                      Status
                    </th>
                    <th className="p-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                      Joined
                    </th>
                    <th className="p-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                      Last Login
                    </th>
                    <th className="p-5 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr
                      key={user._id}
                      className="border-b border-white/[0.05] hover:bg-white/[0.01]"
                    >
                      <td className="p-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center text-black font-bold text-sm">
                            {user.name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')
                              .toUpperCase()
                              .slice(0, 2)}
                          </div>
                          <div>
                            <p className="font-bold text-white text-sm">
                              {user.name}
                            </p>
                            <p className="text-[10px] text-slate-500 font-bold">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-5">
                        <span
                          className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${getRoleColor(
                            user.role,
                          )}`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="p-5">
                        <span
                          className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${
                            user.isActive
                              ? 'bg-emerald-500/10 text-emerald-500'
                              : 'bg-red-500/10 text-red-500'
                          }`}
                        >
                          {user.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="p-5 text-xs font-bold text-slate-400">
                        {formatDate(user.createdAt)}
                      </td>
                      <td className="p-5 text-xs font-bold text-slate-400">
                        {formatDate(user.lastLogin)}
                      </td>
                      <td className="p-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() =>
                              navigate(`/admin/edit-staff/${user._id}`, {
                                state: { user },
                              })
                            }
                            className="p-2 text-slate-400 hover:text-amber-500"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(user._id)}
                            className="p-2 text-slate-400 hover:text-red-500"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* No Results */}
        {filteredUsers.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-[#0A0A0A] border border-white/[0.05] rounded-2xl p-12 text-center"
          >
            <AlertCircle className="text-slate-500 mx-auto mb-4" size={48} />
            <h3 className="text-xl font-bold text-white mb-2">
              No Members Found
            </h3>
            <p className="text-slate-500 mb-4">
              {searchQuery || roleFilter !== 'all'
                ? 'Try adjusting filters'
                : 'Add your first team member'}
            </p>
            {!searchQuery && roleFilter === 'all' && statusFilter === 'all' && (
              <button
                onClick={() => navigate('/admin/create-staff')}
                className="bg-amber-500 text-black px-6 py-3 rounded-lg font-bold inline-flex items-center gap-2"
              >
                <Plus size={18} /> Add Member
              </button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TeamManagement;
