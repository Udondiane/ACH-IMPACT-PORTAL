'use client';
import { useEffect, useState } from 'react';
import { ScoreCard } from '@/components/ui/ScoreCard';
import { MetricCard } from '@/components/ui/MetricCard';
import { supabase } from '@/lib/supabase';

export default function TrainingDashboard() {
  const [loading, setLoading] = useState(true);
  const [sessions, setSessions] = useState<any[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const { data: partner } = await supabase.from('partners').select('*').eq('is_training_partner', true).limit(1).single();
        if (partner) {
          const { data } = await supabase.from('training_sessions').select('*').eq('partner_id', partner.id);
          if (data) setSessions(data);
        }
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    }
    loadData();
  }, []);

  const totalTrained = sessions.reduce((sum, s) => sum + (s.attendee_count || 0), 0);

  if (loading) return <div className="flex items-center justify-center min-h-[400px]"><div className="w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div></div>;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Training Dashboard</h1>
      </div>
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <ScoreCard title="Staff Capability" score={75} />
        <ScoreCard title="Infrastructure" score={68} />
        <ScoreCard title="Overall Impact" score={72} />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Sessions" value={sessions.length} />
        <MetricCard title="Staff Trained" value={totalTrained} />
        <MetricCard title="Improvement" value="+42%" />
        <MetricCard title="Effect Size" value="0.85" subtitle="Large effect" />
      </div>
    </div>
  );
}
