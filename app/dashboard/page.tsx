'use client';

import { useEffect, useState } from 'react';
import Header from "../(public)/_components/Header";
import Body from "../(public)/_components/body";
import Footer from "../(public)/_components/footer";

export default function Dashboard() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    // Hide welcome message after 3 seconds
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
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