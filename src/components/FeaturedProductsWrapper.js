'use client';

import ProductCard from '@/components/ProductCard';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function FeaturedProductsWrapper({ products }) {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }

    // Save to localStorage
    const fullCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingInStorage = fullCart.find(item => item.id === product.id);
    
    if (existingInStorage) {
      existingInStorage.quantity = (existingInStorage.quantity || 1) + 1;
    } else {
      fullCart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(fullCart));
    window.dispatchEvent(new Event('storage'));
    
    // Show toast notification
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </>
  );
}
