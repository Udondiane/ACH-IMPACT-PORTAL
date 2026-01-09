'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [userType, setUserType] = useState<'staff' | 'partner'>('partner');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(userType === 'staff' ? '/staff/dashboard' : '/partner/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-teal-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">ACH</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">I am a...</label>
            <div className="grid grid-cols-2 gap-2">
              <button type="button" onClick={() => setUserType('partner')} className={`py-2 px-3 rounded-lg text-sm font-medium ${userType === 'partner' ? 'bg-teal-600 text-white' : 'bg-gray-100'}`}>Partner</button>
              <button type="button" onClick={() => setUserType('staff')} className={`py-2 px-3 rounded-lg text-sm font-medium ${userType === 'staff' ? 'bg-teal-600 text-white' : 'bg-gray-100'}`}>ACH Staff</button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input type="email" className="input-field" placeholder="you@example.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input type="password" className="input-field" placeholder="Enter password" />
          </div>
          <button type="submit" className="btn-primary w-full py-3">Sign In</button>
        </form>
        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">Back to home</Link>
        </div>
      </div>
    </div>
  );
}
