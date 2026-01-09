'use client';
import { InclusionDimension, INCLUSION_DIMENSION_LABELS } from '@/types';

interface InclusionProfileProps {
  scores: Record<InclusionDimension, number>;
}

export function InclusionProfile({ scores }: InclusionProfileProps) {
  const dimensions = Object.entries(scores) as [InclusionDimension, number][];
  return (
    <div className="card">
      <h3 className="font-semibold text-gray-900 mb-4">Inclusion Profile</h3>
      <div className="space-y-3">
        {dimensions.map(([dim, score]) => (
          <div key={dim}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-700">{INCLUSION_DIMENSION_LABELS[dim]}</span>
              <span className="font-medium">{score}</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full">
              <div className={`h-full rounded-full ${score >= 70 ? 'bg-green-500' : score >= 50 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${score}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
