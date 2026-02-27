'use client';

import Link from 'next/link';
import { ShoppingCart, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export default function ProductCard({ product, onAddToCart, isCartItem = false, onRemove }) {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    if (!onAddToCart) return;
    setIsAdding(true);
    await onAddToCart(product);
    setIsAdding(false);
  };
  
  const handleRemove = async () => {
    if (onRemove) {
      await onRemove(product.id);
    }
  };

  return (
    <div className="h-full flex flex-col bg-white rounded-xl shadow-md hover:shadow-2xl border-2 border-gray-200 hover:border-blue-300 transition-all overflow-hidden hover:-translate-y-1 duration-300">
      {/* Image Container */}
      <div className="relative w-full h-56 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden group">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
            <ShoppingCart className="w-16 h-16 text-gray-400" />
          </div>
        )}
        {/* Badge */}
        {product.originalPrice && (
          <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            Sale
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-base text-gray-900 line-clamp-2 mb-2 h-14 flex items-center">
          {product.name}
        </h3>

        {product.description && (
          <p className="text-gray-500 text-sm line-clamp-2 mb-3 flex-grow">
            {product.description}
          </p>
        )}

        {/* Price Section */}
        <div className="mb-5 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-3 border border-blue-200">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-blue-600">
              ${parseFloat(product.price).toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-gray-400 line-through text-sm font-medium">
                ${parseFloat(product.originalPrice).toFixed(2)}
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-auto">
          {isCartItem ? (
            <>
              <Link
                href={`/product/${product.id}`}
                className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 font-bold py-2 px-3 rounded-lg border-2 border-blue-200 transition text-center text-sm"
              >
                View Details
              </Link>
              <button
                onClick={handleRemove}
                className="bg-red-50 hover:bg-red-100 text-red-600 font-bold py-2 px-3 rounded-lg border-2 border-red-200 transition"
                title="Remove from cart"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleAddToCart}
                disabled={isAdding}
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-2 px-4 rounded-lg border-2 border-blue-400 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                <ShoppingCart className="w-4 h-4" />
                {isAdding ? 'Adding...' : 'Add Cart'}
              </button>
              <Link
                href={`/product/${product.id}`}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-2 px-3 rounded-lg border-2 border-gray-300 transition text-sm"
              >
                View
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
