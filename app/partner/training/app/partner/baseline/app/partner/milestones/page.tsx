'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { PlacementWithRelations } from '@/types/database';

export default function MilestonesPage() {
  const [loading, setLoading] = useState(true);
  const [placements, setPlacements] = useState<PlacementWithRelations[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const { data: partner } = await supabase.from('partners').select('*').eq('is_employment_partner', true).limit(1).single();
        if (partner) {
          const { data } = await supabase.from('placements').select('*, candidate:candidates(*), partner:partners(*)').eq('partner_id', partner.id).eq('status', 'active');
          if (data) setPlacements(data as PlacementWithRelations[]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center min-h-[400px]"><div className="w-8 h-8 border-4 border-ach-primary border-t-transparent rounded-full animate-spin"></div></div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Milestone Reviews</h1>
        <p className="text-gray-500">Submit 3/6/12 month progress reviews</p>
      </div>

      {placements.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-gray-500">No active placements to review.</p>
        </div>
      ) : (
        <div className="card">
          <div className="divide-y divide-gray-100">
            {placements.map((p) => {
              const months = Math.floor((new Date().getTime() - new Date(p.start_date).getTime()) / (1000 * 60 * 60 * 24 * 30));
              return (
                <div key={p.id} className="py-4 flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-900">{p.candidate.first_name} {p.candidate.last_name}</p>
                    <p className="text-sm text-gray-500">{p.role_title} - {months} months</p>
                  </div>
                  {months >= 3 && <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded">Review due</span>}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
