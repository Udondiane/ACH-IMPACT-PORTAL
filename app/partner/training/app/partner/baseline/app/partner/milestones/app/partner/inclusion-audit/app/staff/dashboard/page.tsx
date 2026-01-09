'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { MetricCard } from '@/components/ui/MetricCard';
import { Partner, PlacementWithRelations } from '@/types/database';

export default function StaffDashboard() {
  const [loading, setLoading] = useState(true);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [placements, setPlacements] = useState<PlacementWithRelations[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const { data: partnersData } = await supabase.from('partners').select('*').order('name');
        if (partnersData) setPartners(partnersData);

        const { data: placementsData } = await supabase.from('placements').select('*, candidate:candidates(*), partner:partners(*)').order('start_date', { ascending: false });
        if (placementsData) setPlacements(placementsData as PlacementWithRelations[]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const employmentPartners = partners.filter(p => p.is_employment_partner);
  const activePlacements = placements.filter(p => p.status === 'active');
  const leftEarly = placements.filter(p => p.status === 'left_early').length;
  const retentionRate = placements.length > 0 ? Math.round(((placements.length - leftEarly) / placements.length) * 100) : 0;

  if (loading) {
    return <div className="flex items-center justify-center min-h-[400px]"><div className="w-8 h-8 border-4 border-ach-primary border-t-transparent rounded-full animate-spin"></div></div>;
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Programme Dashboard</h1>
        <p className="text-gray-500">Overview of all ACH impact programmes</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard title="Employment Partners" value={employmentPartners.length} />
        <MetricCard title="Active Placements" value={activePlacements.length} />
        <MetricCard title="Retention Rate" value={`${retentionRate}%`} />
        <MetricCard title="Total Candidates" value={placements.length} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="flex justify-between mb-4">
            <h2 className="font-semibold text-gray-900">Recent Placements</h2>
            <Link href="/staff/candidates" className="text-sm text-ach-primary hover:underline">View all</Link>
          </div>
          <div className="divide-y divide-gray-100">
            {placements.slice(0, 5).map((p) => (
              <div key={p.id} className="py-3 flex justify-between">
                <div>
                  <p className="font-medium text-gray-900">{p.candidate.first_name} {p.candidate.last_name}</p>
                  <p className="text-sm text-gray-500">{p.role_title} at {p.partner.name}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded h-fit ${p.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>{p.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="flex justify-between mb-4">
            <h2 className="font-semibold text-gray-900">Quick Actions</h2>
          </div>
          <div className="space-y-3">
            <Link href="/staff/candidates" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 text-sm font-medium">Add Candidate</Link>
            <Link href="/staff/partners" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 text-sm font-medium">Add Partner</Link>
            <Link href="/staff/checkins" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 text-sm font-medium">Record Check-in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
