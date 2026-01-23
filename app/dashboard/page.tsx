'use client';

import { useEffect, useState } from 'react';
import { useAuth } from "@/context/AuthContext";
import Header from "../(public)/_components/Header";
import Body from "../(public)/_components/body";
import Footer from "../(public)/_components/footer";

export default function Dashboard() {
  const [showWelcome, setShowWelcome] = useState(true);
  const { loading, isAuthenticated } = useAuth();

  useEffect(() => {
    // Hide welcome message after 3 seconds
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="mb-4">Please log in to access the dashboard.</p>
          <a href="/login" className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {showWelcome && (
          <div className="mt-8 mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg text-center">
            Login successful! Welcome back.
          </div>
        )}
        
        <Body />
      </main>
      <Footer />
    </>
  );
}