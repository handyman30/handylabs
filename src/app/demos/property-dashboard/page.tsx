'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Building, 
  TrendingUp, 
  Users, 
  DollarSign,
  Eye,
  Download,
  Activity
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import HandyLabsLogo from "@/components/HandyLabsLogo";

export default function PropertyDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [liveData, setLiveData] = useState({
    totalValue: 47.2,
    occupancyRate: 92.3,
    monthlyRevenue: 385000,
    propertiesManaged: 156
  });

  // Real-time data simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      setLiveData(prev => ({
        totalValue: prev.totalValue + (Math.random() - 0.5) * 0.1,
        occupancyRate: Math.max(85, Math.min(95, prev.occupancyRate + (Math.random() - 0.5) * 0.5)),
        monthlyRevenue: prev.monthlyRevenue + (Math.random() - 0.5) * 2000,
        propertiesManaged: prev.propertiesManaged
      }));
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  // Sample data for charts
  const revenueData = [
    { month: 'Jan', revenue: 320000, occupancy: 88 },
    { month: 'Feb', revenue: 340000, occupancy: 91 },
    { month: 'Mar', revenue: 365000, occupancy: 89 },
    { month: 'Apr', revenue: 385000, occupancy: 93 },
    { month: 'May', revenue: 390000, occupancy: 92 },
    { month: 'Jun', revenue: 385000, occupancy: 92 }
  ];

  const propertyTypeData = [
    { type: 'Residential', value: 45, color: '#8B5CF6' },
    { type: 'Commercial', value: 30, color: '#06B6D4' },
    { type: 'Hospitality', value: 25, color: '#F59E0B' }
  ];

  const regionalData = [
    { region: 'Melbourne CBD', properties: 42, revenue: 180000 },
    { region: 'South Yarra', properties: 28, revenue: 120000 },
    { region: 'Docklands', properties: 35, revenue: 95000 },
    { region: 'Richmond', properties: 25, revenue: 75000 },
    { region: 'St Kilda', properties: 26, revenue: 65000 }
  ];

  const recentBookings = [
    { id: 'BK789012345', property: 'Crown Towers Suite', amount: 850, status: 'confirmed', guest: 'Premium Guest', time: '14:23' },
    { id: 'BK789012346', property: 'Collins St Apartment', amount: 320, status: 'confirmed', guest: 'Business Traveler', time: '14:18' },
    { id: 'BK789012347', property: 'Docklands Penthouse', amount: 1200, status: 'pending', guest: 'VIP Client', time: '14:15' },
    { id: 'BK789012348', property: 'South Yarra Townhouse', amount: 450, status: 'confirmed', guest: 'Family Booking', time: '14:12' },
    { id: 'BK789012349', property: 'Richmond Loft', amount: 280, status: 'confirmed', guest: 'Local Guest', time: '14:08' }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <Link href="/property" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Portfolio
            </Link>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Building className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">PropTech Analytics</h1>
                <div className="flex items-center text-sm text-gray-500">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span>LIVE DEMO</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-500">
              {currentTime.toLocaleTimeString()}
            </div>
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">Total Portfolio Value</h3>
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-gray-900">
                ${liveData.totalValue.toFixed(1)}M
              </div>
              <div className="flex items-center text-sm text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                +12.5%
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">Occupancy Rate</h3>
              <Building className="w-5 h-5 text-blue-600" />
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-gray-900">
                {liveData.occupancyRate.toFixed(1)}%
              </div>
              <div className="flex items-center text-sm text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                +3.2%
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">Monthly Revenue</h3>
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-gray-900">
                {formatCurrency(liveData.monthlyRevenue)}
              </div>
              <div className="flex items-center text-sm text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                +8.7%
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">Properties Managed</h3>
              <Users className="w-5 h-5 text-orange-600" />
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-gray-900">
                {liveData.propertiesManaged}
              </div>
              <div className="flex items-center text-sm text-blue-600">
                <Eye className="w-4 h-4 mr-1" />
                Active
              </div>
            </div>
          </motion.div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Trend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue & Occupancy Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#8B5CF6" 
                  fill="#8B5CF6" 
                  fillOpacity={0.1}
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Property Type Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Portfolio</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={propertyTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="value"
                >
                  {propertyTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Regional Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Regional Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={regionalData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="region" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="revenue" fill="#06B6D4" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Recent Bookings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Bookings</h3>
            <div className="flex items-center text-sm text-green-600">
              <Activity className="w-4 h-4 mr-1" />
              Live Updates
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 text-sm font-medium text-gray-600">Booking ID</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-600">Property</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-600">Guest</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-600">Amount</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-600">Time</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-3 text-sm font-mono text-gray-900">{booking.id}</td>
                    <td className="py-3 text-sm text-gray-900">{booking.property}</td>
                    <td className="py-3 text-sm text-gray-600">{booking.guest}</td>
                    <td className="py-3 text-sm font-semibold text-gray-900">{formatCurrency(booking.amount)}</td>
                    <td className="py-3">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        booking.status === 'confirmed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="py-3 text-sm text-gray-500">{booking.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Building className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Interactive PropTech Demo</h4>
                <p className="text-sm text-gray-600">Real-time property management analytics with live data simulation</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Built with React, TypeScript & Framer Motion</p>
              <div className="flex items-center justify-end mt-1">
                <HandyLabsLogo className="text-gray-500" size="sm" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 