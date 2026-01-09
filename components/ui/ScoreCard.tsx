'use client';
import { getScoreTier, getTierLabel } from '@/lib/calculations';

interface ScoreCardProps {
  title: string;
  score: number;
  subtitle?: string;
  benchmark?: number;
}

export function ScoreCard({ title, score, subtitle, benchmark }: ScoreCardProps) {
  const tier = getScoreTier(score);
  const colors = {
    emerging: { text: 'text-red-600', bg: 'bg-red-100', bar: 'bg-red-500' },
    developing: { text: 'text-amber-600', bg: 'bg-amber-100', bar: 'bg-amber-500' },
    established: { text: 'text-blue-600', bg: 'bg-blue-100', bar: 'bg-blue-500' },
    leading: { text: 'text-green-600', bg: 'bg-green-100', bar: 'bg-green-500' },
  }[tier];

  return (
    <div className="card">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-gray-900">{title}</h3>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${colors.bg} ${colors.text}`}>{getTierLabel(tier)}</span>
      </div>
      <div className="flex items-end gap-2 mb-2">
        <span className={`text-5xl font-bold ${colors.text}`}>{score}</span>
        <span className="text-gray-400 text-lg mb-1">/100</span>
      </div>
      {benchmark && <p className="text-sm text-gray-500 mb-3">ACH Average: {benchmark}</p>}
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${colors.bar}`} style={{ width: `${score}%` }} />
      </div>
    </div>
  );
}
