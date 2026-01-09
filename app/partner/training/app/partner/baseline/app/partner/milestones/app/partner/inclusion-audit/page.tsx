'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { INCLUSION_DIMENSION_LABELS, InclusionDimension } from '@/types';
import { Partner } from '@/types/database';

const dimensions: InclusionDimension[] = ['economic_security', 'skill_growth', 'workplace_dignity', 'voice_agency', 'social_belonging', 'wellbeing_confidence'];

export default function InclusionAuditPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [partner, setPartner] = useState<Partner | null>(null);
  const [scores, setScores] = useState<Record<string, number>>({});

  useEffect(() => {
    async function loadData() {
      try {
        const { data } = await supabase.from('partners').select('*').or('is_employment_partner.eq.true,is_training_partner.eq.true').limit(1).single();
        if (data) setPartner(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSubmit = async () => {
    if (!partner) return;
    setSaving(true);
    try {
      const assessmentData: any = { partner_id: partner.id, assessment_date: new Date().toISOString().split('T')[0] };
      dimensions.forEach(dim => {
        ['input', 'conversion', 'capability'].forEach(layer => {
          assessmentData[`${dim}_${layer}`] = scores[`${dim}_${layer}`] || null;
        });
      });
      await supabase.from('inclusion_assessments').insert(assessmentData);
      alert('Assessment submitted!');
    } catch (err) {
      console.error(err);
      alert('Failed to submit');
    } finally {
      setSaving(false);
    }
  };

  const totalQuestions = dimensions.length * 3;
  const answered = Object.keys(scores).length;

  if (loading) {
    return <div className="flex items-center justify-center min-h-[400px]"><div className="w-8 h-8 border-4 border-ach-primary border-t-transparent rounded-full animate-spin"></div></div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Inclusion Capability Audit</h1>
        <p className="text-gray-500">Assess 6 dimensions across 3 layers (1-5 scale)</p>
      </div>

      <div className="card mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-sm text-gray-700">Progress</span>
          <span className="text-sm text-gray-500">{answered}/{totalQuestions}</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full"><div className="h-full bg-ach-primary rounded-full" style={{ width: `${(answered / totalQuestions) * 100}%` }} /></div>
      </div>

      <div className="space-y-6">
        {dimensions.map((dim) => (
          <div key={dim} className="card">
            <h2 className="font-semibold text-gray-900 mb-4">{INCLUSION_DIMENSION_LABELS[dim]}</h2>
            {(['input', 'conversion', 'capability'] as const).map((layer) => (
              <div key={layer} className="mb-4">
                <p className="text-sm text-gray-600 mb-2 capitalize">{layer}</p>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button key={n} onClick={() => setScores({ ...scores, [`${dim}_${layer}`]: n })} className={`w-10 h-10 rounded-lg font-medium ${scores[`${dim}_${layer}`] === n ? 'bg-ach-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{n}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <button onClick={handleSubmit} disabled={saving || answered < totalQuestions} className="btn-primary w-full py-3 mt-6 disabled:opacity-50">
        {saving ? 'Submitting...' : 'Submit Audit'}
      </button>
    </div>
  );
}
