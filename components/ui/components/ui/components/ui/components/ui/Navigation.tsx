'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  label: string;
  href: string;
}

interface NavigationProps {
  userType: 'staff' | 'partner';
  partnerType?: 'employment' | 'training' | 'both';
  userName?: string;
  orgName?: string;
}

export function Navigation({ userType, partnerType = 'employment', userName, orgName }: NavigationProps) {
  const pathname = usePathname();

  const staffNav: NavItem[] = [
    { label: 'Dashboard', href: '/staff/dashboard' },
    { label: 'Candidates', href: '/staff/candidates' },
    { label: 'Partners', href: '/staff/partners' },
    { label: 'Check-ins', href: '/staff/checkins' },
  ];

  const employmentNav: NavItem[] = [
    { label: 'Dashboard', href: '/partner/dashboard' },
    { label: 'Baseline Data', href: '/partner/baseline' },
    { label: 'Milestones', href: '/partner/milestones' },
    { label: 'Inclusion Audit', href: '/partner/inclusion-audit' },
  ];

  const trainingNav: NavItem[] = [
    { label: 'Dashboard', href: '/partner/training' },
    { label: 'Inclusion Audit', href: '/partner/inclusion-audit' },
  ];

  let navItems: NavItem[] = [];
  if (userType === 'staff') {
    navItems = staffNav;
  } else if (partnerType === 'training') {
    navItems = trainingNav;
  } else if (partnerType === 'both') {
    navItems = [...employmentNav, { label: 'Training', href: '/partner/training' }];
  } else {
    navItems = employmentNav;
  }

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen p-4">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-ach-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">ACH</span>
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-sm">{userName || 'User'}</p>
            <p className="text-xs text-gray-500">{orgName || 'Organisation'}</p>
          </div>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-ach-light text-ach-dark'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="absolute bottom-4 left-4 right-4">
        <Link
          href="/"
          className="block px-3 py-2 text-sm text-gray-500 hover:text-gray-700"
        >
          Sign Out
        </Link>
      </div>
    </aside>
  );
}
