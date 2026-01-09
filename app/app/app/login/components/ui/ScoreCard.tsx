'use client';

import { getScoreTier, getTierLabel } from '@/lib/calculations';

interface ScoreCardProps {
  title: string;
  score: number;
  subtitle?: string;
  description?: string;
  benchmark?: number;
}

export function ScoreCard({ title, score, subtitle, description, benchmark }: ScoreCardProps) {
  const tier = getScoreTier(score);
  
  const tierColors = {
    emerging: { text: 'text-red-600', bg: 'bg-red-100', bar: 'bg-red-500' },
    developing: { text: 'text-amber-600', bg: 'bg-amber-100', bar: 'bg-amber-500' },
    established: { text: 'text-blue-600', bg: 'bg-blue-100', bar: 'bg-blue-500' },
    leading: { text: 'text-green-600', bg: 'bg-green-100', bar: 'bg-green-500' },
  };

  const colors = tierColors[tier];

  return (
    <div className="card">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-gray-900">{title}</h3>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${colors.bg} ${colors.text}`}>
          {getTierLabel(tier)}
        </span>
      </div>
      
      <div className="flex items-end gap-2 mb-2">
        <span className={`text-5xl font-bold ${colors.text}`}>{score}</span>
        <span className="text-gray-400 text-lg mb-1">/100</span>
      </div>
      
      {benchmark !== undefined && (
        <p className="text-sm text-gray-500 mb-3">ACH Average: {benchmark}</p>
      )}
      
      {description && (
        <p className="text-sm text-gray-600 mb-4">{description}</p>
      )}
      
      <div className="mt-4">
        <div className="flex justify-between text-xs text-gray-400 mb-1">
          <span>Emerging</span>
          <span>Developing</span>
          <span>Established</span>
          <span>Leading</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className={`h-full rounded-full ${colors.bar}`} style={{ width: `${score}%` }} />
        </div>
      </div>
    </div>
  );
}
