'use client';

import Link from 'next/link';
import { ShoppingCart, Home, Settings, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Header() {
  const [cartCount, setCartCount] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setMounted(true);
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartCount(cart.length);

    // Check if admin is logged in
    const adminPin = sessionStorage.getItem('adminPin');
    const adminLoginTime = sessionStorage.getItem('adminLoginTime');
    if (adminPin && adminLoginTime) {
      // Check if login is still valid (e.g., within 24 hours)
      const loginTime = parseInt(adminLoginTime);
      const now = Date.now();
      if (now - loginTime < 24 * 60 * 60 * 1000) { // 24 hours
        setIsAdmin(true);
      } else {
        // Clear expired session
        sessionStorage.removeItem('adminPin');
        sessionStorage.removeItem('adminLoginTime');
      }
    }

    const handleStorageChange = () => {
      const updatedCart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartCount(updatedCart.length);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  if (!mounted) return null;

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-blue-600">
            <ShoppingCart className="w-6 h-6" />
           RM Orgnization
          </Link>

          <div className="hidden md:flex gap-6">
            <Link href="/" className="flex items-center gap-1 hover:text-blue-600 transition">
              <Home className="w-4 h-4" />
              Home
            </Link>
            <Link href="/products" className="hover:text-blue-600 transition">
              Products
            </Link>
            
            <Link href="/cart" className="flex items-center gap-1 hover:text-blue-600 transition">
              <ShoppingCart className="w-4 h-4" />
              Cart ({cartCount})
            </Link>
          </div>

          <Link href="/cart" className="md:hidden flex items-center gap-1 hover:text-blue-600">
            <ShoppingCart className="w-5 h-5" />
            <span className="text-sm">({cartCount})</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
