'use client';

import { useEffect, useState } from 'react';
import { ScoreCard } from '@/components/ui/ScoreCard';
import { MetricCard } from '@/components/ui/MetricCard';
import { InclusionProfile } from '@/components/ui/InclusionProfile';
import { supabase } from '@/lib/supabase';
import { formatCurrency, calculateBusinessValueScore, calculateInclusionScore } from '@/lib/calculations';
import { PlacementWithRelations, InclusionAssessment, MilestoneReview, PartnerBaseline } from '@/types/database';
import { InclusionDimension } from '@/types';

export default function EmploymentDashboard() {
  const [loading, setLoading] = useState(true);
  const [placements, setPlacements] = useState<PlacementWithRelations[]>([]);
  const [inclusionAssessment, setInclusionAssessment] = useState<InclusionAssessment | null>(null);
  const [milestoneReviews, setMilestoneReviews] = useState<MilestoneReview[]>([]);
  const [baselines, setBaselines] = useState<PartnerBaseline[]>([]);
  const [partnerName, setPartnerName] = useState('Your Organisation');

  useEffect(() => {
    async function loadData() {
      try {
        const { data: partner } = await supabase
          .from('partners')
          .select('*')
          .eq('is_employment_partner', true)
          .limit(1)
          .single();

        if (partner) {
          setPartnerName(partner.name);

          const { data: placementsData } = await supabase
            .from('placements')
            .select('*, candidate:candidates(*), partner:partners(*)')
            .eq('partner_id', partner.id)
            .order('start_date', { ascending: false });

          if (placementsData) setPlacements(placementsData as PlacementWithRelations[]);

          const { data: inclusionData } = await supabase
            .from('inclusion_assessments')
            .select('*')
            .eq('partner_id', partner.id)
            .order('assessment_date', { ascending: false })
            .limit(1)
            .single();

          if (inclusionData) setInclusionAssessment(inclusionData);

          const { data: reviewsData } = await supabase
            .from('milestone_reviews')
            .select('*');

          if (reviewsData) setMilestoneReviews(reviewsData);

          const { data: baselinesData } = await supabase
            .from('partner_baselines')
            .select('*')
            .eq('partner_id', partner.id);

          if (baselinesData) setBaselines(baselinesData);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const activePlacements = placements.filter(p => p.status === 'active');
  const hardToFillRoles = placements.filter(p => p.is_hard_to_fill).length;
  const totalSalary = placements.reduce((sum, p) => sum + (p.salary || 0), 0);
  const avgSalary = placements.length > 0 ? totalSalary / placements.length : 25000;
  const productivityGained = Math.round((avgSalary / 52) * 6 * hardToFillRoles);

  const leftEarly = placements.filter(p => p.status === 'left_early').length;
  const retentionRate = placements.length > 0 
    ? Math.round(((placements.length - leftEarly) / placements.length) * 100) : 100;

  const baselineRetention = baselines.length > 0
    ? baselines.reduce((sum, b) => sum + b.baseline_retention_percent, 0) / baselines.length : 52;
  const retentionSavings = Math.round(((retentionRate - baselineRetention) / 100) * 4500 * placements.length);

  const businessValueScore = calculateBusinessValueScore(productivityGained, retentionRate);

  const inclusionDimensionScores: Record<InclusionDimension, number> = {
    economic_security: 0, skill_growth: 0, workplace_dignity: 0,
    voice_agency: 0, social_belonging: 0, wellbeing_confidence: 0,
  };

  if (inclusionAssessment) {
    const dims: InclusionDimension[] = ['economic_security', 'skill_growth', 'workplace_dignity', 'voice_agency', 'social_belonging', 'wellbeing_confidence'];
    dims.forEach(dim => {
      const input = (inclusionAssessment as any)[`${dim}_input`] || 0;
      const conversion = (inclusionAssessment as any)[`${dim}_conversion`] || 0;
      const capability = (inclusionAssessment as any)[`${dim}_capability`] || 0;
      inclusionDimensionScores[dim] = Math.round((input * 0.3 + conversion * 0.3 + capability * 0.4) * 20);
    });
  }

  const inclusionCapabilityScore = calculateInclusionScore(inclusionDimensionScores);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-ach-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Employment Partnership Dashboard</h1>
        <p className="text-gray-500">{partnerName}</p>
      </div>

      {placements.length === 0 ? (
        <div className="card text-center py-12">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No placements yet</h3>
          <p className="text-gray-500">Once ACH places candidates with you, your dashboard will populate.</p>
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <ScoreCard title="Business Value Score" subtitle="Productivity and retention gains" score={businessValueScore} benchmark={68} />
            <ScoreCard title="Inclusion Capability Score" subtitle="Your ability to support refugee employees" score={inclusionCapabilityScore} benchmark={72} />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <MetricCard title="Hard-to-Fill Roles" value={hardToFillRoles} subtitle="filled via ACH" />
            <MetricCard title="Productivity Gained" value={formatCurrency(productivityGained)} subtitle="~6 weeks saved per role" />
            <MetricCard title="Retention Rate" value={`${retentionRate}%`} subtitle={`+${retentionRate - Math.round(baselineRetention)}% vs baseline`} />
            <MetricCard title="Retention Savings" value={formatCurrency(Math.max(0, retentionSavings))} subtitle="reduced turnover costs" />
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            <InclusionProfile scores={inclusionDimensionScores} showRecommendations={true} />
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-4">Your Team ({activePlacements.length} active)</h3>
              <div className="divide-y divide-gray-100">
                {activePlacements.slice(0, 5).map((p) => (
                  <div key={p.id} className="py-3 flex justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{p.candidate.first_name} {p.candidate.last_name}</p>
                      <p className="text-sm text-gray-500">{p.role_title}</p>
                    </div>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded h-fit">Active</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
