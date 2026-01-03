import React, { useState } from 'react';
import {
  User,
  Mail,
  Lock,
  ArrowLeft,
  ShieldCheck,
  Cpu,
  Sparkles,
  Terminal,
  Save,
  XCircle,
  Phone,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../src/api'; // Your axios instance

const CreateStaff = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '', // Optional field
    role: 'sales', // Match schema enum: owner, manager, sales, designer, writer, developer
    isActive: true,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    // Clear error for this field
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Minimum 6 characters required';
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      // ⭐ API call to /auth/register matching your User schema
      const response = await api.post('/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password, // Backend will hash this with bcrypt
        phone: formData.phone || undefined, // Optional
        role: formData.role,
        // isActive is handled by backend (default: true)
      });

      console.log('✅ Registration response:', response.data);

      if (response.data.success) {
        alert('✅ Team member created successfully!');
        navigate('/admin/TeamManagement');
      }
    } catch (error) {
      console.error('❌ Registration error:', error);
      setErrors({
        submit:
          error.response?.data?.message ||
          'Failed to create team member. Please try again.',
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
          onClick={() => navigate('/admin/TeamManagement')}
          className="group flex items-center gap-2 text-white/40 hover:text-amber-500 transition-all mb-6 uppercase text-[10px] tracking-[0.3em] font-black"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to Command Center
        </button>
        <h1 className="text-5xl font-light tracking-tighter">
          Initialize{' '}
          <span className="font-black italic bg-gradient-to-r from-amber-200 via-amber-500 to-amber-700 bg-clip-text text-transparent">
            NEW_NODE
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
                <Terminal size={20} />
              </div>
              <div>
                <h2 className="text-sm font-black uppercase tracking-widest text-white/80">
                  Entity Configuration
                </h2>
                <p className="text-[10px] text-white/30 uppercase tracking-[0.2em]">
                  Define node parameters and access levels
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Name */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-amber-500/60 ml-1">
                    Legal Identity *
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
                      placeholder="Full Name"
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
                    Data Uplink (Email) *
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
                      placeholder="email@company.com"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-amber-500/50 focus:bg-white/[0.05] transition-all font-medium text-sm"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-[9px] text-red-500 font-bold uppercase tracking-tighter ml-1">
                      ⚠ {errors.email}
                    </p>
                  )}
                </div>

                {/* Phone (Optional) */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-amber-500/60 ml-1">
                    Contact Number
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
                      placeholder="+91 98765 43210"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-amber-500/50 focus:bg-white/[0.05] transition-all font-medium text-sm"
                    />
                  </div>
                </div>

                {/* Role Selection */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-amber-500/60 ml-1">
                    Node Permissions *
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-amber-500/50 appearance-none font-bold text-xs uppercase tracking-widest cursor-pointer transition-all"
                  >
                    <option value="sales" className="bg-[#111]">
                      Sales Executive
                    </option>
                    <option value="manager" className="bg-[#111]">
                      Manager
                    </option>
                    <option value="designer" className="bg-[#111]">
                      Designer
                    </option>
                    <option value="writer" className="bg-[#111]">
                      Writer
                    </option>
                    <option value="developer" className="bg-[#111]">
                      Developer
                    </option>
                    <option value="owner" className="bg-[#111]">
                      Owner (Admin)
                    </option>
                  </select>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-amber-500/60 ml-1">
                    Access Key *
                  </label>
                  <div className="relative group">
                    <Lock
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-amber-500 transition-colors"
                      size={18}
                    />
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Min. 6 characters"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-amber-500/50 focus:bg-white/[0.05] transition-all font-medium text-sm"
                    />
                  </div>
                  {errors.password && (
                    <p className="text-[9px] text-red-500 font-bold uppercase tracking-tighter ml-1">
                      ⚠ {errors.password}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-amber-500/60 ml-1">
                    Verify Key *
                  </label>
                  <div className="relative group">
                    <ShieldCheck
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-amber-500 transition-colors"
                      size={18}
                    />
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Re-enter password"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-amber-500/50 focus:bg-white/[0.05] transition-all font-medium text-sm"
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-[9px] text-red-500 font-bold uppercase tracking-tighter ml-1">
                      ⚠ {errors.confirmPassword}
                    </p>
                  )}
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
                  disabled={loading}
                  className="flex-1 py-4 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-500/50 text-black rounded-2xl font-black uppercase text-[11px] tracking-[0.2em] transition-all shadow-[0_0_30px_rgba(245,158,11,0.2)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                      Synchronizing...
                    </>
                  ) : (
                    <>
                      <Save size={16} /> Register Node
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/admin/TeamManagement')}
                  disabled={loading}
                  className="px-10 py-4 border border-white/10 hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl font-black uppercase text-[11px] tracking-[0.2em] transition-all"
                >
                  Abort
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
            <Cpu className="text-amber-500 mb-4" size={32} />
            <h3 className="text-sm font-black uppercase tracking-widest mb-4">
              Protocol Specs
            </h3>
            <ul className="space-y-4">
              {[
                'Automatic Encryption (Bcrypt v12)',
                'Role-Based Access Control (RBAC)',
                'Real-time Node Monitoring',
                'Instant Credential Dispatch',
                'Email Uniqueness Validation',
                'Default Active Status',
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
              "Password hashing is handled securely on the backend using bcrypt
              with 12 salt rounds. Never send hashed passwords from the
              frontend."
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-6"
          >
            <h4 className="text-[10px] font-black uppercase tracking-widest text-amber-500/60 mb-3">
              Available Roles
            </h4>
            <div className="space-y-2">
              {[
                { role: 'Owner', desc: 'Full system access' },
                { role: 'Manager', desc: 'Team oversight' },
                { role: 'Sales', desc: 'CRM operations' },
                { role: 'Developer', desc: 'Tech tasks' },
                { role: 'Designer', desc: 'Creative work' },
                { role: 'Writer', desc: 'Content creation' },
              ].map((r, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between text-[9px] text-white/30"
                >
                  <span className="font-bold uppercase">{r.role}</span>
                  <span className="italic">{r.desc}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CreateStaff;
