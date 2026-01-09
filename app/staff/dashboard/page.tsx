'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { MetricCard } from '@/components/ui/MetricCard';
import { supabase } from '@/lib/supabase';

export default function StaffDashboard() {
  const [loading, setLoading] = useState(true);
  const [partners, setPartners] = useState<any[]>([]);
  const [placements, setPlacements] = useState<any[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const { data: p } = await supabase.from('partners').select('*');
        const { data: pl } = await supabase.from('placements').select('*, candidate:candidates(*), partner:partners(*)');
        if (p) setPartners(p);
        if (pl) setPlacements(pl);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    }
    loadData();
  }, []);

  const active = placements.filter(p => p.status === 'active').length;
  const retention = placements.length > 0 ? Math.round(((placements.length - placements.filter(p => p.status === 'left_early').length) / placements.length) * 100) : 0;

  if (loading) return <div className="flex items-center justify-center min-h-[400px]"><div className="w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div></div>;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Programme Dashboard</h1>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard title="Partners" value={partners.length} />
        <MetricCard title="Active Placements" value={active} />
        <MetricCard title="Retention" value={`${retention}%`} />
        <MetricCard title="Total Placed" value={placements.length} />
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="font-semibold mb-4">Recent Placements</h2>
          <div className="divide-y">
            {placements.slice(0, 5).map(p => (
              <div key={p.id} className="py-3 flex justify-between">
                <div>
                  <p className="font-medium">{p.candidate?.first_name} {p.candidate?.last_name}</p>
                  <p className="text-sm text-gray-500">{p.partner?.name}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded h-fit ${p.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100'}`}>{p.status}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <h2 className="font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link href="/staff/candidates" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 font-medium">Add Candidate</Link>
            <Link href="/staff/partners" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 font-medium">Add Partner</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
