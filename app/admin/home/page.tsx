"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminHomePage() {
  const router = useRouter();

  // Mock data - replace with actual data from your API
  const stats = [
    { label: "Total Plants", value: "142", change: "+12%", changeType: "positive" },
    { label: "Orders Today", value: "24", change: "+8%", changeType: "positive" },
    { label: "Pending Reviews", value: "5", change: "0%", changeType: "neutral" },
    { label: "Revenue (NPR)", value: "1,24,500", change: "+15%", changeType: "positive" },
  ];

  const recentActivities = [
    { id: 1, action: "Added new plant", plant: "Monstera Deliciosa", time: "2 min ago" },
    { id: 2, action: "Updated stock", plant: "Snake Plant", time: "1 hour ago" },
    { id: 3, action: "New order", plant: "Fiddle Leaf Fig", time: "3 hours ago" },
    { id: 4, action: "User registered", user: "john.doe@example.com", time: "5 hours ago" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            <span className="text-green-600">nurser</span>E Admin
          </h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <span className="h-6 w-6 text-gray-500">🔔</span>
            </button>
            <div className="h-8 w-px bg-gray-200" />
            <div className="flex items-center">
              <span className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-medium">
                A
              </span>
              <span className="ml-2 text-sm font-medium text-gray-700">Admin</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-500 truncate">{stat.label}</p>
                    <div className="mt-1 flex items-baseline">
                      <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                      <p
                        className={`ml-2 text-sm font-medium ${
                          stat.changeType === 'positive' ? 'text-green-600' : 
                          stat.changeType === 'negative' ? 'text-red-600' : 'text-gray-500'
                        }`}
                      >
                        {stat.change}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activities */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Activities</h3>
              </div>
              <div className="bg-white overflow-hidden">
                <ul className="divide-y divide-gray-200">
                  {recentActivities.map((activity) => (
                    <li key={activity.id} className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                          <span className="text-green-600">📝</span>
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-900">
                            {activity.action}
                            {activity.plant && `: ${activity.plant}`}
                            {activity.user && `: ${activity.user}`}
                          </p>
                          <p className="text-sm text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Quick Actions</h3>
              </div>
              <div className="p-6 space-y-4">
                <Link
                  href="/admin/addPlants"
                  className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                >
                  Add New Plant
                </Link>
                <button
                  type="button"
                  className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  View All Orders
                </button>
                <button
                  type="button"
                  className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Manage Inventory
                </button>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Orders</h3>
              </div>
              <div className="p-6">
                <div className="flow-root">
                  <ul className="-mb-8">
                    {[1, 2, 3].map((order) => (
                      <li key={order}>
                        <div className="relative pb-8">
                          {order < 3 && (
                            <span
                              className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                              aria-hidden="true"
                            />
                          )}
                          <div className="relative flex space-x-3">
                            <div>
                              <span className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center ring-8 ring-white">
                                <span className="text-white text-sm">🚚</span>
                              </span>
                            </div>
                            <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                              <div>
                                <p className="text-sm text-gray-500">
                                  Order #{1000 + order} • <span className="font-medium text-gray-900">NPR {order * 2500}</span>
                                </p>
                              </div>
                              <div className="text-right text-sm whitespace-nowrap text-gray-500">
                                {order === 1 ? "2h ago" : order === 2 ? "1d ago" : "3d ago"}
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6">
                  <Link
                    href="/admin/orders"
                    className="text-sm font-medium text-green-600 hover:text-green-500"
                  >
                    View all orders
                    <span aria-hidden="true"> &rarr;</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200 lg:hidden">
        <div className="max-w-3xl mx-auto px-2">
          <div className="flex justify-between">
            <Link
              href="/admin/home"
              className="w-full flex flex-col items-center justify-center px-2 py-3 text-sm font-medium text-gray-500 hover:text-gray-700"
            >
              <span className="text-xl">🏠</span>
              <span className="mt-1">Home</span>
            </Link>
            <Link
              href="/admin/addPlants"
              className="w-full flex flex-col items-center justify-center px-2 py-3 text-sm font-medium text-green-600 border-t-2 border-green-500"
            >
              <span className="text-xl">➕</span>
              <span className="mt-1">Add Plants</span>
            </Link>
            <Link
              href="/admin/orders"
              className="w-full flex flex-col items-center justify-center px-2 py-3 text-sm font-medium text-gray-500 hover:text-gray-700"
            >
              <span className="text-xl">📦</span>
              <span className="mt-1">Orders</span>
            </Link>
            <Link
              href="/admin/settings"
              className="w-full flex flex-col items-center justify-center px-2 py-3 text-sm font-medium text-gray-500 hover:text-gray-700"
            >
              <span className="text-xl">⚙️</span>
              <span className="mt-1">Settings</span>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}