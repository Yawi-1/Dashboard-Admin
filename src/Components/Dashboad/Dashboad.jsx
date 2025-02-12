import React, { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExpenses } from '../../Redux/Actions/expenseActions';
import { Bell, Search } from 'lucide-react';
import { GrUserAdmin } from 'react-icons/gr';
import { RiTeamLine } from 'react-icons/ri';
import { SiCoursera } from 'react-icons/si';
import { FaBlog } from 'react-icons/fa6';
import { GrUpdate } from 'react-icons/gr';
import {getAllTeamMembers} from '../../Redux/Actions/TeamAction.js'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const AdminDashboard = () => {
  const dispatch = useDispatch();

  // Select expenses & team members from Redux store
  const { expenses, status: expensesStatus } = useSelector((state) => state.expenses);
  const { teamMembers, status: teamStatus } = useSelector((state) => state.team);

  useEffect(() => {
    if (!expenses?.length) dispatch(fetchExpenses()); 
    if (!teamMembers?.length) dispatch(getAllTeamMembers());
  }, [dispatch, expenses?.length, teamMembers?.length]);
 

  // Predefined months (Jan–Dec)
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  // Transform expense data into a fixed monthly format
  const chartData = useMemo(() => {
    if (!expenses) return [];

    // Initialize month-wise data with 0 amount
    const monthlyExpenses = months.map((month) => ({ month, amount: 0 }));

    // Fill the data where applicable
    expenses.forEach(({ amount, date }) => {
      const monthIndex = new Date(date).getMonth(); // 0-11 index
      monthlyExpenses[monthIndex].amount += amount;
    });

    return monthlyExpenses;
  }, [expenses]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
              <GrUserAdmin className="mr-2" />
              Admin Dashboard
            </h1>
            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
              {/* Notification */}
              <Link to="/Notice-Board" className="p-2 rounded-lg hover:bg-gray-100 relative">
                <Bell className="w-6 h-6 text-gray-600" />
                <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  4
                </span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {[
            { icon: <RiTeamLine className="w-8 h-11 text-gray-200" />, title: 'Team (Profiles)', change: teamMembers?.length , message:"Team members" },
            { icon: <SiCoursera className="w-8 h-11 text-gray-200" />, title: 'Course', change: '5', message : ' Courses Available ' },
            { icon: <FaBlog className="w-8 h-11 text-gray-200" />, title: 'Blog', change: '8'  , message : ' Blog Posts ' },
            { icon: <GrUpdate className="w-6 h-11 text-white" />, title: 'Update Job', change: '3', message:'Available Jobs' },
          ].map((stat, index) => (
            <div key={index} className="rounded-lg shadow p-6 bg-gradient-to-r from-[#edba12] to-yellow-600">
              <div className="flex items-center">
                <div className="p-3 rounded-full">{stat.icon}</div>
                <div className="ml-4">
                  <h2 className="text-lg font-semibold text-white">{stat.title}</h2>
                  <p className="text-sm text-black">{stat.change} {stat.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Expense Chart */}
          <div className="bg-gray-50 rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-black mb-4">Expense Overview</h2>
            {status === 'loading' ? (
              <h1>Loading...</h1>
            ) : (
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="month" stroke="#6B7280" />
                    <YAxis stroke="#6B7280" />
                    <Tooltip />
                    <Line type="monotone" dataKey="amount" stroke="#4F46E5" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          {/* Recent Activity */}
          <div className="bg-gray-100 rounded-lg shadow p-6 overflow-y-auto max-h-96">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h2>
            {status === 'loading' ? (
              <h1>Loading...</h1>
            ) : (
              <div className="space-y-4">
                {expenses?.map((item) => (
                  <div key={item._id} className="flex items-center p-3 hover:bg-gray-50 rounded-lg">
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">{item.description}</p>
                      <p className="text-sm text-gray-500">{new Date(item.date).toLocaleDateString()}</p>
                    </div>
                    <span className="ml-auto text-sm text-gray-500">${item.amount}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
