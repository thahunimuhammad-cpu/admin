'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { verifyAdminPin } from '@/lib/supabase/queries';
import toast, { Toaster } from 'react-hot-toast';
import { Lock, Shield, Key } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (pin.length < 4) {
        toast.error('PIN must be at least 4 digits');
        setLoading(false);
        return;
      }

      const result = await verifyAdminPin(pin);
      
      if (result.success) {
        // Store PIN in sessionStorage for security
        sessionStorage.setItem('adminPin', pin);
        sessionStorage.setItem('adminLoginTime', Date.now().toString());
        toast.success('Login successful! Redirecting...');
        setTimeout(() => {
          router.push('/admin/dashboard');
        }, 500);
      } else {
        toast.error(result.error || 'Invalid PIN');
      }
    } catch (err) {
      toast.error('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
      setPin('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      <Toaster position="top-right" />
      
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      </div>

      <div className="w-full max-w-md px-4 relative z-10">
        {/* Card */}
        <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-blue-200 p-10">
          {/* Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-600 rounded-full blur-lg opacity-75 animate-pulse" />
              <div className="relative p-4 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-center mb-3 bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
            Admin Panel
          </h1>
          <p className="text-center text-gray-600 mb-10 font-medium">
            Secure access with PIN authentication
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                <Key className="w-4 h-4 text-blue-600" />
                PIN Code
              </label>
              <input
                type="password"
                maxLength="6"
                placeholder="••••"
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition text-center text-4xl tracking-widest font-bold text-gray-800"
                disabled={loading}
                required
              />
              <p className="text-xs text-gray-500 mt-2 text-center">
                Enter your 4-digit PIN (numbers only)
              </p>
            </div>

            <button
              type="submit"
              disabled={loading || pin.length < 4}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-4 px-6 rounded-xl hover:from-blue-700 hover:to-blue-800 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-lg"
            >
              <Lock className="w-5 h-5" />
              {loading ? 'Verifying...' : 'Login to Admin'}
            </button>
          </form>

          {/* Features */}
          <div className="mt-8 pt-8 border-t border-gray-200 space-y-3">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>Secure PIN-based authentication</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>Auto logout after 24 hours</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>Full product management access</span>
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-gray-500 text-xs mt-8 font-medium">
            🔒 Unauthorized access is strictly prohibited
          </p>
        </div>
      </div>
    </div>
  );
}
