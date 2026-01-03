import React, { useState, useEffect } from 'react';
import {
  User,
  Mail,
  Phone,
  Building,
  ArrowLeft,
  Save,
  XCircle,
  DollarSign,
  Calendar,
  Target,
  AlertTriangle,
  Sparkles,
  TrendingUp,
  Users,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../../api';

const CreateCustomer = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    source: 'website',
    status: 'new',
    priority: 'medium',
    dealValue: '',
    assignedTo: '',
    nextFollowUp: '',
  });

  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(true);

  // Fetch users for assignment dropdown
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoadingUsers(true);
      const response = await api.get('/auth/users');
      if (response.data.success) {
        setUsers(response.data.data);
        // Auto-select current user if available
        const currentUser = response.data.data[0];
        if (currentUser) {
          setFormData((prev) => ({ ...prev, assignedTo: currentUser._id }));
        }
      }
    } catch (err) {
      console.error('❌ Error fetching users:', err);
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Phone must be 10 digits';
    }
    if (!formData.assignedTo) {
      newErrors.assignedTo = 'Please assign to a user';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company || undefined,
        source: formData.source,
        status: formData.status,
        priority: formData.priority,
        dealValue: formData.dealValue ? parseFloat(formData.dealValue) : 0,
        assignedTo: formData.assignedTo,
        nextFollowUp: formData.nextFollowUp || undefined,
      };

      const response = await api.post('/leads', payload);

      if (response.data.success) {
        alert('✅ Customer added successfully!');
        navigate('/admin/customers');
      }
    } catch (error) {
      console.error('❌ Error creating lead:', error);
      setErrors({
        submit: error.response?.data?.message || 'Failed to create customer',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white p-6 lg:p-12 font-['Space_Grotesk'] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-amber-600/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="max-w-5xl mx-auto mb-10"
      >
        <button
          onClick={() => navigate('/admin/all-customers')}
          className="group flex items-center gap-2 text-white/40 hover:text-amber-500 transition-all mb-6 uppercase text-[10px] tracking-[0.3em] font-black"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to Customers
        </button>
        <h1 className="text-5xl font-light tracking-tighter">
          Add New{' '}
          <span className="font-black italic bg-gradient-to-r from-amber-200 via-amber-500 to-amber-700 bg-clip-text text-transparent">
            CUSTOMER
          </span>
        </h1>
      </motion.div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 bg-white/[0.02] border border-white/5 rounded-[2.5rem] overflow-hidden backdrop-blur-3xl shadow-2xl"
        >
          <div className="p-8 lg:p-12">
            <div className="flex items-center gap-3 mb-10">
              <div className="p-3 bg-amber-500/10 rounded-2xl border border-amber-500/20 text-amber-500">
                <Target size={20} />
              </div>
              <div>
                <h2 className="text-sm font-black uppercase tracking-widest text-white/80">
                  Customer Details
                </h2>
                <p className="text-[10px] text-white/30 uppercase tracking-[0.2em]">
                  Enter lead information and assignment
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Name */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-amber-500/60 ml-1">
                    Full Name *
                  </label>
                  <div className="relative group">
                    <User
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-amber-500 transition-colors"
                      size={18}
                    />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-amber-500/50 focus:bg-white/[0.05] transition-all font-medium text-sm"
                    />
                  </div>
                  {errors.name && (
                    <p className="text-[9px] text-red-500 font-bold uppercase tracking-tighter ml-1">
                      ⚠ {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-amber-500/60 ml-1">
                    Email Address *
                  </label>
                  <div className="relative group">
                    <Mail
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-amber-500 transition-colors"
                      size={18}
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@company.com"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-amber-500/50 focus:bg-white/[0.05] transition-all font-medium text-sm"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-[9px] text-red-500 font-bold uppercase tracking-tighter ml-1">
                      ⚠ {errors.email}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-amber-500/60 ml-1">
                    Phone Number *
                  </label>
                  <div className="relative group">
                    <Phone
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-amber-500 transition-colors"
                      size={18}
                    />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="9876543210"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-amber-500/50 focus:bg-white/[0.05] transition-all font-medium text-sm"
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-[9px] text-red-500 font-bold uppercase tracking-tighter ml-1">
                      ⚠ {errors.phone}
                    </p>
                  )}
                </div>

                {/* Company */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-amber-500/60 ml-1">
                    Company Name
                  </label>
                  <div className="relative group">
                    <Building
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-amber-500 transition-colors"
                      size={18}
                    />
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Acme Corp"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-amber-500/50 focus:bg-white/[0.05] transition-all font-medium text-sm"
                    />
                  </div>
                </div>

                {/* Source */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-amber-500/60 ml-1">
                    Lead Source *
                  </label>
                  <select
                    name="source"
                    value={formData.source}
                    onChange={handleChange}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-amber-500/50 appearance-none font-bold text-xs uppercase tracking-widest cursor-pointer"
                  >
                    <option value="website" className="bg-[#111]">
                      Website
                    </option>
                    <option value="referral" className="bg-[#111]">
                      Referral
                    </option>
                    <option value="ads" className="bg-[#111]">
                      Advertisements
                    </option>
                    <option value="cold-call" className="bg-[#111]">
                      Cold Call
                    </option>
                    <option value="social-media" className="bg-[#111]">
                      Social Media
                    </option>
                    <option value="other" className="bg-[#111]">
                      Other
                    </option>
                  </select>
                </div>

                {/* Status */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-amber-500/60 ml-1">
                    Lead Status *
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-amber-500/50 appearance-none font-bold text-xs uppercase tracking-widest cursor-pointer"
                  >
                    <option value="new" className="bg-[#111]">
                      New
                    </option>
                    <option value="contacted" className="bg-[#111]">
                      Contacted
                    </option>
                    <option value="qualified" className="bg-[#111]">
                      Qualified
                    </option>
                    <option value="proposal" className="bg-[#111]">
                      Proposal Sent
                    </option>
                    <option value="negotiation" className="bg-[#111]">
                      Negotiation
                    </option>
                    <option value="converted" className="bg-[#111]">
                      Converted
                    </option>
                    <option value="lost" className="bg-[#111]">
                      Lost
                    </option>
                  </select>
                </div>

                {/* Priority */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-amber-500/60 ml-1">
                    Priority Level *
                  </label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-amber-500/50 appearance-none font-bold text-xs uppercase tracking-widest cursor-pointer"
                  >
                    <option value="low" className="bg-[#111]">
                      Low
                    </option>
                    <option value="medium" className="bg-[#111]">
                      Medium
                    </option>
                    <option value="high" className="bg-[#111]">
                      High
                    </option>
                    <option value="urgent" className="bg-[#111]">
                      Urgent
                    </option>
                  </select>
                </div>

                {/* Deal Value */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-amber-500/60 ml-1">
                    Deal Value (₹)
                  </label>
                  <div className="relative group">
                    <DollarSign
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-amber-500 transition-colors"
                      size={18}
                    />
                    <input
                      type="number"
                      name="dealValue"
                      value={formData.dealValue}
                      onChange={handleChange}
                      placeholder="50000"
                      min="0"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-amber-500/50 focus:bg-white/[0.05] transition-all font-medium text-sm"
                    />
                  </div>
                </div>

                {/* Assign To */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-amber-500/60 ml-1">
                    Assign To *
                  </label>
                  <select
                    name="assignedTo"
                    value={formData.assignedTo}
                    onChange={handleChange}
                    disabled={loadingUsers}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-amber-500/50 appearance-none font-bold text-xs uppercase tracking-widest cursor-pointer disabled:opacity-50"
                  >
                    <option value="" className="bg-[#111]">
                      {loadingUsers ? 'Loading...' : 'Select User'}
                    </option>
                    {users.map((user) => (
                      <option
                        key={user._id}
                        value={user._id}
                        className="bg-[#111]"
                      >
                        {user.name} ({user.role})
                      </option>
                    ))}
                  </select>
                  {errors.assignedTo && (
                    <p className="text-[9px] text-red-500 font-bold uppercase tracking-tighter ml-1">
                      ⚠ {errors.assignedTo}
                    </p>
                  )}
                </div>

                {/* Next Follow-up */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-amber-500/60 ml-1">
                    Next Follow-up Date
                  </label>
                  <div className="relative group">
                    <Calendar
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-amber-500 transition-colors"
                      size={18}
                    />
                    <input
                      type="datetime-local"
                      name="nextFollowUp"
                      value={formData.nextFollowUp}
                      onChange={handleChange}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-amber-500/50 focus:bg-white/[0.05] transition-all font-medium text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Error */}
              {errors.submit && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-500"
                >
                  <XCircle size={18} />
                  <p className="text-[10px] font-black uppercase tracking-widest">
                    {errors.submit}
                  </p>
                </motion.div>
              )}

              {/* Action Buttons */}
              <div className="pt-6 flex flex-col sm:flex-row gap-4">
                <button
                  type="submit"
                  disabled={loading || loadingUsers}
                  className="flex-1 py-4 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-500/50 text-black rounded-2xl font-black uppercase text-[11px] tracking-[0.2em] transition-all shadow-[0_0_30px_rgba(245,158,11,0.2)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={16} /> Add Customer
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/admin/all-customers')}
                  disabled={loading}
                  className="px-10 py-4 border border-white/10 hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl font-black uppercase text-[11px] tracking-[0.2em] transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </motion.div>

        {/* Info Sidebar */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-amber-500/10 via-transparent to-transparent border border-amber-500/20 rounded-[2rem] p-8"
          >
            <TrendingUp className="text-amber-500 mb-4" size={32} />
            <h3 className="text-sm font-black uppercase tracking-widest mb-4">
              Lead Pipeline
            </h3>
            <ul className="space-y-4">
              {[
                'New → Contacted',
                'Qualified → Proposal',
                'Negotiation → Converted',
                'Track Deal Value & Priority',
              ].map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-3 text-[10px] font-bold text-white/50 uppercase tracking-tighter"
                >
                  <div className="w-1 h-1 bg-amber-500 rounded-full" /> {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-8"
          >
            <Sparkles className="text-white/20 mb-4" size={24} />
            <p className="text-xs italic text-white/40 leading-relaxed">
              "Leads are automatically tracked with timestamps. Assign to team
              members and set follow-up reminders for better conversion rates."
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-6"
          >
            <h4 className="text-[10px] font-black uppercase tracking-widest text-amber-500/60 mb-3 flex items-center gap-2">
              <AlertTriangle size={14} /> Quick Tips
            </h4>
            <div className="space-y-2">
              {[
                { tip: 'Set realistic deal values', icon: '💰' },
                { tip: 'Update status regularly', icon: '📊' },
                { tip: 'Schedule follow-ups', icon: '📅' },
                { tip: 'Track lead sources', icon: '🎯' },
              ].map((t, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-[9px] text-white/30"
                >
                  <span>{t.icon}</span>
                  <span className="font-bold uppercase">{t.tip}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CreateCustomer;
