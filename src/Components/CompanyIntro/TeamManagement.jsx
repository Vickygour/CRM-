import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  Plus,
  Edit2,
  Trash2,
  ChevronDown,
  MoreVertical,
  Phone,
  Mail,
  Calendar,
  TrendingUp,
  X,
  Check,
  AlertCircle,
  User,
  Grid3x3,
  List,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TeamManagement = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [selectedMembers, setSelectedMembers] = useState([]);

  const teamMembers = [
    {
      id: 1,
      name: 'Vikram Singh',
      email: 'vikram@crm.com',
      role: 'Caller',
      callsMade: 145,
      joinDate: '2024-01-15',
      status: 'active',
      avatar: 'VS',
      performance: 92,
    },
    {
      id: 2,
      name: 'Anjali Mehta',
      email: 'anjali@crm.com',
      role: 'Caller',
      callsMade: 132,
      joinDate: '2024-02-20',
      status: 'active',
      avatar: 'AM',
      performance: 88,
    },
    {
      id: 3,
      name: 'Rajesh Kumar',
      email: 'rajesh@crm.com',
      role: 'Senior Caller',
      callsMade: 128,
      joinDate: '2023-11-10',
      status: 'active',
      avatar: 'RK',
      performance: 85,
    },
    {
      id: 4,
      name: 'Sunita Sharma',
      email: 'sunita@crm.com',
      role: 'Caller',
      callsMade: 118,
      joinDate: '2024-03-05',
      status: 'inactive',
      avatar: 'SS',
      performance: 75,
    },
    {
      id: 5,
      name: 'Arjun Patel',
      email: 'arjun@crm.com',
      role: 'Caller',
      callsMade: 105,
      joinDate: '2024-01-28',
      status: 'active',
      avatar: 'AP',
      performance: 80,
    },
  ];

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      console.log('Delete:', id);
    }
  };

  const handleEdit = (member) => {
    navigate('/admin/edit-staff/' + member.id, { state: { member } });
  };

  const handleAddNewCaller = () => {
    navigate('/admin/create-staff');
  };

  const filteredMembers = teamMembers.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || member.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = [
    {
      label: 'Total Members',
      value: teamMembers.length,
      icon: User,
      color: 'blue',
    },
    {
      label: 'Active',
      value: teamMembers.filter((m) => m.status === 'active').length,
      icon: Check,
      color: 'green',
    },
    {
      label: 'Total Calls',
      value: teamMembers.reduce((sum, m) => sum + m.callsMade, 0),
      icon: Phone,
      color: 'purple',
    },
    {
      label: 'Avg Performance',
      value: `${Math.round(
        teamMembers.reduce((sum, m) => sum + m.performance, 0) /
          teamMembers.length,
      )}%`,
      icon: TrendingUp,
      color: 'orange',
    },
  ];

  return (
    <div className="min-h-screen bg-[#fafbfc] p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                Team Management
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Manage calling team and performance
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddNewCaller}
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-all hover:shadow-xl hover:shadow-blue-500/40"
            >
              <Plus className="h-4 w-4" />
              <span>Add Member</span>
            </motion.button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="group relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white p-5 shadow-sm transition-all hover:shadow-md"
            >
              <div className="relative z-10">
                <div className="mb-3 flex items-center justify-between">
                  <div className={`rounded-xl bg-${stat.color}-500/10 p-2.5`}>
                    <stat.icon className={`h-4 w-4 text-${stat.color}-600`} />
                  </div>
                </div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {stat.label}
                </p>
                <p className="mt-1 text-2xl font-bold text-slate-900">
                  {stat.value}
                </p>
              </div>
              <div
                className={`absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-${stat.color}-500 to-${stat.color}-600 opacity-0 blur-3xl transition-opacity group-hover:opacity-5`}
              ></div>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 rounded-2xl border border-slate-200/60 bg-white p-5 shadow-sm"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search members..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-50"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              {['all', 'active', 'inactive'].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
                    statusFilter === status
                      ? 'bg-slate-900 text-white shadow-lg'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-50/50 p-1">
              {[
                { id: 'grid', icon: Grid3x3 },
                { id: 'list', icon: List },
              ].map((view) => (
                <button
                  key={view.id}
                  onClick={() => setViewMode(view.id)}
                  className={`rounded-lg p-2 transition-all ${
                    viewMode === view.id
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  <view.icon className="h-4 w-4" />
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Grid View */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence>
              {filteredMembers.map((member, idx) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm transition-all hover:shadow-xl"
                >
                  {/* Status Indicator */}
                  <div className="absolute right-4 top-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ${
                        member.status === 'active'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          member.status === 'active'
                            ? 'bg-emerald-500 animate-pulse'
                            : 'bg-slate-400'
                        }`}
                      ></span>
                      {member.status}
                    </span>
                  </div>

                  {/* Avatar & Info */}
                  <div className="mb-4 flex items-start gap-4">
                    <div className="relative">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-lg font-bold text-white shadow-lg">
                        {member.avatar}
                      </div>
                      {member.status === 'active' && (
                        <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-sm">
                          <Check className="h-3 w-3 text-emerald-600" />
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="truncate text-lg font-bold text-slate-900">
                        {member.name}
                      </h3>
                      <p className="text-sm font-medium text-slate-500">
                        {member.role}
                      </p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="mb-4 grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-slate-50 p-3">
                      <div className="mb-1 flex items-center gap-2">
                        <Phone className="h-3.5 w-3.5 text-slate-400" />
                        <span className="text-xs font-semibold text-slate-500">
                          Calls
                        </span>
                      </div>
                      <p className="text-xl font-bold text-slate-900">
                        {member.callsMade}
                      </p>
                    </div>
                    <div className="rounded-xl bg-slate-50 p-3">
                      <div className="mb-1 flex items-center gap-2">
                        <TrendingUp className="h-3.5 w-3.5 text-slate-400" />
                        <span className="text-xs font-semibold text-slate-500">
                          Score
                        </span>
                      </div>
                      <p className="text-xl font-bold text-slate-900">
                        {member.performance}%
                      </p>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="mb-4 space-y-2 border-t border-slate-100 pt-4">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Mail className="h-3.5 w-3.5" />
                      <span className="truncate">{member.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>Joined {member.joinDate}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleEdit(member)}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-50 px-4 py-2.5 text-sm font-semibold text-blue-600 transition-colors hover:bg-blue-100"
                    >
                      <Edit2 className="h-4 w-4" />
                      Edit
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDelete(member.id, member.name)}
                      className="flex items-center justify-center rounded-xl bg-rose-50 px-4 py-2.5 text-rose-600 transition-colors hover:bg-rose-100"
                    >
                      <Trash2 className="h-4 w-4" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* List View */}
        {viewMode === 'list' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="overflow-hidden rounded-2xl border border-slate-200/60 bg-white shadow-sm"
          >
            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-slate-200 bg-slate-50">
                  <tr>
                    {[
                      'Member',
                      'Email',
                      'Role',
                      'Calls',
                      'Performance',
                      'Status',
                      'Actions',
                    ].map((header) => (
                      <th
                        key={header}
                        className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-600"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredMembers.map((member, idx) => (
                    <motion.tr
                      key={member.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="group transition-colors hover:bg-slate-50"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-sm font-bold text-white">
                            {member.avatar}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900">
                              {member.name}
                            </p>
                            <p className="text-xs text-slate-500">
                              {member.joinDate}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-slate-600">{member.email}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-slate-900">
                          {member.role}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-bold text-slate-900">
                          {member.callsMade}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-20 overflow-hidden rounded-full bg-slate-100">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"
                              style={{ width: `${member.performance}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-bold text-slate-900">
                            {member.performance}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
                            member.status === 'active'
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              member.status === 'active'
                                ? 'bg-emerald-500'
                                : 'bg-slate-400'
                            }`}
                          ></span>
                          {member.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEdit(member)}
                            className="rounded-lg p-2 text-blue-600 transition-colors hover:bg-blue-50"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(member.id, member.name)}
                            className="rounded-lg p-2 text-rose-600 transition-colors hover:bg-rose-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="divide-y divide-slate-100 lg:hidden">
              {filteredMembers.map((member) => (
                <div key={member.id} className="p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-sm font-bold text-white">
                        {member.avatar}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">
                          {member.name}
                        </p>
                        <p className="text-xs text-slate-500">{member.email}</p>
                      </div>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ${
                        member.status === 'active'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {member.status}
                    </span>
                  </div>

                  <div className="mb-3 grid grid-cols-3 gap-2 text-xs">
                    <div className="rounded-lg bg-slate-50 p-2 text-center">
                      <p className="text-slate-500">Role</p>
                      <p className="font-semibold text-slate-900">
                        {member.role}
                      </p>
                    </div>
                    <div className="rounded-lg bg-slate-50 p-2 text-center">
                      <p className="text-slate-500">Calls</p>
                      <p className="font-semibold text-slate-900">
                        {member.callsMade}
                      </p>
                    </div>
                    <div className="rounded-lg bg-slate-50 p-2 text-center">
                      <p className="text-slate-500">Score</p>
                      <p className="font-semibold text-slate-900">
                        {member.performance}%
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(member)}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600 transition-colors hover:bg-blue-100"
                    >
                      <Edit2 className="h-4 w-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(member.id, member.name)}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-600 transition-colors hover:bg-rose-100"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-slate-200 bg-slate-50 px-6 py-4">
              <p className="text-sm text-slate-600">
                Showing{' '}
                <span className="font-semibold text-slate-900">
                  {filteredMembers.length}
                </span>{' '}
                of{' '}
                <span className="font-semibold text-slate-900">
                  {teamMembers.length}
                </span>{' '}
                members
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TeamManagement;
