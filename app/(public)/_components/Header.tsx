"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';


const useAuth = () => ({
  user: null, // Mock user state
  cart: [], // Mock cart state
  logout: () => {} // Mock logout function
});

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, cart, logout } = useAuth();

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
          <ul className="flex gap-14 px-4">
            <li><Link href="/" className={`nav-link text-black hover:text-[#62cf66] font-montserrat ${active('/')}`}>Home</Link></li>
            <li><Link href="/categories" className={`nav-link text-black hover:text-[#62cf66] font-montserrat ${active('/categories')}`}>Categories</Link></li>
            <li><a href="#about" className="nav-link text-black hover:text-[#62cf66] font-montserrat">About</a></li>
            <li><a href="#contact" className="nav-link text-black hover:text-[#62cf66] font-montserrat">Contact</a></li>
          </ul>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4 font-montserrat">

          {user && (
            <Link href="/cart" className="relative flex items-center justify-center min-w-11 min-h-11 text-green-500 hover:text-[#62cf66]">
              <span className="material-icons">shopping_cart</span>
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-600 text-white text-[0.7rem] px-1.5 py-0.5 rounded-full min-w-5 text-center">
                  {cart.length}
                </span>
              )}
            </Link>
          )}

          {/* Profile/Signin Button */}
          <div className="relative">
            {user ? (
              <span className="material-icons text-[1.8rem] cursor-pointer text-green-500 hover:text-[#62cf66] min-w-11 min-h-11 flex items-center justify-center"
                onClick={toggleMenu}
              >
                account_circle
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
              <div
                onMouseLeave={() => setShowMenu(false)}
                className="absolute right-0 top-[120%] bg-white border border-gray-300 rounded shadow-md z-1000"
              >
                <span
                  onClick={() => { logout(); router.push('/'); }}
                  className="block px-4 py-2 min-h-11 leading-8.25 cursor-pointer hover:bg-gray-100 hover:text-[#62cf66]"
                >
                  Logout
                </span>
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
                Cart {cart.length > 0 && `(${cart.length})`}
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