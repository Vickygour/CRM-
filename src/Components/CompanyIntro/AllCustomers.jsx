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
  TrendingUp,
  Building,
  User,
  Grid3x3,
  List,
  Loader2,
  AlertCircle,
  Users,
  Target,
  DollarSign,
  ArrowUpRight,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';

const AllCustomers = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    contacted: 0,
    qualified: 0,
    totalValue: 0,
  });

  // Fetch leads from API
  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get('/leads');

      if (response.data.success) {
        setLeads(response.data.data);
        calculateStats(response.data.data);
        console.log('✅ Leads fetched:', response.data.count);
      }
    } catch (err) {
      console.error('❌ Error fetching leads:', err);
      setError(err.response?.data?.message || 'Failed to fetch customers');
    } finally {
      setLoading(false);
    }
  };

  // Calculate statistics
  const calculateStats = (leadsData) => {
    const total = leadsData.length;
    const newLeads = leadsData.filter((l) => l.status === 'new').length;
    const contacted = leadsData.filter((l) => l.status === 'contacted').length;
    const qualified = leadsData.filter((l) => l.status === 'qualified').length;
    const totalValue = leadsData.reduce(
      (sum, l) => sum + (l.dealValue || 0),
      0,
    );

    setStats({ total, new: newLeads, contacted, qualified, totalValue });
  };

  // Delete lead
  const handleDelete = async (leadId) => {
    if (!window.confirm('Are you sure you want to delete this customer?'))
      return;

    try {
      await api.delete(`/leads/${leadId}`);
      console.log('✅ Lead deleted');
      fetchLeads();
    } catch (err) {
      console.error('❌ Delete error:', err);
      alert(err.response?.data?.message || 'Failed to delete customer');
    }
  };

  // Filter leads
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.company?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' || lead.status === statusFilter;
    const matchesPriority =
      priorityFilter === 'all' || lead.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Stats cards
  const statsCards = [
    {
      label: 'Total Customers',
      value: stats.total,
      icon: Users,
      color: 'amber',
    },
    { label: 'New Leads', value: stats.new, icon: Target, color: 'blue' },
    {
      label: 'Qualified',
      value: stats.qualified,
      icon: ArrowUpRight,
      color: 'emerald',
    },
    {
      label: 'Total Value',
      value: `₹${(stats.totalValue / 1000).toFixed(0)}K`,
      icon: DollarSign,
      color: 'amber',
    },
  ];

  // Status badge color
  const getStatusColor = (status) => {
    const colors = {
      new: 'bg-blue-500/10 text-blue-500',
      contacted: 'bg-purple-500/10 text-purple-500',
      qualified: 'bg-emerald-500/10 text-emerald-500',
      converted: 'bg-green-500/10 text-green-500',
      lost: 'bg-red-500/10 text-red-500',
    };
    return colors[status] || 'bg-slate-500/10 text-slate-500';
  };

  // Priority badge color
  const getPriorityColor = (priority) => {
    const colors = {
      urgent: 'bg-red-500/10 text-red-500',
      high: 'bg-orange-500/10 text-orange-500',
      medium: 'bg-yellow-500/10 text-yellow-500',
      low: 'bg-green-500/10 text-green-500',
    };
    return colors[priority] || 'bg-slate-500/10 text-slate-500';
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '—';
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="text-center">
          <Loader2
            className="animate-spin text-amber-500 mx-auto mb-4"
            size={48}
          />
          <p className="text-slate-400 font-bold">Loading customers...</p>
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
            Error Loading Customers
          </h3>
          <p className="text-red-500 font-bold mb-4">{error}</p>
          <button
            onClick={fetchLeads}
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
              Customer <span className="text-amber-500">Management</span>
            </h1>
            <p className="text-slate-500 text-sm font-medium mt-1 uppercase tracking-widest">
              Manage your sales pipeline • {stats.total} Total Customers
            </p>
          </div>
          <button
            onClick={() => navigate('/admin/create-customer')}
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-black px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-amber-500/10 active:scale-95"
          >
            <Plus size={18} /> ADD CUSTOMER
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
              placeholder="SEARCH BY NAME, EMAIL OR COMPANY..."
              className="w-full bg-white/[0.03] border border-white/[0.05] rounded-xl py-3 pl-12 pr-4 text-xs font-bold tracking-widest text-white placeholder:text-slate-600 focus:border-amber-500/50 outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center bg-white/[0.03] p-1 rounded-xl border border-white/[0.05] flex-wrap gap-1">
            {['all', 'new', 'contacted', 'qualified', 'converted', 'lost'].map(
              (s) => (
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
              ),
            )}
          </div>

          {/* Priority Filter */}
          <div className="flex items-center bg-white/[0.03] p-1 rounded-xl border border-white/[0.05] gap-1">
            {['all', 'urgent', 'high', 'medium', 'low'].map((p) => (
              <button
                key={p}
                onClick={() => setPriorityFilter(p)}
                className={`px-3 py-2 rounded-lg text-[9px] font-black tracking-widest uppercase ${
                  priorityFilter === p
                    ? 'bg-amber-500 text-black'
                    : 'text-slate-500 hover:text-white'
                }`}
              >
                {p}
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
              {filteredLeads.map((lead, index) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                  key={lead._id}
                  className="bg-[#0A0A0A] border border-white/[0.05] rounded-2xl p-6 group hover:border-amber-500/30 transition-all"
                >
                  {/* Avatar & Badges */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center text-black font-black text-xl shadow-lg">
                      {lead.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex flex-col gap-2">
                      <span
                        className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${getStatusColor(
                          lead.status,
                        )}`}
                      >
                        {lead.status}
                      </span>
                      <span
                        className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${getPriorityColor(
                          lead.priority,
                        )}`}
                      >
                        {lead.priority}
                      </span>
                    </div>
                  </div>

                  {/* Name & Company */}
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-500 transition-colors mb-1">
                    {lead.name}
                  </h3>
                  <p className="text-slate-500 text-xs font-bold mb-4 tracking-wide flex items-center gap-2">
                    <Building size={12} />
                    {lead.company || 'No Company'}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white/[0.02] p-3 rounded-xl border border-white/[0.05]">
                      <p className="text-[9px] font-black text-slate-500 uppercase tracking-tighter mb-1">
                        Deal Value
                      </p>
                      <p className="text-lg font-bold text-amber-500">
                        ₹{lead.dealValue?.toLocaleString('en-IN') || 0}
                      </p>
                    </div>
                    <div className="bg-white/[0.02] p-3 rounded-xl border border-white/[0.05]">
                      <p className="text-[9px] font-black text-slate-500 uppercase tracking-tighter mb-1">
                        Source
                      </p>
                      <p className="text-sm font-bold text-white capitalize">
                        {lead.source?.replace('-', ' ')}
                      </p>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                      <Mail
                        size={14}
                        className="text-amber-500 flex-shrink-0"
                      />
                      <span className="truncate">{lead.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                      <Phone
                        size={14}
                        className="text-amber-500 flex-shrink-0"
                      />
                      {lead.phone}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                      <User
                        size={14}
                        className="text-amber-500 flex-shrink-0"
                      />
                      Assigned: {lead.assignedTo?.name || 'Unassigned'}
                    </div>
                    {lead.nextFollowUp && (
                      <div className="flex items-center gap-2 text-xs text-amber-400 font-medium">
                        <Calendar size={14} className="flex-shrink-0" />
                        Follow-up: {formatDate(lead.nextFollowUp)}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        navigate(`/admin/edit-customer/${lead._id}`, {
                          state: { lead },
                        })
                      }
                      className="flex-1 bg-white/[0.05] hover:bg-white/[0.1] text-white py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
                    >
                      <Edit2 size={14} /> EDIT
                    </button>
                    <button
                      onClick={() => handleDelete(lead._id)}
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
                      Customer
                    </th>
                    <th className="p-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                      Company
                    </th>
                    <th className="p-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                      Deal Value
                    </th>
                    <th className="p-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                      Status
                    </th>
                    <th className="p-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                      Priority
                    </th>
                    <th className="p-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                      Assigned
                    </th>
                    <th className="p-5 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map((lead) => (
                    <tr
                      key={lead._id}
                      className="border-b border-white/[0.05] hover:bg-white/[0.01]"
                    >
                      <td className="p-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center text-black font-bold text-sm">
                            {lead.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-bold text-white text-sm">
                              {lead.name}
                            </p>
                            <p className="text-[10px] text-slate-500 font-bold truncate">
                              {lead.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-5 text-xs font-bold text-slate-400">
                        {lead.company || '—'}
                      </td>
                      <td className="p-5 text-sm font-bold text-amber-500 whitespace-nowrap">
                        ₹{lead.dealValue?.toLocaleString('en-IN') || 0}
                      </td>
                      <td className="p-5">
                        <span
                          className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${getStatusColor(
                            lead.status,
                          )}`}
                        >
                          {lead.status}
                        </span>
                      </td>
                      <td className="p-5">
                        <span
                          className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${getPriorityColor(
                            lead.priority,
                          )}`}
                        >
                          {lead.priority}
                        </span>
                      </td>
                      <td className="p-5 text-xs font-bold text-slate-400">
                        {lead.assignedTo?.name || 'Unassigned'}
                      </td>
                      <td className="p-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() =>
                              navigate(`/admin/edit-customer/${lead._id}`, {
                                state: { lead },
                              })
                            }
                            className="p-2 text-slate-400 hover:text-amber-500"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(lead._id)}
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
        {filteredLeads.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-[#0A0A0A] border border-white/[0.05] rounded-2xl p-12 text-center"
          >
            <AlertCircle className="text-slate-500 mx-auto mb-4" size={48} />
            <h3 className="text-xl font-bold text-white mb-2">
              No Customers Found
            </h3>
            <p className="text-slate-500 mb-4">
              {searchQuery || statusFilter !== 'all'
                ? 'Try adjusting your filters'
                : 'Start by adding your first customer'}
            </p>
            {!searchQuery &&
              statusFilter === 'all' &&
              priorityFilter === 'all' && (
                <button
                  onClick={() => navigate('/admin/create-customer')}
                  className="bg-amber-500 text-black px-6 py-3 rounded-lg font-bold inline-flex items-center gap-2"
                >
                  <Plus size={18} /> Add Customer
                </button>
              )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AllCustomers;
