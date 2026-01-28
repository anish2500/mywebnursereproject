"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiPackage, FiUsers, FiBell, FiChevronDown, FiPlus, FiLogOut } from "react-icons/fi";
import { useState, useRef, useEffect } from "react";

const stats = [
  { name: 'Total Orders', value: '2,543', change: '+12%', changeType: 'increase' },
  { name: 'Revenue', value: '$45,231', change: '+8.2%', changeType: 'increase' },
  { name: 'Active Users', value: '1,234', change: '-2.3%', changeType: 'decrease' },
  { name: 'Inventory Items', value: '856', change: '+4.6%', changeType: 'increase' },
];

const recentActivity = [
  { id: 1, user: 'John Doe', action: 'placed a new order', time: '2 min ago', icon: '' },
  { id: 2, user: 'Sarah Smith', action: 'updated product details', time: '10 min ago', icon: '' },
  { id: 3, user: 'Mike Johnson', action: 'processed 5 orders', time: '25 min ago', icon: '' },
  { id: 4, user: 'Emily Davis', action: 'added new inventory', time: '1 hour ago', icon: '' },
];

export default function AdminDashboardPage() {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      // Call your logout API endpoint
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'same-origin',
      });

      if (response.ok) {
        // Clear any client-side auth state
        localStorage.removeItem('authToken');
        // Redirect to login page
        router.push('/admin/login');
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      <div>
        {/* Top Navigation */}
        <header className="bg-white shadow-sm">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
              <div className="flex items-center space-x-6">
                <Link href="/admin/products" className="flex items-center text-gray-600 hover:text-gray-900">
                  <FiPackage className="w-5 h-5 mr-2" />
                  <span>Products</span>
                </Link>
                <Link href="/admin/users" className="flex items-center text-gray-600 hover:text-gray-900">
                  <FiUsers className="w-5 h-5 mr-2" />
                  <span>Users</span>
                </Link>
                <div className="relative">
                  <button className="p-2 text-gray-500 rounded-full hover:bg-gray-100">
                    <FiBell className="w-5 h-5" />
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                  </button>
                </div>
                <div className="relative" ref={dropdownRef}>
                  <div 
                    className="flex items-center space-x-2 cursor-pointer group"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-medium">
                      AD
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-700">Admin User</span>
                      <FiChevronDown className={`w-4 h-4 ml-1 text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </div>
                  </div>
                  
                  {/* Dropdown menu */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <FiLogOut className="w-4 h-4 mr-2" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Overview</h2>
            <Link 
              href="/admin/addPlants"
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <FiPlus className="w-4 h-4 mr-2" />
              Add New
            </Link>
          </div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="p-6 bg-white rounded-xl shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                    <p className="mt-1 text-2xl font-semibold text-gray-900">{stat.value}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${stat.changeType === 'increase' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {stat.change}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
                <button className="text-sm font-medium text-green-600 hover:text-green-500">View All</button>
              </div>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                    <div className="flex items-center justify-center w-10 h-10 mr-3 text-xl bg-gray-100 rounded-full">
                      {activity.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        <span className="font-semibold">{activity.user}</span> {activity.action}
                      </p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 mt-8">
          <div className="container mx-auto px-6 py-4">
            <p className="text-sm text-center text-gray-500">
              2024 Nursere Admin. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}