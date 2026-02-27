'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import { Trash2, ShoppingBag, Plus, Minus } from 'lucide-react';

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(storedCart);
  }, []);

  const handleRemoveFromCart = (productId, productName) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('storage'));
    toast.success(`${productName} removed from cart`);
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) {
      const item = cart.find(i => i.id === productId);
      handleRemoveFromCart(productId, item.name);
      return;
    }
    const updatedCart = cart.map(item =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('storage'));
  };

  const total = cart.reduce((sum, item) => sum + parseFloat(item.price) * (item.quantity || 1), 0);
  const tax = total * 0.08;
  const finalTotal = total + tax;

  if (!mounted) return null;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Toaster position="top-right" />
        <div className="container mx-auto px-4 py-20">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
          <div className="text-center py-20">
            <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <p className="text-gray-600 text-lg mb-8">Your cart is empty</p>
            <Link href="/products" className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Toaster position="top-right" />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="bg-white border-2 border-gray-200 rounded-xl p-6 flex gap-6 hover:border-blue-300 transition">
                  {/* Product Image */}
                  <div className="w-28 h-28 bg-gray-100 rounded-lg flex-shrink-0 border border-gray-300 overflow-hidden">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <ShoppingBag className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <Link href={`/product/${item.id}`} className="text-xl font-bold text-gray-900 hover:text-blue-600 transition block mb-2">
                      {item.name}
                    </Link>
                    <p className="text-gray-600 text-sm mb-4"><span className="font-semibold text-blue-600">${parseFloat(item.price).toFixed(2)}</span></p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 bg-gray-100 w-fit rounded-lg p-2 border border-gray-300">
                      <button
                        onClick={() => handleQuantityChange(item.id, (item.quantity || 1) - 1)}
                        className="p-1 hover:bg-gray-200 rounded transition"
                      >
                        <Minus className="w-4 h-4 text-gray-700" />
                      </button>
                      <span className="px-4 font-bold text-gray-900 min-w-[3rem] text-center">{item.quantity || 1}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id, (item.quantity || 1) + 1)}
                        className="p-1 hover:bg-gray-200 rounded transition"
                      >
                        <Plus className="w-4 h-4 text-gray-700" />
                      </button>
                    </div>
                  </div>

                  {/* Price & Remove */}
                  <div className="text-right flex flex-col justify-between">
                    <div>
                      <p className="text-2xl font-bold text-blue-600">
                        ${(parseFloat(item.price) * (item.quantity || 1)).toFixed(2)}
                      </p>
                    </div>
                    <button
                      onClick={() => handleRemoveFromCart(item.id, item.name)}
                      className="bg-red-50 hover:bg-red-100 border border-red-300 text-red-600 px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition font-semibold"
                    >
                      <Trash2 className="w-4 h-4" />
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white border-2 border-gray-200 rounded-xl p-8 h-fit sticky top-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

            <div className="space-y-4 border-b-2 border-gray-200 pb-6 mb-6">
              <div className="flex justify-between text-gray-600">
                <span className="font-medium">Subtotal ({cart.length} items)</span>
                <span className="font-semibold text-gray-900">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span className="font-medium">Shipping</span>
                <span className="font-semibold text-green-600">Free</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span className="font-medium">Tax (8%)</span>
                <span className="font-semibold text-gray-900">${tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-8 bg-blue-50 p-4 rounded-lg border border-blue-200">
              <span className="text-lg font-bold text-gray-900">Total</span>
              <span className="text-3xl font-bold text-blue-600">${finalTotal.toFixed(2)}</span>
            </div>

            <Link href="/checkout" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold text-center block mb-4">
              Proceed to Checkout
            </Link>

            <Link href="/products" className="w-full bg-gray-100 border-2 border-gray-300 text-gray-900 py-3 rounded-lg hover:bg-gray-200 transition font-semibold text-center block">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
