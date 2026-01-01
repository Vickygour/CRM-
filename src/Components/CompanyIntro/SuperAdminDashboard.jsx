import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
} from "recharts";
import {
  TrendingUp,
  Users,
  Target,
  Clock,
  Zap,
  MoreHorizontal,
  FileText,
  Flame,
  Globe,
  Activity,
  RefreshCw,
  Crown,
  DollarSign,
  ArrowUpRight,
  Shield,
  HardDrive,
  LayoutGrid,
} from "lucide-react";
import api from "../../api";

const formatCurrency = (v) => {
  if (!v) return "₹0";
  if (v >= 100000) return `₹${(v / 100000).toFixed(2)}L`;
  if (v >= 1000) return `₹${(v / 1000).toFixed(0)}K`;
  return `₹${v}`;
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const diffMs = new Date() - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  if (diffMins < 60) return `${diffMins}m`;
  if (diffHours < 24) return `${diffHours}h`;
  return `${diffDays}d`;
};

const getInitials = (name) => {
  if (!name) return "NA";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const DashboardMain = () => {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);
  const [funnelData, setFunnelData] = useState(null);
  const [taskPerformance, setTaskPerformance] = useState(null);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const [db, funnel, tasks] = await Promise.all([
        api.get("/dashboard/overview"),
        api.get("/dashboard/leads/analytics"),
        api.get("/dashboard/tasks/analytics"),
      ]);
      if (db.data.success) setDashboardData(db.data.data);
      if (funnel.data.success) setFunnelData(funnel.data.data);
      if (tasks.data.success) setTaskPerformance(tasks.data.data);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      window.location.href = "/login";
      return;
    }
    fetchAllData();
  }, []);

  if (loading) return <LuxuryLoader />;

  const chartFunnelData =
    funnelData?.funnel?.map((item) => ({
      stage: item._id.toUpperCase(),
      value: item.avgDealValue,
      count: item.count,
    })) || [];

  const radarData =
    dashboardData?.leads?.byPriority?.map((p) => ({
      priority: p._id,
      value: p.count,
    })) || [];

  return (
    <div className="min-h-screen bg-[#050505] text-white font-['Space_Grotesk',sans-serif] selection:bg-amber-500/30">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,#1a1600_0%,#000_60%)] pointer-events-none" />
      <main className="relative z-10 max-w-[1800px] mx-auto p-4 lg:p-10 space-y-8">
        <header className="flex flex-col md:flex-row justify-between items-start gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-amber-500 animate-pulse shadow-[0_0_10px_#f59e0b]" />
              <span className="text-[10px] tracking-[0.4em] text-white/30 font-black uppercase">
                Secure Terminal V2.0
              </span>
            </div>
            <h1 className="text-5xl font-light tracking-tighter">
              Gold
              <span className="font-black italic text-transparent bg-clip-text bg-gradient-to-b from-amber-200 to-amber-600">
                Intelligence
              </span>
            </h1>
          </div>
          <div className="flex gap-4">
            <div className="hidden sm:block text-right pr-6 border-r border-white/5">
              <p className="text-[10px] text-white/20 uppercase font-bold tracking-widest">
                Global Status
              </p>
              <p className="text-sm font-mono text-amber-500 font-bold tracking-tighter italic">
                SYSTEM_OPTIMAL
              </p>
            </div>
            <button
              onClick={fetchAllData}
              className="p-4 bg-gradient-to-br from-amber-400 to-amber-600 text-black rounded-2xl hover:shadow-[0_0_25px_rgba(245,158,11,0.3)] transition-all active:scale-95"
            >
              <RefreshCw
                size={20}
                className="hover:rotate-180 transition-transform duration-700"
              />
            </button>
          </div>
        </header>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <StatBox
            label="Pipeline"
            value={formatCurrency(dashboardData.summary?.totalDealValue)}
            sub={`${dashboardData.summary?.totalLeads} Active Leads`}
            icon={TrendingUp}
          />
          <StatBox
            label="Entities"
            value={dashboardData.summary?.totalLeads}
            sub={`${dashboardData.leads?.converted || 0} Converted`}
            icon={Users}
          />
          <StatBox
            label="Operations"
            value={dashboardData.summary?.totalTasks}
            sub={`${dashboardData.summary?.overdueTasks} Overdue`}
            icon={Target}
          />
          <StatBox
            label="Data Vault"
            value={`${dashboardData.files?.totalStorageMB}MB`}
            sub={`${dashboardData.files?.total} Assets`}
            icon={HardDrive}
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 backdrop-blur-3xl group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-[100px] pointer-events-none" />
            <div className="flex justify-between items-center mb-10">
              <div>
                <h3 className="text-lg font-bold uppercase tracking-widest flex items-center gap-3">
                  <Activity size={18} className="text-amber-500" /> Revenue Flow
                  Intelligence
                </h3>
                <p className="text-[10px] text-white/20 mt-1">
                  Average Deal:{" "}
                  {formatCurrency(
                    (dashboardData.summary?.totalDealValue || 0) /
                      (dashboardData.summary?.totalLeads || 1)
                  )}
                </p>
              </div>
              <div className="px-3 py-1 bg-white/5 rounded-full border border-white/10 text-[10px] font-bold text-amber-500">
                LIVE FEED
              </div>
            </div>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartFunnelData}>
                  <defs>
                    <linearGradient id="goldFlow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.02)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="stage"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#444", fontSize: 10, fontWeight: 700 }}
                    dy={10}
                  />
                  <YAxis hide />
                  <Tooltip
                    content={<CustomTooltip />}
                    cursor={{
                      stroke: "#f59e0b",
                      strokeWidth: 1,
                      strokeDasharray: "4 4",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#f59e0b"
                    strokeWidth={4}
                    fillOpacity={1}
                    fill="url(#goldFlow)"
                    animationDuration={2000}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/5">
              {chartFunnelData.map((stage, i) => (
                <div key={i} className="group cursor-default">
                  <p className="text-[9px] font-black text-white/20 uppercase tracking-widest mb-1 group-hover:text-amber-500 transition-colors">
                    {stage.stage}
                  </p>
                  <p className="text-xl font-bold tracking-tighter">
                    {formatCurrency(stage.value)}
                  </p>
                  <p className="text-[10px] text-white/40">
                    {stage.count} Nodes
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-gradient-to-br from-amber-500 to-amber-700 rounded-[2.5rem] p-8 text-black relative overflow-hidden group">
              <Zap
                size={140}
                className="absolute -right-10 -bottom-10 opacity-20 group-hover:rotate-12 transition-transform duration-1000"
              />
              <p className="text-xs font-black uppercase tracking-widest opacity-60 mb-2">
                Efficiency Rating
              </p>
              <h3 className="text-6xl font-black tracking-tighter mb-4 italic">
                {taskPerformance?.completionRate || "0%"}
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-black uppercase">
                  <span>Task Progress</span>
                  <span>
                    {taskPerformance?.completedTasks}/
                    {taskPerformance?.totalTasks}
                  </span>
                </div>
                <div className="h-1.5 bg-black/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: taskPerformance?.completionRate }}
                    className="h-full bg-black rounded-full"
                  />
                </div>
              </div>
            </div>
            <div className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 backdrop-blur-3xl">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white/30 mb-6">
                Traffic Analysis
              </h3>
              <div className="space-y-5">
                {dashboardData.leads?.bySource?.map((source, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-[11px] font-bold mb-2">
                      <span className="uppercase tracking-tighter text-white/60">
                        {source._id || "Unknown"}
                      </span>
                      <span className="text-amber-500 font-mono italic">
                        {source.count}
                      </span>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${
                            (source.count / dashboardData.summary.totalLeads) *
                            100
                          }%`,
                        }}
                        className="h-full bg-amber-500/40 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 backdrop-blur-3xl">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white/30 italic">
                Active Ingress Ledger
              </h3>
              <LayoutGrid size={16} className="text-white/10" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dashboardData.recentActivities?.leads?.map((lead, i) => (
                <motion.div
                  whileHover={{ x: 5 }}
                  key={i}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-amber-500/20 transition-all cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center font-black text-amber-500 text-xs border border-white/5 group-hover:border-amber-500/50">
                    {getInitials(lead.name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold uppercase tracking-tight truncate group-hover:text-amber-500">
                      {lead.name}
                    </p>
                    <p className="text-[10px] text-white/30 uppercase truncate">
                      {lead.company}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] font-bold text-amber-500/60 uppercase">
                      {lead.status}
                    </p>
                    <p className="text-[9px] text-white/20">
                      {formatDate(lead.createdAt)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-4 bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-center">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white/30 mb-8 w-full text-left italic">
              Priority Spread
            </h3>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="rgba(255,255,255,0.05)" />
                  <PolarAngleAxis
                    dataKey="priority"
                    tick={{
                      fill: "rgba(255,255,255,0.3)",
                      fontSize: 10,
                      fontWeight: "bold",
                    }}
                  />
                  <Radar
                    dataKey="value"
                    stroke="#f59e0b"
                    fill="#f59e0b"
                    fillOpacity={0.2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 p-4 bg-amber-500/5 border border-amber-500/10 rounded-2xl w-full">
              <p className="text-[10px] font-bold text-amber-500 uppercase">
                Avg Conversion
              </p>
              <p className="text-xl font-black italic">
                {funnelData?.avgConversionTime || "N/A"}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const StatBox = ({ label, value, sub, icon: Icon }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-white/[0.02] border border-white/5 p-6 md:p-8 rounded-[2rem] relative overflow-hidden group backdrop-blur-3xl shadow-2xl"
  >
    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-20 group-hover:scale-110 transition-all duration-500">
      <Icon size={32} className="text-amber-500" />
    </div>
    <div className="relative z-10">
      <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mb-4 italic">
        {label}
      </p>
      <h2 className="text-3xl md:text-4xl font-black tracking-tighter mb-1 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
        {value}
      </h2>
      <p className="text-[10px] font-bold text-amber-500/60 uppercase tracking-tighter">
        {sub}
      </p>
    </div>
  </motion.div>
);

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#111] border border-amber-500/40 p-5 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-2xl">
        <p className="text-[9px] font-black text-amber-500 uppercase tracking-widest mb-2 border-b border-white/5 pb-2 italic">
          {payload[0].payload.stage}
        </p>
        <p className="text-2xl font-black text-white italic tracking-tighter">
          {formatCurrency(payload[0].value)}
        </p>
        <div className="mt-2 flex items-center gap-2 text-[10px] font-bold text-white/40 uppercase">
          <Users size={12} /> {payload[0].payload.count} High-Value Nodes
        </div>
      </div>
    );
  }
  return null;
};

const LuxuryLoader = () => (
  <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center">
    <div className="relative flex items-center justify-center">
      <div className="h-20 w-20 border-t-2 border-amber-500 rounded-full animate-spin" />
      <Crown className="absolute text-amber-500 animate-pulse" size={30} />
    </div>
    <p className="mt-10 text-[10px] tracking-[1.2em] font-black text-amber-500/40 uppercase animate-pulse italic">
      Authenticating_Access
    </p>
  </div>
);

export default DashboardMain;
