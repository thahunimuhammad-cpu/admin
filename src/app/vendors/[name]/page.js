'use client';

import { useState, useEffect } from 'react';
import { use } from 'react';
import Link from 'next/link';
import { getProducts } from '@/lib/supabase/queries';
import ProductCard from '@/components/ProductCard';
import { ArrowLeft } from 'lucide-react';

const vendorIcons = {
  'TECH SHOP': '⚡',
  'AUDIO PRO': '🎵',
  'GAMING HUB': '🎮',
  'SMART HOME': '⚡'
};

export default function VendorPage({ params }) {
  const { name } = use(params);
  const vendorName = decodeURIComponent(name);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const vendors = [
    { id: 1, name: "TECH SHOP", description: "Premium tech electronics" },
    { id: 2, name: "AUDIO PRO", description: "Audio & Sound Devices" },
    { id: 3, name: "GAMING HUB", description: "Gaming & Streaming Gear" },
    { id: 4, name: "SMART HOME", description: "Smart Gadgets & Accessories" },
  ];

  const vendor = vendors.find((v) => v.name === vendorName);

  useEffect(() => {
    const loadProducts = async () => {
      const result = await getProducts();
      if (result.success) {
        setProducts(result.data || []);
      }
      setLoading(false);
    };
    loadProducts();
  }, []);

  if (!vendor) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-20">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Vendor not found</h1>
          <Link href="/vendors" className="text-blue-600 hover:text-blue-700">
            Back to Vendors
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Vendor Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <Link href="/vendors" className="inline-flex items-center gap-2 text-blue-100 hover:text-white mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to All Vendors
          </Link>
          <div className="flex items-center gap-4">
            <div className="text-5xl">{vendorIcons[vendor.name] || '🏪'}</div>
            <div>
              <h1 className="text-4xl font-bold">{vendor.name}</h1>
              <p className="text-blue-100 mt-2">{vendor.description}</p>
              <p className="text-blue-100 text-sm mt-2">
                {products.length} product{products.length !== 1 ? 's' : ''} available
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="container mx-auto px-4 py-12">
        {products.length > 0 ? (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">{vendor.name} Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">No products available from this vendor.</p>
          </div>
        )}
      </section>
    </div>
  );
}
