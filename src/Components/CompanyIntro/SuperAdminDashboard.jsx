import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  CartesianGrid,
  PieChart,
  Pie,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
} from 'recharts';
import {
  TrendingUp,
  Users,
  Target,
  Clock,
  Zap,
  MoreHorizontal,
  Bell,
  Search,
  Download,
  Filter,
  DollarSign,
  BarChart3,
  FileText,
  Flame,
  Globe,
  Command,
  Layers,
  Grid3x3,
  LayoutDashboard,
  Loader2,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';
import api from '../../api'; // ✅ Import axios instance

// Helpers
const formatCurrency = (value) => {
  if (!value) return '₹0';
  if (value >= 100000) return `₹${(value / 100000).toFixed(2)}L`;
  if (value >= 1000) return `₹${(value / 1000).toFixed(0)}K`;
  return `₹${value}`;
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  if (diffMins < 60) return `${diffMins}m`;
  if (diffHours < 24) return `${diffHours}h`;
  return `${diffDays}d`;
};

const getInitials = (name) => {
  if (!name) return 'NA';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

const DashboardMain = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [view, setView] = useState('grid');

  // API State
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [funnelData, setFunnelData] = useState(null);
  const [taskPerformance, setTaskPerformance] = useState(null);

  // ✅ Fetch Dashboard Overview with Axios
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('📊 Fetching dashboard overview...');

      // ✅ Use axios api instance - token automatically added
      const response = await api.get('/dashboard/overview');

      console.log('✅ Dashboard response:', response.data);

      if (response.data.success) {
        setDashboardData(response.data.data);
      } else {
        throw new Error('Failed to fetch dashboard data');
      }
    } catch (err) {
      console.error('❌ Dashboard fetch error:', err);
      setError(
        err.response?.data?.message ||
          err.message ||
          'Failed to load dashboard',
      );
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch Funnel Data with Axios
  const fetchFunnelData = async () => {
    try {
      console.log('📈 Fetching funnel data...');

      const response = await api.get('/dashboard/leads/analytics');

      console.log('✅ Funnel response:', response.data);

      if (response.data.success) {
        setFunnelData(response.data.data);
      }
    } catch (err) {
      console.error('❌ Funnel fetch error:', err);
      // Don't show error for optional data
    }
  };

  // ✅ Fetch Task Performance with Axios
  const fetchTaskPerformance = async () => {
    try {
      console.log('📋 Fetching task performance...');

      const response = await api.get('/dashboard/tasks/analytics');

      console.log('✅ Task performance response:', response.data);

      if (response.data.success) {
        setTaskPerformance(response.data.data);
      }
    } catch (err) {
      console.error('❌ Task performance fetch error:', err);
      // Don't show error for optional data
    }
  };

  // Initial Data Load
  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('authToken');
    const userData =
      localStorage.getItem('userData') || localStorage.getItem('user');

    console.log('=== Dashboard Mount ===');
    console.log('Token exists:', !!token);
    console.log('User data exists:', !!userData);

    if (!token || !userData) {
      console.log('❌ No authentication - redirecting to login');
      window.location.href = '/login';
      return;
    }

    // Fetch all data
    fetchDashboardData();
    fetchFunnelData();
    fetchTaskPerformance();
  }, []);

  // Refresh Data
  const handleRefresh = () => {
    console.log('🔄 Refreshing dashboard data...');
    fetchDashboardData();
    fetchFunnelData();
    fetchTaskPerformance();
  };

  // Prepare Chart Data
  const chartFunnelData =
    funnelData?.funnel?.map((item) => ({
      stage: item._id.charAt(0).toUpperCase() + item._id.slice(1),
      value: item.avgDealValue,
      count: item.count,
    })) || [];

  // Radar data for priority
  const radarData =
    dashboardData?.leads?.byPriority?.map((p) => ({
      priority: p._id,
      value: p.count,
    })) || [];

  // Loading State
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a]">
        <div className="text-center">
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-blue-500" />
          <p className="mt-4 text-sm text-white/60">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a]">
        <div className="max-w-md text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-rose-500" />
          <p className="mt-4 text-lg font-semibold text-white">
            Failed to load dashboard
          </p>
          <p className="mt-2 text-sm text-white/60">{error}</p>
          <div className="mt-6 flex gap-3 justify-center">
            <button
              onClick={handleRefresh}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              <RefreshCw className="h-4 w-4" />
              Retry
            </button>
            <button
              onClick={() => {
                localStorage.clear();
                window.location.href = '/login';
              }}
              className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }

  // No Data State
  if (!dashboardData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a]">
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-amber-500" />
          <p className="mt-4 text-lg font-semibold text-white">
            No data available
          </p>
          <p className="mt-2 text-sm text-white/60">Please try again later</p>
          <button
            onClick={handleRefresh}
            className="mt-6 flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 mx-auto"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-['Inter',sans-serif] antialiased">
      {/* COMMAND BAR - Linear Style */}
   
      <main className="mx-auto max-w-[1800px] px-4 pt-24 pb-12 md:px-6 lg:px-8">
        {/* KPI GRID - Hyper Minimalist */}
        <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {[
            {
              label: 'Pipeline',
              value: formatCurrency(dashboardData.summary?.totalDealValue || 0),
              change: `${dashboardData.summary?.totalLeads || 0} leads`,
              icon: TrendingUp,
            },
            {
              label: 'Leads',
              value: dashboardData.summary?.totalLeads || 0,
              change: `${dashboardData.leads?.converted || 0} converted`,
              icon: Users,
            },
            {
              label: 'Tasks',
              value: dashboardData.summary?.totalTasks || 0,
              change: `${dashboardData.summary?.overdueTasks || 0} overdue`,
              icon: Target,
            },
            {
              label: 'Storage',
              value: `${dashboardData.files?.totalStorageMB || 0}MB`,
              change: `${dashboardData.files?.total || 0} file${
                dashboardData.files?.total !== 1 ? 's' : ''
              }`,
              icon: FileText,
            },
          ].map((metric, idx) => (
            <MinimalKPI key={idx} {...metric} delay={idx * 0.05} />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">
          {/* MAIN AREA */}
          <div className="lg:col-span-8 space-y-3">
            {/* Funnel Chart */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="group rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-xl transition-all hover:border-white/10"
            >
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10">
                    <BarChart3 className="h-4 w-4 text-blue-400" />
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold">Sales Funnel</h2>
                    <p className="text-xs text-white/40">
                      Avg:{' '}
                      {formatCurrency(
                        (dashboardData.summary?.totalDealValue || 0) /
                          (dashboardData.summary?.totalLeads || 1),
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1.5 rounded-md bg-green-500/10 px-2 py-1 text-[10px] font-medium text-green-400">
                    <span className="h-1 w-1 animate-pulse rounded-full bg-green-500"></span>
                    Live
                  </span>
                  <button className="rounded-lg p-1.5 transition-colors hover:bg-white/[0.04]">
                    <MoreHorizontal className="h-4 w-4 text-white/40" />
                  </button>
                </div>
              </div>

              {chartFunnelData.length > 0 ? (
                <>
                  <div className="mb-4 h-[280px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={chartFunnelData}
                        margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient
                            id="barGrad"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="0%"
                              stopColor="#3b82f6"
                              stopOpacity={0.8}
                            />
                            <stop
                              offset="100%"
                              stopColor="#3b82f6"
                              stopOpacity={0.2}
                            />
                          </linearGradient>
                        </defs>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="rgba(255,255,255,0.03)"
                          vertical={false}
                        />
                        <XAxis
                          dataKey="stage"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }}
                        />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }}
                          tickFormatter={(val) => formatCurrency(val)}
                        />
                        <Tooltip
                          content={<DarkTooltip />}
                          cursor={{ fill: 'rgba(59, 130, 246, 0.05)' }}
                        />
                        <Bar
                          dataKey="value"
                          fill="url(#barGrad)"
                          radius={[8, 8, 0, 0]}
                          barSize={60}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Stage Cards */}
                  <div className="grid grid-cols-3 gap-2">
                    {chartFunnelData.map((stage, idx) => (
                      <div
                        key={idx}
                        className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 transition-all hover:border-white/10"
                      >
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-[10px] font-medium uppercase tracking-wider text-white/40">
                            {stage.stage}
                          </span>
                          <span className="text-[10px] text-white/30">
                            {stage.count}
                          </span>
                        </div>
                        <p className="text-lg font-bold">
                          {formatCurrency(stage.value)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 flex items-center justify-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] py-2 text-xs">
                    <Clock className="h-3.5 w-3.5 text-white/40" />
                    <span className="text-white/60">
                      Conversion:{' '}
                      <span className="font-semibold text-white">
                        {funnelData?.avgConversionTime || '0 days'}
                      </span>
                    </span>
                  </div>
                </>
              ) : (
                <div className="flex h-[280px] items-center justify-center text-white/40">
                  <p>No funnel data available</p>
                </div>
              )}
            </motion.div>

            {/* Source & Priority */}
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {/* Sources */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 backdrop-blur-xl"
              >
                <div className="mb-4 flex items-center gap-2">
                  <Globe className="h-4 w-4 text-purple-400" />
                  <h3 className="text-sm font-semibold">Sources</h3>
                </div>

                <div className="space-y-3">
                  {dashboardData.leads?.bySource?.map((source, idx) => {
                    const colors = ['#6366f1', '#8b5cf6', '#ec4899'];
                    const percentage =
                      (source.count / (dashboardData.leads?.total || 1)) * 100;
                    return (
                      <div key={idx} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <div
                              className="h-2 w-2 rounded-full"
                              style={{
                                backgroundColor: colors[idx % colors.length],
                              }}
                            ></div>
                            <span className="capitalize text-white/60">
                              {source._id?.replace('-', ' ') || 'Unknown'}
                            </span>
                          </div>
                          <span className="font-semibold">{source.count}</span>
                        </div>
                        <div className="h-1 overflow-hidden rounded-full bg-white/[0.06]">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                            className="h-full rounded-full"
                            style={{
                              backgroundColor: colors[idx % colors.length],
                            }}
                          ></motion.div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Priority Radar */}
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
                className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 backdrop-blur-xl"
              >
                <div className="mb-4 flex items-center gap-2">
                  <Flame className="h-4 w-4 text-orange-400" />
                  <h3 className="text-sm font-semibold">Priority</h3>
                </div>

                {radarData.length > 0 ? (
                  <div className="h-[180px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={radarData}>
                        <PolarGrid stroke="rgba(255,255,255,0.1)" />
                        <PolarAngleAxis
                          dataKey="priority"
                          tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11 }}
                        />
                        <Radar
                          dataKey="value"
                          stroke="#f97316"
                          fill="#f97316"
                          fillOpacity={0.3}
                        />
                        <Tooltip content={<DarkTooltip />} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="flex h-[180px] items-center justify-center text-white/40">
                    <p>No priority data</p>
                  </div>
                )}
              </motion.div>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="lg:col-span-4 space-y-3">
            {/* Performance */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-xl border border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-white/[0.02] p-6 backdrop-blur-xl"
            >
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-yellow-400" />
                  <span className="text-sm font-semibold">Performance</span>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="mb-1 text-5xl font-bold tracking-tight">
                  {taskPerformance?.completionRate || '0.00%'}
                </h3>
                <p className="text-xs text-white/40">Task completion</p>
              </div>

              <div className="mb-4 space-y-1.5">
                <div className="flex justify-between text-[10px] text-white/40">
                  <span>Progress</span>
                  <span>
                    {taskPerformance?.completedTasks || 0}/
                    {taskPerformance?.totalTasks || 0}
                  </span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: taskPerformance?.completionRate || '0%' }}
                    className="h-full rounded-full bg-gradient-to-r from-yellow-500 to-orange-500"
                  ></motion.div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {[
                  {
                    label: 'Time',
                    value: taskPerformance?.avgTimeSpent || '0 hours',
                  },
                  {
                    label: 'Accuracy',
                    value: taskPerformance?.timeAccuracy || '0%',
                  },
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3"
                  >
                    <p className="mb-1 text-[10px] uppercase tracking-wider text-white/40">
                      {stat.label}
                    </p>
                    <p className="text-sm font-bold">{stat.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Leads List */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl"
            >
              <div className="flex items-center justify-between border-b border-white/[0.06] p-4">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-400" />
                  <h3 className="text-sm font-semibold">Recent</h3>
                </div>
                <span className="text-xs text-white/40">
                  {dashboardData.recentActivities?.leads?.length || 0}
                </span>
              </div>

              <div className="divide-y divide-white/[0.06]">
                {dashboardData.recentActivities?.leads?.map((lead, idx) => (
                  <motion.div
                    key={lead._id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + idx * 0.05 }}
                    whileHover={{
                      x: 2,
                      backgroundColor: 'rgba(255,255,255,0.02)',
                    }}
                    className="cursor-pointer p-3 transition-colors"
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-[10px] font-bold">
                        {getInitials(lead.name)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="truncate text-xs font-semibold">
                          {lead.name}
                        </p>
                        <p className="truncate text-[10px] text-white/40">
                          {lead.company}
                        </p>
                      </div>
                      <span className="text-[10px] text-white/30">
                        {formatDate(lead.createdAt)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="rounded bg-white/[0.06] px-2 py-0.5 text-[9px] font-medium uppercase tracking-wide text-white/60">
                        {lead.status}
                      </span>
                      <span className="text-[10px] capitalize text-white/40">
                        {lead.source?.replace('-', ' ') || 'Unknown'}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Task */}
            {dashboardData.recentActivities?.tasks?.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 backdrop-blur-xl"
              >
                <div className="mb-4 flex items-center gap-2">
                  <Target className="h-4 w-4 text-orange-400" />
                  <h3 className="text-sm font-semibold">Active Task</h3>
                </div>

                {dashboardData.recentActivities.tasks[0] && (
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-semibold">
                        {dashboardData.recentActivities.tasks[0].projectName}
                      </p>
                      <p className="text-xs text-white/40">
                        {dashboardData.recentActivities.tasks[0].client
                          ?.company || 'No client'}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {[
                        dashboardData.recentActivities.tasks[0].priority,
                        dashboardData.recentActivities.tasks[0].stage,
                        dashboardData.recentActivities.tasks[0].status,
                      ].map((tag, idx) => (
                        <span
                          key={idx}
                          className="rounded bg-white/[0.06] px-2 py-1 text-[9px] font-medium uppercase tracking-wide text-white/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {dashboardData.recentActivities.tasks[0].deadline && (
                      <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-white/40">Deadline</span>
                          <span className="font-semibold">
                            {new Date(
                              dashboardData.recentActivities.tasks[0].deadline,
                            ).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                            })}
                          </span>
                        </div>
                      </div>
                    )}

                    {dashboardData.recentActivities.tasks[0].assignedTo && (
                      <div className="flex -space-x-2">
                        {[dashboardData.recentActivities.tasks[0].assignedTo]
                          .flat()
                          .map((user, idx) => (
                            <div
                              key={idx}
                              className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#0a0a0a] bg-gradient-to-br from-blue-500 to-purple-500 text-[10px] font-bold"
                            >
                              {getInitials(user.name)}
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

// --- COMPONENTS ---

const MinimalKPI = ({ label, value, change, icon: Icon, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ y: -2, borderColor: 'rgba(255, 255, 255, 0.1)' }}
      className="group rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 backdrop-blur-xl transition-all"
    >
      <div className="mb-3 flex items-center justify-between">
        <Icon className="h-4 w-4 text-white/40" />
      </div>

      <div className="space-y-0.5">
        <p className="text-[10px] font-medium uppercase tracking-wider text-white/40">
          {label}
        </p>
        <p className="text-2xl font-bold tracking-tight">{value}</p>
        <p className="text-xs text-white/40">{change}</p>
      </div>
    </motion.div>
  );
};

const DarkTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-lg border border-white/10 bg-black/80 p-3 backdrop-blur-2xl"
      >
        {data.stage && (
          <>
            <p className="mb-1 text-[10px] uppercase tracking-wider text-white/40">
              {data.stage}
            </p>
            <p className="mb-2 text-xl font-bold">
              {formatCurrency(data.value)}
            </p>
            <div className="flex items-center gap-2 text-xs text-white/60">
              <Users className="h-3 w-3" />
              <span>
                {data.count} lead{data.count !== 1 ? 's' : ''}
              </span>
            </div>
          </>
        )}
        {data.priority && (
          <>
            <p className="text-xs capitalize text-white/60">{data.priority}</p>
            <p className="text-sm font-bold">{data.value}</p>
          </>
        )}
      </motion.div>
    );
  }
  return null;
};

export default DashboardMain;
