'use client';

import { Navigation } from '@/components/ui/Navigation';

export default function StaffLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Navigation 
        userType="staff"
        userName="ACH Staff"
        orgName="ACH"
      />
      <main className="flex-1 p-8 bg-gray-50">
        {children}
      </main>
    </div>
  );
}
