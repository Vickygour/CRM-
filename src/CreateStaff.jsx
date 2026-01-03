import React, { useState } from "react";
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
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import api from "./api"; // Aapka axios instance

const CreateStaff = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "", // Mapped from 'fullName'
    email: "",
    password: "",
    confirmPassword: "",
    role: "sales", // Match schema enum: owner, manager, sales, designer, etc.
    isActive: true,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Minimum 6 characters required";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      // API call matching your Schema
      const response = await api.post("/users/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        isActive: formData.isActive,
      });

      if (response.data.success) {
        alert("Entity Synchronized Successfully!");
        navigate("/admin/TeamManagement");
      }
    } catch (error) {
      setErrors({
        submit: error.response?.data?.message || "System linkage failed.",
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
          onClick={() => navigate("/admin/TeamManagement")}
          className="group flex items-center gap-2 text-white/40 hover:text-amber-500 transition-all mb-6 uppercase text-[10px] tracking-[0.3em] font-black"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to Command Center
        </button>
        <h1 className="text-5xl font-light tracking-tighter">
          Initialize{" "}
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
                    Legal Identity
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
                      placeholder="Node Name"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-amber-500/50 focus:bg-white/[0.05] transition-all font-medium text-sm"
                    />
                  </div>
                  {errors.name && (
                    <p className="text-[9px] text-red-500 font-bold uppercase tracking-tighter">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-amber-500/60 ml-1">
                    Data Uplink (Email)
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
                      placeholder="email@quantum.xyz"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-amber-500/50 focus:bg-white/[0.05] transition-all font-medium text-sm"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-[9px] text-red-500 font-bold uppercase tracking-tighter">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-amber-500/60 ml-1">
                    Access Key
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
                      placeholder="••••••••"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-amber-500/50 focus:bg-white/[0.05] transition-all font-medium text-sm"
                    />
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-amber-500/60 ml-1">
                    Verify Key
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
                      placeholder="••••••••"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-amber-500/50 focus:bg-white/[0.05] transition-all font-medium text-sm"
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-[9px] text-red-500 font-bold uppercase tracking-tighter">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                {/* Role Selection */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-amber-500/60 ml-1">
                    Node Permissions
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
                  </select>
                </div>

                {/* Status Toggle */}
                <div className="space-y-2 flex flex-col justify-end pb-1">
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
                      Node Activation Status
                    </span>
                  </label>
                </div>
              </div>

              {errors.submit && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-500">
                  <XCircle size={18} />
                  <p className="text-[10px] font-black uppercase tracking-widest">
                    {errors.submit}
                  </p>
                </div>
              )}

              <div className="pt-6 flex flex-col sm:flex-row gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-4 bg-amber-500 hover:bg-amber-600 text-black rounded-2xl font-black uppercase text-[11px] tracking-[0.2em] transition-all shadow-[0_0_30px_rgba(245,158,11,0.2)] disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    "Synchronizing..."
                  ) : (
                    <>
                      <Save size={16} /> Register Node
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/admin/TeamManagement")}
                  className="px-10 py-4 border border-white/10 hover:bg-white/5 rounded-2xl font-black uppercase text-[11px] tracking-[0.2em] transition-all"
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
            className="bg-gradient-to-br from-amber-500/10 via-transparent to-transparent border border-amber-500/20 rounded-[2rem] p-8"
          >
            <Cpu className="text-amber-500 mb-4" size={32} />
            <h3 className="text-sm font-black uppercase tracking-widest mb-4">
              Protocol Specs
            </h3>
            <ul className="space-y-4">
              {[
                "Automatic Encryption (Bcrypt v12)",
                "Role-Based Access Control (RBAC)",
                "Real-time Node Monitoring",
                "Instant Credential Dispatch",
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

          <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-8">
            <Sparkles className="text-white/20 mb-4" size={24} />
            <p className="text-xs italic text-white/40 leading-relaxed">
              "New nodes are initialized with default 'Sales' permissions.
              Custom access hashes can be modified via the Vault settings after
              synchronization."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateStaff;
