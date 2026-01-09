'use client';
import { useEffect, useState } from 'react';
import { ScoreCard } from '@/components/ui/ScoreCard';
import { MetricCard } from '@/components/ui/MetricCard';
import { InclusionProfile } from '@/components/ui/InclusionProfile';
import { supabase } from '@/lib/supabase';
import { formatCurrency, calculateBusinessValueScore, calculateInclusionScore } from '@/lib/calculations';
import { InclusionDimension } from '@/types';

export default function EmploymentDashboard() {
  const [loading, setLoading] = useState(true);
  const [placements, setPlacements] = useState<any[]>([]);
  const [partnerName, setPartnerName] = useState('Your Organisation');

  useEffect(() => {
    async function loadData() {
      try {
        const { data: partner } = await supabase.from('partners').select('*').eq('is_employment_partner', true).limit(1).single();
        if (partner) {
          setPartnerName(partner.name);
          const { data } = await supabase.from('placements').select('*, candidate:candidates(*), partner:partners(*)').eq('partner_id', partner.id);
          if (data) setPlacements(data);
        }
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    }
    loadData();
  }, []);

  const hardToFill = placements.filter(p => p.is_hard_to_fill).length;
  const retentionRate = placements.length > 0 ? Math.round(((placements.length - placements.filter(p => p.status === 'left_early').length) / placements.length) * 100) : 100;
  const productivityGained = Math.round((25000 / 52) * 6 * hardToFill);
  const businessValueScore = calculateBusinessValueScore(productivityGained, retentionRate);
  const inclusionScores: Record<InclusionDimension, number> = { economic_security: 72, skill_growth: 68, workplace_dignity: 80, voice_agency: 65, social_belonging: 75, wellbeing_confidence: 70 };
  const inclusionScore = calculateInclusionScore(inclusionScores);

  if (loading) return <div className="flex items-center justify-center min-h-[400px]"><div className="w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div></div>;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Employment Dashboard</h1>
        <p className="text-gray-500">{partnerName}</p>
      </div>
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <ScoreCard title="Business Value Score" score={businessValueScore} benchmark={68} />
        <ScoreCard title="Inclusion Score" score={inclusionScore} benchmark={72} />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard title="Hard-to-Fill Roles" value={hardToFill} />
        <MetricCard title="Productivity Gained" value={formatCurrency(productivityGained)} />
        <MetricCard title="Retention Rate" value={`${retentionRate}%`} />
        <MetricCard title="Total Placements" value={placements.length} />
      </div>
      <InclusionProfile scores={inclusionScores} />
    </div>
  );
}
