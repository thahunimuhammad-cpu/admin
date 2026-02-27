'use client';

import { useState, useEffect } from 'react';
import { use } from 'react';
import ProductCard from '@/components/ProductCard';
import { getProducts } from '@/lib/supabase/queries';
import toast, { Toaster } from 'react-hot-toast';
import { Search, Plus } from 'lucide-react';
import Link from 'next/link';

export default function ProductsPage({ searchParams }) {
  const resolvedSearchParams = use(searchParams);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const search = resolvedSearchParams.search || '';

  useEffect(() => {
    const loadProducts = async () => {
      const result = await getProducts();
      if (result.success) {
        setProducts(result.data);
      }
      setLoading(false);
    };
    loadProducts();

    // Check if admin is logged in
    const adminPin = sessionStorage.getItem('adminPin');
    const adminLoginTime = sessionStorage.getItem('adminLoginTime');
    if (adminPin && adminLoginTime) {
      const loginTime = parseInt(adminLoginTime);
      const now = Date.now();
      if (now - loginTime < 24 * 60 * 60 * 1000) {
        setIsAdmin(true);
      } else {
        sessionStorage.removeItem('adminPin');
        sessionStorage.removeItem('adminLoginTime');
      }
    }
  }, []);

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes((search || searchTerm).toLowerCase())
  );

  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('storage'));
    
    // Show toast notification
    toast.success(`${product.name} added to cart!`);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <Toaster position="top-right" />
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-gray-900">All Products</h1>
        <Link href="/admin/products/add" className="btn btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Product
        </Link>
      </div>

      {/* Search Bar */}
      <div className="mb-8 flex gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10 w-full"
          />
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-600 text-lg">No products found</p>
        </div>
      )}
    </div>
  );
}
