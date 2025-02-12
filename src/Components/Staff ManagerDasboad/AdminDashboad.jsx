import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

// Existing Data
const monthlyData = [
  { month: 'Jan', value: 3 },
  { month: 'Feb', value: 4.8 },
  { month: 'Mar', value: 3.2 },
  { month: 'Apr', value: 6.2 },
  { month: 'May', value: 4 },
  { month: 'Jun', value: 2.8 },
  { month: 'Jul', value: 4.5 }
];

const yearlyData = [
  { month: 'Jan', value: 60 },
  { month: 'Feb', value: 55 },
  { month: 'Mar', value: 78 },
  { month: 'Apr', value: 80 },
  { month: 'May', value: 55 },
  { month: 'Jun', value: 52 },
  { month: 'Jul', value: 40 },
  { month: 'Aug', value: 75 },
  { month: 'Sep', value: 20 },
  { month: 'Oct', value: 30 },
  { month: 'Nov', value: 45 },
  { month: 'Dec', value: 85 }
];

const deals = [
  { company: 'Proven', value: '$95k' },
  { company: 'BuildCo', value: '$45k' },
  { company: 'Robert Sherman', value: '$22.5k' },
  { company: 'Ross & Sons', value: '$20k' },
  { company: 'Revolution Stars', value: '$15.5k' },
  { company: 'Morningstar', value: '$15.5k' },
  { company: 'Repower & Build', value: '$12k' },
  { company: 'Retrofit', value: '$12k' },
  { company: 'Housing Co', value: '$6k' }
];

// New Data
const dealsByType = [
  { name: 'New Business', value: 45, color: '#fbbf24' },
  { name: 'Renewals', value: 30, color: '#f59e0b' },
  { name: 'Upsells', value: 25, color: '#d97706' }
];

const SalesDashboard = () => {
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    "New deal closed with BuildCo",
    "Monthly target achieved",
    "3 deals pending approval"
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="space-y-6">
        {/* Enhanced Header */}
        <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md">
          <div>
            <h1 className="text-2xl font-bold">Manager Dashboard</h1>
            <p className="text-gray-500 text-sm">Last updated: {new Date().toLocaleString()}</p>
          </div>
          <div className="flex gap-2 relative">
            <button 
              className="p-2 rounded-full bg-yellow-400 hover:bg-yellow-500 relative"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <span className="sr-only">Notifications</span>
              🔔
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </button>
            {showNotifications && (
              <div className="absolute top-12 right-0 w-64 bg-white rounded-lg shadow-lg p-4 z-10">
                {notifications.map((note, index) => (
                  <div key={index} className="py-2 border-b last:border-0">
                    {note}
                  </div>
                ))}
              </div>
            )}
            <button className="p-2 rounded-full bg-yellow-400 hover:bg-yellow-500">
              <span className="sr-only">Settings</span>
              ⚙️
            </button>
            <button className="p-2 rounded-full bg-yellow-400 hover:bg-yellow-500">
              <span className="sr-only">Menu</span>
              ☰
            </button>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Monthly Stats Card (Original) */}
          <div className="bg-gradient-to-br h-[100%] from-yellow-400 to-yellow-600 p-6 rounded-lg shadow-md">
            <div className="text-white">
              <p className="text-sm opacity-80">Won (this month)</p>
              <h2 className="text-4xl font-bold mb-4">$243.5K</h2>
              <div className="flex items-center gap-2">
                <span className="text-2xl">9</span>
                <span className="text-sm opacity-80"># of deals</span>
              </div>
            </div>
          </div>

          {/* Enhanced Monthly Trend Chart */}
          <div className="col-span-2 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Monthly Performance</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#0ea5e9" 
                    strokeWidth={2}
                    dot={{ fill: '#0ea5e9', r: 4 }}
                  />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Yearly Stats Card (Original) */}
          <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 p-6 rounded-lg shadow-md">
            <div className="text-white">
              <p className="text-sm opacity-80">Won (this Y)</p>
              <h2 className="text-4xl font-bold mb-4">$4.1M</h2>
              <p className="text-sm opacity-80">$123.5k vs target</p>
            </div>
          </div>

          {/* Enhanced Yearly Bar Chart */}
          <div className="col-span-2 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Yearly Performance</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={yearlyData}>
                  <Bar dataKey="value" fill="#fbbf24" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Enhanced Deals List */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Closed Won</h2>
            <div className="space-y-2">
              {deals.map((deal, index) => (
                <div 
                  key={index} 
                  className="flex justify-between items-center py-2 border-b last:border-0 cursor-pointer hover:bg-gray-50"
                  onClick={() => setSelectedDeal(deal)}
                >
                  <span className="font-medium">{deal.company}</span>
                  <span className="text-gray-600">{deal.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* New Deal Types Distribution */}
          <div className="col-span-2 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Deal Types Distribution</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={dealsByType}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      dataKey="value"
                    >
                      {dealsByType.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                {dealsByType.map((type, index) => (
                  <div key={index} className="flex items-center">
                    <div 
                      className="w-4 h-4 rounded-full mr-2" 
                      style={{ backgroundColor: type.color }}
                    ></div>
                    <span>{type.name}: {type.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Deal Details Modal */}
        {selectedDeal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-96">
              <h3 className="text-xl font-bold mb-4">Deal Details</h3>
              <p><strong>Company:</strong> {selectedDeal.company}</p>
              <p><strong>Value:</strong> {selectedDeal.value}</p>
              <button 
                onClick={() => setSelectedDeal(null)}
                className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesDashboard;