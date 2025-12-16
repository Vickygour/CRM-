import React, { useState } from 'react';
import {
  Phone,
  TrendingUp,
  Users,
  DollarSign,
  Download,
  ChevronDown,
} from 'lucide-react';

const Reports = () => {
  const [timePeriod, setTimePeriod] = useState('This Month');

  // Dummy data for charts
  const monthlyPerformanceData = [
    { month: 'Jul', calls: 1200, conversions: 180 },
    { month: 'Aug', calls: 1350, conversions: 210 },
    { month: 'Sep', calls: 1180, conversions: 195 },
    { month: 'Oct', calls: 1450, conversions: 245 },
    { month: 'Nov', calls: 1580, conversions: 280 },
    { month: 'Dec', calls: 1420, conversions: 260 },
  ];

  const callerPerformanceData = [
    { name: 'Vikram Singh', calls: 245, conversions: 42 },
    { name: 'Anjali Mehta', calls: 220, conversions: 38 },
    { name: 'Rajesh Kumar', calls: 215, conversions: 35 },
    { name: 'Sunita Sharma', calls: 185, conversions: 32 },
    { name: 'Arjun Patel', calls: 165, conversions: 28 },
  ];

  const funnelData = [
    {
      stage: 'Total Leads',
      count: 1847,
      conversion: '77.0%',
      color: 'bg-blue-500',
      width: '100%',
    },
    {
      stage: 'Contacted',
      count: 1423,
      conversion: '60.2%',
      color: 'bg-cyan-500',
      width: '77%',
    },
    {
      stage: 'Interested',
      count: 856,
      conversion: '40.0%',
      color: 'bg-green-500',
      width: '46%',
    },
    {
      stage: 'Converted',
      count: 342,
      conversion: '',
      color: 'bg-yellow-500',
      width: '18%',
    },
  ];

  const handleExportPDF = () => {
    console.log('Exporting PDF...');
    // PDF export logic yahan aayega
  };

  const maxCalls = Math.max(...callerPerformanceData.map((d) => d.calls));
  const maxConversions = Math.max(
    ...callerPerformanceData.map((d) => d.conversions),
  );

  return (
    <div className="p-4 lg:p-8">
      {/* Page Header */}
      <div className="mb-6 lg:mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
              Reports & Analytics
            </h1>
            <p className="text-gray-500 mt-1">
              Comprehensive insights into your CRM performance
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* Time Period Selector */}
            <div className="relative">
              <select
                value={timePeriod}
                onChange={(e) => setTimePeriod(e.target.value)}
                className="pl-4 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none bg-white cursor-pointer font-medium"
              >
                <option>This Week</option>
                <option>This Month</option>
                <option>This Quarter</option>
                <option>This Year</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>

            {/* Export PDF Button */}
            <button
              onClick={handleExportPDF}
              className="flex items-center space-x-2 px-5 py-2.5 border border-gray-300 hover:bg-gray-50 rounded-lg font-medium transition"
            >
              <Download className="w-5 h-5" />
              <span>Export PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
        {/* Total Calls Card */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-blue-100 text-sm mb-1">Total Calls</p>
              <h2 className="text-4xl font-bold">8,080</h2>
            </div>
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <Phone className="w-6 h-6" />
            </div>
          </div>
          <div className="flex items-center text-sm">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>+12.5% vs last month</span>
          </div>
        </div>

        {/* Conversions Card */}
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-green-100 text-sm mb-1">Conversions</p>
              <h2 className="text-4xl font-bold">1,253</h2>
            </div>
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
          <div className="flex items-center text-sm">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>+8.2% vs last month</span>
          </div>
        </div>

        {/* Active Customers Card */}
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-purple-100 text-sm mb-1">Active Customers</p>
              <h2 className="text-4xl font-bold">1,847</h2>
            </div>
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
          </div>
          <div className="flex items-center text-sm">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>+15.3% vs last month</span>
          </div>
        </div>

        {/* Revenue Card */}
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-orange-100 text-sm mb-1">Revenue</p>
              <h2 className="text-4xl font-bold">₹3.13L</h2>
            </div>
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>
          <div className="flex items-center text-sm">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>+5.8% vs last month</span>
          </div>
        </div>
      </div>

      {/* Monthly Performance Trends Chart */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6 lg:mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Monthly Performance Trends
        </h3>

        {/* Area Chart Container */}
        <div className="relative h-96">
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-sm text-gray-500 pr-4">
            <span>1600</span>
            <span>1200</span>
            <span>800</span>
            <span>400</span>
            <span>0</span>
          </div>

          {/* Chart Area */}
          <div className="ml-12 h-full relative">
            <svg className="w-full h-full" preserveAspectRatio="none">
              {/* Background grid lines */}
              <line
                x1="0"
                y1="20%"
                x2="100%"
                y2="20%"
                stroke="#f3f4f6"
                strokeWidth="1"
              />
              <line
                x1="0"
                y1="40%"
                x2="100%"
                y2="40%"
                stroke="#f3f4f6"
                strokeWidth="1"
              />
              <line
                x1="0"
                y1="60%"
                x2="100%"
                y2="60%"
                stroke="#f3f4f6"
                strokeWidth="1"
              />
              <line
                x1="0"
                y1="80%"
                x2="100%"
                y2="80%"
                stroke="#f3f4f6"
                strokeWidth="1"
              />

              {/* Calls Area (Blue) */}
              <defs>
                <linearGradient
                  id="callsGradient"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.05" />
                </linearGradient>
              </defs>
              <path
                d="M 0 25 Q 16.6 22 33.3 18 T 66.6 16 T 100 22 L 100 100 L 0 100 Z"
                fill="url(#callsGradient)"
              />
              <path
                d="M 0 25 Q 16.6 22 33.3 18 T 66.6 16 T 100 22"
                fill="none"
                stroke="#3B82F6"
                strokeWidth="3"
              />

              {/* Conversions Area (Green) */}
              <defs>
                <linearGradient
                  id="conversionsGradient"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0.05" />
                </linearGradient>
              </defs>
              <path
                d="M 0 85 Q 16.6 82 33.3 78 T 66.6 76 T 100 80 L 100 100 L 0 100 Z"
                fill="url(#conversionsGradient)"
              />
              <path
                d="M 0 85 Q 16.6 82 33.3 78 T 66.6 76 T 100 80"
                fill="none"
                stroke="#10B981"
                strokeWidth="3"
              />
            </svg>

            {/* Tooltip - appears on hover */}
            <div className="absolute top-1/3 left-1/4 bg-white rounded-lg shadow-xl p-4 border border-gray-200 hidden hover:block">
              <p className="font-semibold text-gray-900 mb-2">Jul</p>
              <p className="text-blue-600 text-sm">Total Calls : 1200</p>
              <p className="text-green-600 text-sm">Conversions : 180</p>
            </div>

            {/* X-axis labels */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-between text-sm text-gray-500 pt-4">
              {monthlyPerformanceData.map((data, index) => (
                <span key={index}>{data.month}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Two Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Caller Performance Comparison */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Caller Performance Comparison
          </h3>

          <div className="space-y-6">
            {callerPerformanceData.map((caller, index) => (
              <div key={index}>
                <p className="text-sm text-gray-600 mb-2">{caller.name}</p>
                <div className="flex items-center gap-2">
                  {/* Calls Bar (Blue) */}
                  <div className="flex-1 h-8 bg-gray-100 rounded-lg overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-lg transition-all duration-500"
                      style={{ width: `${(caller.calls / maxCalls) * 100}%` }}
                    ></div>
                  </div>
                  {/* Conversions Bar (Green) */}
                  <div className="flex-1 h-8 bg-gray-100 rounded-lg overflow-hidden">
                    <div
                      className="h-full bg-green-500 rounded-lg transition-all duration-500"
                      style={{
                        width: `${
                          (caller.conversions / maxConversions) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Calls</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Conversions</span>
            </div>
          </div>

          {/* X-axis scale */}
          <div className="flex justify-between text-xs text-gray-400 mt-3 px-1">
            <span>0</span>
            <span>65</span>
            <span>130</span>
            <span>195</span>
            <span>260</span>
          </div>
        </div>

        {/* Customer Acquisition Funnel */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Customer Acquisition Funnel
          </h3>

          <div className="space-y-6">
            {funnelData.map((stage, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    {stage.stage}
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    {stage.count.toLocaleString()}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="relative">
                  <div className="h-10 bg-gray-100 rounded-lg overflow-hidden">
                    <div
                      className={`h-full ${stage.color} rounded-lg transition-all duration-700 flex items-center justify-end pr-4`}
                      style={{ width: stage.width }}
                    >
                      {stage.conversion && (
                        <span className="text-xs font-semibold text-white">
                          {stage.conversion} conversion
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Stats */}
          <div className="mt-8 pt-6 border-t border-gray-200 grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Conversion Rate</p>
              <p className="text-2xl font-bold text-gray-900">18.5%</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Avg. Time to Convert</p>
              <p className="text-2xl font-bold text-gray-900">12 days</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
