'use client';
import { Navigation } from '@/components/ui/Navigation';

export default function PartnerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Navigation userType="partner" userName="Partner User" orgName="Your Organisation" />
      <main className="flex-1 p-8 bg-gray-50">{children}</main>
    </div>
  );
}
