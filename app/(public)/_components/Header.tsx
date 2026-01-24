"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const [showMenu, setShowMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMenu = () => setShowMenu(prev => !prev);
  const toggleMobileMenu = () => setMobileMenuOpen(prev => !prev);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    const handleClickOutside = (e: MouseEvent) => {
      if (
        mobileMenuOpen &&
        e.target &&
        !(e.target as HTMLElement).closest('.mobile-menu-toggle') &&
        !(e.target as HTMLElement).closest('.mobile-nav')
      ) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [mobileMenuOpen]);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const active = (path: string) => {
    if (!isClient) return ''; // Return empty class during SSR
    return pathname === path
      ? 'text-green-500 font-semibold border-b-2 border-green-500 pb-[2px]'
      : '';
  };

  return (
    <header className="bg-white text-[#64bf69] py-4 relative shadow-md font-montserrat">
      <div className="w-full flex items-center justify-between relative pl-6 pr-6 font-montserrat">

        {/* Logo */}
        <h1 className="text-2xl font-bold flex items-center font-montserrat">
          <span className="text-gray-500">nurser</span>
          <span className="text-[#67e36e]">E</span>
        </h1>

        {/* Desktop Nav */}
        <nav className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-montserrat">
          <ul className="flex gap-14 px-4 items-center">
            <li><Link href="/" className={`nav-link text-black hover:text-[#62cf66] font-montserrat ${active('/')}`}>Home</Link></li>
            <li><Link href="/categories" className={`nav-link text-black hover:text-[#62cf66] font-montserrat ${active('/categories')}`}>Categories</Link></li>
            {user && (
              <li>
                <Link href="/cart" className={`nav-link text-black hover:text-[#62cf66] font-montserrat ${active('/cart')}`}>
                  Cart
                </Link>
              </li>
            )}
            <li><a href="#about" className="nav-link text-black hover:text-[#62cf66] font-montserrat">About</a></li>
            <li><a href="#contact" className="nav-link text-black hover:text-[#62cf66] font-montserrat">Contact</a></li>
          </ul>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3 font-montserrat">

          {/* Profile/Signin Button */}
          <div className="relative">
            {user ? (
              <span className="cursor-pointer text-green-500 hover:text-[#62cf66] w-22 h-11 flex items-center justify-center transition-colors"
                onClick={toggleMenu}
              >
                <svg 
                  className="w-8 h-8" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </span>
            ) : (
              <Link 
                href="/login" 
                className="px-4 py-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors duration-300 font-semibold text-lg"
              >
                Sign In
              </Link>
            )}

            {showMenu && user && (
              <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6 relative">
                  {/* Close Button */}
                  <button
                    onClick={() => setShowMenu(false)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>

                  {/* Profile Header */}
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center overflow-hidden">
                      <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">{user.fullName || user.email}</h2>
                      <p className="text-sm text-gray-500">Profile Details</p>
                    </div>
                  </div>

                  {/* Profile Details */}
                  <div className="space-y-4 mb-6">
                    <div className="border-b pb-3">
                      <label className="text-sm font-medium text-gray-500">Full Name</label>
                      <p className="text-gray-900">{user.fullName || 'Not provided'}</p>
                    </div>
                    <div className="border-b pb-3">
                      <label className="text-sm font-medium text-gray-500">Email</label>
                      <p className="text-gray-900">{user.email}</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <button
                      onClick={() => { logout(); router.push('/'); setShowMenu(false); }}
                      className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
                    >
                      Logout
                    </button>
                    <button
                      onClick={() => setShowMenu(false)}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-toggle flex md:hidden items-center justify-center min-w-11 min-h-11 text-green-500 hover:text-[#62cf66] z-1002"
          onClick={toggleMobileMenu}
        >
          <span className="material-icons text-[1.8rem]">
            {isClient && mobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Nav */}
      <nav
        className={`mobile-nav fixed top-0 left-0 h-screen w-[80%] max-w-75 bg-white shadow-lg transition-all duration-300 z-1001 overflow-y-auto ${
          isClient && mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <ul className="pt-20 px-4">
          <li><Link href="/" onClick={() => setMobileMenuOpen(false)} className={`nav-link block p-4 rounded ${active('/')}`}>Home</Link></li>
          <li><Link href="/categories" onClick={() => setMobileMenuOpen(false)} className={`nav-link block p-4 rounded ${active('/categories')}`}>Categories</Link></li>
          <li><a href="#about" onClick={() => setMobileMenuOpen(false)} className="nav-link block p-4">About</a></li>
          <li><a href="#contact" onClick={() => setMobileMenuOpen(false)} className="nav-link block p-4">Contact</a></li>

          {user && (
            <li>
              <Link href="/cart" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 p-4">
                <span className="material-icons text-lg">shopping_cart</span>
                Cart
              </Link>
            </li>
          )}

          <li>
            {user ? (
              <span
                onClick={() => { logout(); router.push('/'); setMobileMenuOpen(false); }}
                className="block p-4 cursor-pointer"
              >
                Logout
              </span>
            ) : (
              <Link 
                href="/login" 
                onClick={() => setMobileMenuOpen(false)} 
                className="block px-4 py-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors duration-300 font-semibold text-lg text-center mx-auto w-fit"
              >
                Sign In
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}