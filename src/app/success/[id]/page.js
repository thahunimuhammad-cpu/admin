'use client';

import { use } from 'react';
import Link from 'next/link';
import { CheckCircle, ArrowRight } from 'lucide-react';

export default function SuccessPage({ params }) {
  const { id: orderId } = use(params);

  return (
    <div className="container mx-auto px-4 py-20 min-h-screen flex items-center">
      <div className="w-full max-w-md mx-auto text-center">
        {/* Success Icon */}
        <div className="mb-8 flex justify-center">
          <CheckCircle className="w-24 h-24 text-green-600" />
        </div>

        {/* Success Message */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Order Placed!</h1>
        <p className="text-gray-600 text-lg mb-2">
          Thank you for your purchase.
        </p>
        <p className="text-gray-600 text-sm mb-8">
          Order ID: <span className="font-mono font-bold text-blue-600">{orderId}</span>
        </p>

        {/* Details */}
        <div className="bg-blue-50 rounded-lg p-6 mb-8 text-left">
          <h2 className="font-bold text-gray-900 mb-4">What's Next?</h2>
          <ul className="space-y-3 text-gray-600 text-sm">
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold">1</span>
              <span>Check your email for order confirmation and tracking details</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold">2</span>
              <span>Your order will be shipped within 1-2 business days</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold">3</span>
              <span>You'll receive tracking information via email</span>
            </li>
          </ul>
        </div>

        {/* Actions */}
        <Link href="/products" className="btn btn-primary w-full py-3 text-lg inline-flex items-center justify-center gap-2 mb-4">
          Continue Shopping <ArrowRight className="w-4 h-4" />
        </Link>

        <Link href="/" className="btn btn-secondary w-full py-3 text-lg">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
