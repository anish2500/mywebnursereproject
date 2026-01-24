"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminDashboardPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f9fa] to-white">
      <div className="max-w-5xl mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#1b1b1b] mb-6">
            Welcome to Admin Portal
          </h1>
          <p className="text-lg text-[#616161] mb-10 max-w-2xl mx-auto">
            This is a secure area of the website. Please sign in to access the admin dashboard.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/admin/login" 
              className="px-8 py-3 bg-[#4caf50] text-white rounded-full font-medium hover:bg-[#43a047] transition-colors"
            >
              Go to Login
            </Link>
            <button
              onClick={() => router.back()}
              className="px-8 py-3 border border-[#4caf50] text-[#2e7d32] rounded-full font-medium hover:bg-[#e8f5e9] transition-colors"
            >
              Return Home
            </button>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-3">
            {[
              {
                title: "Inventory",
                description: "Manage your plant inventory and stock levels",
                icon: "🌱"
              },
              {
                title: "Orders",
                description: "View and manage customer orders",
                icon: "📦"
              },
              {
                title: "Analytics",
                description: "View sales and customer insights",
                icon: "📊"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-[#1b1b1b] mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Need help? Contact support at{" "}
              <a 
                href="mailto:support@nursere.com" 
                className="text-[#4caf50] hover:underline"
              >
                support@nursere.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}