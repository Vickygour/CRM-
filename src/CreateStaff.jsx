import React, { useState, useEffect } from 'react';
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
  Edit2,
} from 'lucide-react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../src/api';

const CreateStaff = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  // Check if Edit Mode
  const isEditMode = !!id || !!location.state?.user;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    role: 'sales',
    isActive: true,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetchingUser, setFetchingUser] = useState(false);

  // ⭐ Auto-fill data when editing
  useEffect(() => {
    if (isEditMode) {
      // Case 1: Data from location.state
      if (location.state?.user) {
        const u = location.state.user;
        console.log('✅ User from location.state:', u);

        setFormData({
          name: u.name || '',
          email: u.email || '',
          phone: u.phone || '',
          role: u.role || 'sales',
          password: '',
          confirmPassword: '',
          isActive: u.isActive ?? true,
        });
      }
      // Case 2: Fetch from API using ID
      else if (id) {
        fetchUserData(id);
      }
    }
  }, [id, location.state, isEditMode]);

  const fetchUserData = async (userId) => {
    try {
      setFetchingUser(true);
      const res = await api.get(`/auth/users/${userId}`);
      console.log('✅ User fetched from API:', res.data);

      if (res.data.success && res.data.data) {
        const u = res.data.data;
        setFormData({
          name: u.name || '',
          email: u.email || '',
          phone: u.phone || '',
          role: u.role || 'sales',
          password: '',
          confirmPassword: '',
          isActive: u.isActive ?? true,
        });
      }
    } catch (err) {
      console.error('❌ Fetch user error:', err);
      setErrors({
        submit: err.response?.data?.message || 'Failed to fetch user data',
      });
    } finally {
      setFetchingUser(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
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
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    // Phone validation (optional but if provided, must be 10 digits)
    if (formData.phone && !/^\d{10}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Phone must be 10 digits';
    }

    // Password validation
    if (!isEditMode) {
      // Create mode: Password required
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 6) {
        newErrors.password = 'Minimum 6 characters required';
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    } else {
      // Edit mode: Password optional, but if provided must be valid
      if (formData.password) {
        if (formData.password.length < 6) {
          newErrors.password = 'Minimum 6 characters required';
        }
        if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = 'Passwords do not match';
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setErrors({});

    try {
      if (isEditMode) {
        // ⭐ UPDATE MODE
        const userId =
          id || location.state?.user?._id || location.state?.user?.id;

        if (!userId) {
          setErrors({ submit: 'User ID missing. Cannot update.' });
          setLoading(false);
          return;
        }

        // Build update payload (exclude password if not provided)
        const updatePayload = {
          name: formData.name,
          email: formData.email,
          phone: formData.phone || undefined,
          role: formData.role,
          isActive: formData.isActive,
        };

        // ⭐ Only include password if user wants to change it
        if (formData.password && formData.password.trim()) {
          updatePayload.password = formData.password;
        }

        console.log('📤 Update payload:', updatePayload);

        const response = await api.put(`/auth/users/${userId}`, updatePayload);

        console.log('✅ Update response:', response.data);

        if (response.data.success) {
          alert('✅ Team member updated successfully!');
          navigate('/admin/TeamManagement');
        }
      } else {
        // ⭐ CREATE MODE
        const createPayload = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone || undefined,
          role: formData.role,
          isActive: formData.isActive,
        };

        console.log('📤 Create payload:', createPayload);

        const response = await api.post('/auth/register', createPayload);

        console.log('✅ Create response:', response.data);

        if (response.data.success) {
          alert('✅ Team member created successfully!');
          navigate('/admin/TeamManagement');
        }
      }
    } catch (error) {
      console.error('❌ API Error:', error.response?.data || error.message);
      setErrors({
        submit:
          error.response?.data?.message ||
          'Operation failed. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  // Loading state while fetching user
  if (fetchingUser) {
    return (
      <div className="min-h-screen bg-[#020202] text-white flex items-center justify-center">
        <div className="text-center">
          <Cpu className="animate-spin text-amber-500 mx-auto mb-4" size={48} />
          <p className="text-slate-400 font-bold">Loading user data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020202] text-white p-6 lg:p-12 font-['Space_Grotesk'] relative overflow-hidden">
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
          {isEditMode ? 'Modify ' : 'Initialize '}
          <span className="font-black italic bg-gradient-to-r from-amber-200 via-amber-500 to-amber-700 bg-clip-text text-transparent">
            {isEditMode ? 'NODE_CONFIG' : 'NEW_NODE'}
          </span>
        </h1>
      </motion.div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 bg-white/[0.02] border border-white/5 rounded-[2.5rem] overflow-hidden backdrop-blur-3xl shadow-2xl"
        >
          <div className="p-8 lg:p-12">
            <div className="flex items-center gap-3 mb-10">
              <div className="p-3 bg-amber-500/10 rounded-2xl border border-amber-500/20 text-amber-500">
                {isEditMode ? <Edit2 size={20} /> : <Terminal size={20} />}
              </div>
              <div>
                <h2 className="text-sm font-black uppercase tracking-widest text-white/80">
                  {isEditMode ? 'Update Parameters' : 'Entity Configuration'}
                </h2>
                <p className="text-[10px] text-white/30 uppercase tracking-[0.2em]">
                  {isEditMode
                    ? 'Modifying existing node sequence'
                    : 'Define node parameters and access levels'}
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

                {/* Phone */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-amber-500/60 ml-1">
                    Contact Number {!isEditMode && '*'}
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

                {/* Role */}
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
                    {isEditMode ? 'New Access Key (Optional)' : 'Access Key *'}
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
                      placeholder={
                        isEditMode
                          ? 'Leave blank to keep current'
                          : 'Min. 6 characters'
                      }
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
                    Verify Key {isEditMode && '(If Changing)'}
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

                {/* Status Toggle (Edit Mode Only) */}
                {isEditMode && (
                  <div className="space-y-2 flex flex-col justify-end pb-1 md:col-span-2">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative">
                        <input
                          type="checkbox"
                          name="isActive"
                          checked={formData.isActive}
                          onChange={handleChange}
                          className="sr-only peer"
                        />
                        <div className="w-12 h-6 bg-white/10 rounded-full peer-checked:bg-amber-500/30 transition-all border border-white/5 peer-checked:border-amber-500/50"></div>
                        <div className="absolute left-1 top-1 w-4 h-4 bg-white/20 rounded-full transition-all peer-checked:translate-x-6 peer-checked:bg-amber-500 shadow-xl"></div>
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">
                        Node Activation Status (Active:{' '}
                        {formData.isActive ? 'YES' : 'NO'})
                      </span>
                    </label>
                  </div>
                )}
              </div>

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
                      <Save size={16} />
                      {isEditMode ? 'Update Configuration' : 'Register Node'}
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
              {isEditMode ? 'Update Mode' : 'Protocol Specs'}
            </h3>
            <ul className="space-y-4">
              {isEditMode
                ? [
                    'Password update is optional',
                    'Leave blank to keep current',
                    'Email & phone must be unique',
                    'Role & status can be changed',
                  ]
                : [
                    'Automatic Encryption (Bcrypt v12)',
                    'Role-Based Access Control (RBAC)',
                    'Real-time Node Monitoring',
                    'Instant Credential Dispatch',
                  ].map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-3 text-[10px] font-bold text-white/50 uppercase tracking-tighter"
                    >
                      <div className="w-1 h-1 bg-amber-500 rounded-full" />{' '}
                      {item}
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
              {isEditMode
                ? '"When updating, you can optionally change the password. If left blank, the current password remains unchanged."'
                : '"Password hashing is handled securely on the backend using bcrypt. Never send hashed passwords from the frontend."'}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CreateStaff;
