"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { getProducts } from "@/lib/supabase/queries";

// Hardcoded vendors list (since we're not tracking vendor in Supabase schema yet)
const vendors = [
  { id: 1, name: "TECH SHOP", description: "Premium tech electronics", icon: "🏪" },
  { id: 2, name: "AUDIO PRO", description: "Audio & Sound Devices", icon: "🎵" },
  { id: 3, name: "GAMING HUB", description: "Gaming & Streaming Gear", icon: "🎮" },
  { id: 4, name: "SMART HOME", description: "Smart Gadgets & Accessories", icon: "⚡" },
];

export default function VendorsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">Loading vendors...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900">Our Vendors</h1>
          <p className="text-gray-600 mt-2">Shop from trusted brands and sellers</p>
        </div>
      </header>

      {/* Vendors Grid */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {vendors.map((vendor) => {
            const vendorProducts = products.length; // Show total products count
            return (
              <div key={vendor.id} className="bg-white rounded-lg shadow hover:shadow-lg transition p-6">
                <div className="text-4xl mb-4">{vendor.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{vendor.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{vendor.description}</p>
                <p className="text-gray-500 text-xs mb-4">
                  {vendorProducts} product{vendorProducts !== 1 ? "s" : ""} available
                </p>
                <Link
                  href={`/vendors/${encodeURIComponent(vendor.name)}`}
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium"
                >
                  View Shop
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
