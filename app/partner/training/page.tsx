'use client';

import { useEffect, useState } from 'react';
import { ScoreCard } from '@/components/ui/ScoreCard';
import { MetricCard } from '@/components/ui/MetricCard';
import { supabase } from '@/lib/supabase';
import { calculateTrainingImprovement, calculateInfrastructureScore } from '@/lib/calculations';
import { TrainingSessionWithRelations, InfrastructureAssessment } from '@/types/database';

export default function TrainingDashboard() {
  const [loading, setLoading] = useState(true);
  const [sessions, setSessions] = useState<TrainingSessionWithRelations[]>([]);
  const [infrastructure, setInfrastructure] = useState<InfrastructureAssessment | null>(null);
  const [partnerName, setPartnerName] = useState('Your Organisation');

  useEffect(() => {
    async function loadData() {
      try {
        const { data: partner } = await supabase
          .from('partners')
          .select('*')
          .eq('is_training_partner', true)
          .limit(1)
          .single();

        if (partner) {
          setPartnerName(partner.name);

          const { data: sessionsData } = await supabase
            .from('training_sessions')
            .select('*, partner:partners(*), surveys:training_surveys(*)')
            .eq('partner_id', partner.id)
            .order('session_date', { ascending: false });

          if (sessionsData) setSessions(sessionsData as TrainingSessionWithRelations[]);

          const { data: infraData } = await supabase
            .from('infrastructure_assessments')
            .select('*')
            .eq('partner_id', partner.id)
            .order('assessment_date', { ascending: false })
            .limit(1)
            .single();

          if (infraData) setInfrastructure(infraData);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const totalStaffTrained = sessions.reduce((sum, s) => sum + (s.attendee_count || 0), 0);
  const allSurveys = sessions.flatMap(s => s.surveys || []);
  const preSurveys = allSurveys.filter(s => s.survey_type === 'pre');
  const postSurveys = allSurveys.filter(s => s.survey_type === 'post');

  const sections = ['knowledge', 'awareness', 'confidence', 'psych_safety', 'refugee_employment'] as const;
  const sectionScores = sections.map(section => {
    const preScores = preSurveys.map(s => (s as any)[`${section}_score`]).filter(Boolean);
    const postScores = postSurveys.map(s => (s as any)[`${section}_score`]).filter(Boolean);
    const preAvg = preScores.length > 0 ? preScores.reduce((a, b) => a + b, 0) / preScores.length : 0;
    const postAvg = postScores.length > 0 ? postScores.reduce((a, b) => a + b, 0) / postScores.length : 0;
    return { section, preAvg, postAvg };
  });

  const overallPreAvg = sectionScores.reduce((sum, s) => sum + s.preAvg, 0) / sections.length;
  const overallPostAvg = sectionScores.reduce((sum, s) => sum + s.postAvg, 0) / sections.length;
  const improvement = calculateTrainingImprovement(overallPreAvg, overallPostAvg);

  const infraItems = infrastructure ? {
    recruitment_bias_review: infrastructure.recruitment_bias_review || 0,
    accessible_job_descriptions: infrastructure.accessible_job_descriptions || 0,
    alternative_qualifications: infrastructure.alternative_qualifications || 0,
    adapted_onboarding: infrastructure.adapted_onboarding || 0,
    language_support: infrastructure.language_support || 0,
    manager_training: infrastructure.manager_training || 0,
    flexible_policies: infrastructure.flexible_policies || 0,
    progression_pathways: infrastructure.progression_pathways || 0,
  } : {};

  const infrastructureScore = infrastructure ? calculateInfrastructureScore(infraItems) : 0;
  const staffCapabilityScore = overallPostAvg > 0 ? Math.round(overallPostAvg * 20) : 0;
  const inclusionCapabilityScore = Math.round(staffCapabilityScore * 0.75 + infrastructureScore * 0.25);

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
        <h1 className="text-2xl font-bold text-gray-900">Training Partnership Dashboard</h1>
        <p className="text-gray-500">{partnerName}</p>
      </div>

      {sessions.length === 0 ? (
        <div className="card text-center py-12">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No training sessions yet</h3>
          <p className="text-gray-500">Once ACH delivers training, your dashboard will populate.</p>
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <ScoreCard title="Inclusion Capability" score={inclusionCapabilityScore} benchmark={70} />
            <ScoreCard title="Staff Capability" score={staffCapabilityScore} />
            <ScoreCard title="Infrastructure" score={infrastructureScore} />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <MetricCard title="Sessions Delivered" value={sessions.length} />
            <MetricCard title="Staff Trained" value={totalStaffTrained} />
            <MetricCard title="Improvement" value={`+${improvement}%`} />
            <MetricCard title="Surveys Completed" value={allSurveys.length} />
          </div>
        </>
      )}
    </div>
  );
}
