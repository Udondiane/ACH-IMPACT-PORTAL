'use client';

import { InclusionDimension, INCLUSION_DIMENSION_LABELS } from '@/types';

interface InclusionProfileProps {
  scores: Record<InclusionDimension, number>;
  showRecommendations?: boolean;
}

export function InclusionProfile({ scores, showRecommendations = false }: InclusionProfileProps) {
  const dimensions = Object.entries(scores) as [InclusionDimension, number][];
  const sortedByScore = [...dimensions].sort((a, b) => a[1] - b[1]);
  const lowestTwo = sortedByScore.slice(0, 2);

  const recommendations: Record<InclusionDimension, string> = {
    economic_security: 'Review pay transparency and contract stability',
    skill_growth: 'Expand training access and development pathways',
    workplace_dignity: 'Strengthen anti-discrimination policies and practices',
    voice_agency: 'Create more channels for employee feedback',
    social_belonging: 'Develop team integration and mentoring programmes',
    wellbeing_confidence: 'Enhance wellbeing support and mental health resources',
  };

  return (
    <div className="card">
      <h3 className="font-semibold text-gray-900 mb-4">Inclusion Capability Profile</h3>
      
      <div className="space-y-3 mb-6">
        {dimensions.map(([dimension, score]) => (
          <div key={dimension}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-700">{INCLUSION_DIMENSION_LABELS[dimension]}</span>
              <span className="font-medium text-gray-900">{score}</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${
                  score >= 80 ? 'bg-green-500' :
                  score >= 60 ? 'bg-blue-500' :
                  score >= 40 ? 'bg-amber-500' :
                  'bg-red-500'
                }`}
                style={{ width: `${score}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {showRecommendations && lowestTwo.length > 0 && (
        <div className="border-t border-gray-100 pt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Focus Areas</h4>
          <ul className="space-y-2">
            {lowestTwo.map(([dimension]) => (
              <li key={dimension} className="text-sm text-gray-600 flex items-start gap-2">
                <span className="text-amber-500 mt-0.5">•</span>
                <span>{recommendations[dimension]}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
