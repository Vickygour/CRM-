import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Phone,
  Mail,
  Calendar,
  TrendingUp,
  Check,
  User,
  Grid3x3,
  List,
  MoreVertical,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const TeamManagement = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState("grid");

  const teamMembers = [
    {
      id: 1,
      name: "Vikram Singh",
      email: "vikram@crm.com",
      role: "Caller",
      callsMade: 145,
      joinDate: "2024-01-15",
      status: "active",
      avatar: "VS",
      performance: 92,
    },
    {
      id: 2,
      name: "Anjali Mehta",
      email: "anjali@crm.com",
      role: "Caller",
      callsMade: 132,
      joinDate: "2024-02-20",
      status: "active",
      avatar: "AM",
      performance: 88,
    },
    {
      id: 3,
      name: "Rajesh Kumar",
      email: "rajesh@crm.com",
      role: "Senior Caller",
      callsMade: 128,
      joinDate: "2023-11-10",
      status: "active",
      avatar: "RK",
      performance: 85,
    },
    {
      id: 4,
      name: "Sunita Sharma",
      email: "sunita@crm.com",
      role: "Caller",
      callsMade: 118,
      joinDate: "2024-03-05",
      status: "inactive",
      avatar: "SS",
      performance: 75,
    },
    {
      id: 5,
      name: "Arjun Patel",
      email: "arjun@crm.com",
      role: "Caller",
      callsMade: 105,
      joinDate: "2024-01-28",
      status: "active",
      avatar: "AP",
      performance: 80,
    },
  ];

  const stats = [
    {
      label: "Total Members",
      value: teamMembers.length,
      icon: User,
      color: "amber",
    },
    {
      label: "Active Now",
      value: teamMembers.filter((m) => m.status === "active").length,
      icon: Check,
      color: "emerald",
    },
    {
      label: "Total Calls",
      value: teamMembers.reduce((sum, m) => sum + m.callsMade, 0),
      icon: Phone,
      color: "blue",
    },
    {
      label: "Avg Score",
      value: `${Math.round(
        teamMembers.reduce((sum, m) => sum + m.performance, 0) /
          teamMembers.length
      )}%`,
      icon: TrendingUp,
      color: "amber",
    },
  ];

  const filteredMembers = teamMembers.filter(
    (m) =>
      (m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.email.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (statusFilter === "all" || m.status === statusFilter)
  );

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-white uppercase">
              Team <span className="text-amber-500">Management</span>
            </h1>
            <p className="text-slate-500 text-sm font-medium mt-1 uppercase tracking-widest">
              High-performance calling squad
            </p>
          </div>
          <button
            onClick={() => navigate("/admin/create-staff")}
            className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-black px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-amber-500/10 active:scale-95"
          >
            <Plus size={18} />
            ADD NEW MEMBER
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-[#0A0A0A] border border-white/[0.05] p-5 rounded-2xl relative overflow-hidden group"
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${
                  stat.color === "amber"
                    ? "bg-amber-500/10 text-amber-500"
                    : stat.color === "emerald"
                    ? "bg-emerald-500/10 text-emerald-500"
                    : "bg-blue-500/10 text-blue-500"
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
            </div>
          ))}
        </div>

        {/* Filters Bar */}
        <div className="bg-[#0A0A0A] border border-white/[0.05] p-4 rounded-2xl mb-8 flex flex-col lg:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
              size={18}
            />
            <input
              type="text"
              placeholder="SEARCH BY NAME OR EMAIL..."
              className="w-full bg-white/[0.03] border border-white/[0.05] rounded-xl py-3 pl-12 pr-4 text-xs font-bold tracking-widest text-white focus:border-amber-500/50 outline-none transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center bg-white/[0.03] p-1 rounded-xl border border-white/[0.05]">
            {["all", "active", "inactive"].map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-6 py-2 rounded-lg text-[10px] font-black tracking-widest uppercase transition-all ${
                  statusFilter === s
                    ? "bg-amber-500 text-black"
                    : "text-slate-500 hover:text-white"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-1 bg-white/[0.03] p-1 rounded-xl border border-white/[0.05]">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg ${
                viewMode === "grid"
                  ? "text-amber-500 bg-white/5"
                  : "text-slate-500"
              }`}
            >
              <Grid3x3 size={18} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg ${
                viewMode === "list"
                  ? "text-amber-500 bg-white/5"
                  : "text-slate-500"
              }`}
            >
              <List size={18} />
            </button>
          </div>
        </div>

        {/* Members Grid View */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredMembers.map((member) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  key={member.id}
                  className="bg-[#0A0A0A] border border-white/[0.05] rounded-2xl p-6 group hover:border-amber-500/30 transition-all relative overflow-hidden"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center text-black font-black text-xl shadow-lg shadow-amber-500/20">
                      {member.avatar}
                    </div>
                    <span
                      className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${
                        member.status === "active"
                          ? "bg-emerald-500/10 text-emerald-500"
                          : "bg-slate-500/10 text-slate-500"
                      }`}
                    >
                      {member.status}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-amber-500 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-slate-500 text-xs font-bold mb-6 tracking-wide uppercase">
                    {member.role}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white/[0.02] p-3 rounded-xl border border-white/[0.05]">
                      <p className="text-[9px] font-black text-slate-500 uppercase tracking-tighter">
                        Calls Made
                      </p>
                      <p className="text-lg font-bold text-white">
                        {member.callsMade}
                      </p>
                    </div>
                    <div className="bg-white/[0.02] p-3 rounded-xl border border-white/[0.05]">
                      <p className="text-[9px] font-black text-slate-500 uppercase tracking-tighter">
                        Performance
                      </p>
                      <p className="text-lg font-bold text-amber-500">
                        {member.performance}%
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                      <Mail size={14} className="text-amber-500" />{" "}
                      {member.email}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                      <Calendar size={14} className="text-amber-500" /> Joined{" "}
                      {member.joinDate}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        navigate(`/admin/edit-staff/${member.id}`, {
                          state: { member },
                        })
                      }
                      className="flex-1 bg-white/[0.05] hover:bg-white/[0.1] text-white py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
                    >
                      <Edit2 size={14} /> EDIT
                    </button>
                    <button className="w-12 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white py-2.5 rounded-xl transition-all flex items-center justify-center">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          /* List View / Table */
          <div className="bg-[#0A0A0A] border border-white/[0.05] rounded-2xl overflow-hidden">
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
                    Performance
                  </th>
                  <th className="p-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    Status
                  </th>
                  <th className="p-5 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map((member) => (
                  <tr
                    key={member.id}
                    className="border-b border-white/[0.05] hover:bg-white/[0.01] transition-colors"
                  >
                    <td className="p-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center text-black font-bold text-sm">
                          {member.avatar}
                        </div>
                        <div>
                          <p className="font-bold text-white text-sm">
                            {member.name}
                          </p>
                          <p className="text-[10px] text-slate-500 font-bold">
                            {member.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-5 text-xs font-bold text-slate-400 uppercase tracking-widest">
                      {member.role}
                    </td>
                    <td className="p-5">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-1.5 w-24 bg-white/[0.05] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-amber-500"
                            style={{ width: `${member.performance}%` }}
                          />
                        </div>
                        <span className="text-xs font-bold text-white">
                          {member.performance}%
                        </span>
                      </div>
                    </td>
                    <td className="p-5">
                      <span
                        className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${
                          member.status === "active"
                            ? "bg-emerald-500/10 text-emerald-500"
                            : "bg-slate-500/10 text-slate-500"
                        }`}
                      >
                        {member.status}
                      </span>
                    </td>
                    <td className="p-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-slate-400 hover:text-amber-500 transition-colors">
                          <Edit2 size={16} />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamManagement;
