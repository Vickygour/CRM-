import React from 'react';
import {
  Users,
  UserCheck,
  Phone,
  Calendar,
  TrendingUp,
  Trophy,
} from 'lucide-react';

const SuperAdminDashboard = () => {
  const callTrendsData = [
    { day: 'Mon', calls: 45, completed: 38 },
    { day: 'Tue', calls: 52, completed: 43 },
    { day: 'Wed', calls: 48, completed: 40 },
    { day: 'Thu', calls: 61, completed: 52 },
    { day: 'Fri', calls: 55, completed: 47 },
    { day: 'Sat', calls: 32, completed: 28 },
    { day: 'Sun', calls: 18, completed: 15 },
  ];

  const topPerformers = [
    { name: 'Rajesh Kumar', calls: 142, conversion: '85%', avatar: 'RK' },
    { name: 'Priya Singh', calls: 138, conversion: '82%', avatar: 'PS' },
    { name: 'Amit Sharma', calls: 125, conversion: '78%', avatar: 'AS' },
  ];

  const recentActivities = [
    {
      text: 'New customer "Rahul Sharma" added',
      time: '2 mins ago',
      type: 'customer',
    },
    {
      text: 'Call completed by Rajesh Kumar',
      time: '5 mins ago',
      type: 'call',
    },
    {
      text: 'Follow-up scheduled for "Priya Patel"',
      time: '12 mins ago',
      type: 'followup',
    },
    {
      text: 'New caller "Ankit Verma" joined',
      time: '25 mins ago',
      type: 'team',
    },
  ];

  return (
    <div className="p-4 lg:p-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
        {/* Total Callers Card */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-blue-100 text-sm mb-1">Total Callers</p>
              <h2 className="text-4xl font-bold">24</h2>
            </div>
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
          </div>
          <div className="flex items-center text-sm">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>+12% vs last month</span>
          </div>
        </div>

        {/* Total Customers Card */}
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-green-100 text-sm mb-1">Total Customers</p>
              <h2 className="text-4xl font-bold">1847</h2>
            </div>
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <UserCheck className="w-6 h-6" />
            </div>
          </div>
          <div className="flex items-center text-sm">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>+8.2% vs last month</span>
          </div>
        </div>

        {/* Total Calls Today Card */}
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-purple-100 text-sm mb-1">Total Calls Today</p>
              <h2 className="text-4xl font-bold">156</h2>
            </div>
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <Phone className="w-6 h-6" />
            </div>
          </div>
          <p className="text-sm text-purple-100">Live updating</p>
        </div>

        {/* Pending Follow-ups Card */}
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-orange-100 text-sm mb-1">Pending Follow-ups</p>
              <h2 className="text-4xl font-bold">42</h2>
            </div>
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6" />
            </div>
          </div>
          <p className="text-sm text-orange-100">Requires attention</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 lg:mb-8">
        {/* Call Trends Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">
            Call Trends (Last 7 Days)
          </h3>
          <div className="h-64 lg:h-80">
            <div className="flex items-end justify-between h-full space-x-2 lg:space-x-4">
              {callTrendsData.map((data, index) => (
                <div
                  key={index}
                  className="flex-1 flex flex-col items-center space-y-2"
                >
                  <div className="w-full flex space-x-1 items-end h-48 lg:h-64">
                    <div
                      className="flex-1 bg-blue-500 rounded-t-lg transition-all hover:bg-blue-600"
                      style={{ height: `${(data.calls / 80) * 100}%` }}
                    ></div>
                    <div
                      className="flex-1 bg-green-500 rounded-t-lg transition-all hover:bg-green-600"
                      style={{ height: `${(data.completed / 80) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs lg:text-sm text-gray-600 font-medium">
                    {data.day}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call Status Distribution */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">
            Call Status Distribution
          </h3>
          <div className="flex items-center justify-center h-48 lg:h-64">
            <svg className="w-40 h-40 lg:w-48 lg:h-48" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="35"
                fill="transparent"
                stroke="#10B981"
                strokeWidth="20"
                strokeDasharray="143 220"
                strokeDashoffset="0"
              />
              <circle
                cx="50"
                cy="50"
                r="35"
                fill="transparent"
                stroke="#F59E0B"
                strokeWidth="20"
                strokeDasharray="44 220"
                strokeDashoffset="-143"
              />
              <circle
                cx="50"
                cy="50"
                r="35"
                fill="transparent"
                stroke="#EF4444"
                strokeWidth="20"
                strokeDasharray="33 220"
                strokeDashoffset="-187"
              />
            </svg>
          </div>
          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Completed</span>
              </div>
              <span className="text-sm font-semibold text-gray-800">65%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Follow-up</span>
              </div>
              <span className="text-sm font-semibold text-gray-800">20%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Missed</span>
              </div>
              <span className="text-sm font-semibold text-gray-800">15%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performers */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <h3 className="text-lg font-semibold text-gray-800">
                Top Performers
              </h3>
            </div>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {topPerformers.map((performer, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {performer.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm lg:text-base">
                      {performer.name}
                    </p>
                    <p className="text-xs lg:text-sm text-gray-500">
                      {performer.calls} calls made
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-base lg:text-lg font-bold text-green-600">
                    {performer.conversion}
                  </p>
                  <p className="text-xs text-gray-500">Conversion</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">
            Recent Activities
          </h3>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 pb-4 border-b border-gray-100 last:border-0"
              >
                <div
                  className={`w-2 h-2 mt-2 rounded-full ${
                    activity.type === 'customer'
                      ? 'bg-green-500'
                      : activity.type === 'call'
                      ? 'bg-blue-500'
                      : activity.type === 'followup'
                      ? 'bg-yellow-500'
                      : 'bg-purple-500'
                  }`}
                ></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-800">{activity.text}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
