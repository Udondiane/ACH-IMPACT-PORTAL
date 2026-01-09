'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavigationProps {
  userType: 'staff' | 'partner';
  userName?: string;
  orgName?: string;
}

export function Navigation({ userType, userName, orgName }: NavigationProps) {
  const pathname = usePathname();
  const staffNav = [
    { label: 'Dashboard', href: '/staff/dashboard' },
    { label: 'Candidates', href: '/staff/candidates' },
    { label: 'Partners', href: '/staff/partners' },
  ];
  const partnerNav = [
    { label: 'Dashboard', href: '/partner/dashboard' },
    { label: 'Training', href: '/partner/training' },
    { label: 'Baseline', href: '/partner/baseline' },
    { label: 'Milestones', href: '/partner/milestones' },
  ];
  const navItems = userType === 'staff' ? staffNav : partnerNav;

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen p-4">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold">ACH</span>
        </div>
        <div>
          <p className="font-semibold text-gray-900 text-sm">{userName || 'User'}</p>
          <p className="text-xs text-gray-500">{orgName || 'Organisation'}</p>
        </div>
      </div>
      <nav className="space-y-1">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className={`block px-3 py-2 rounded-lg text-sm font-medium ${pathname === item.href ? 'bg-teal-50 text-teal-700' : 'text-gray-600 hover:bg-gray-50'}`}>{item.label}</Link>
        ))}
      </nav>
      <div className="absolute bottom-4">
        <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">Sign Out</Link>
      </div>
    </aside>
  );
}
