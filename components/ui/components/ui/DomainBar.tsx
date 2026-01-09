'use client';

import { HIMDomain, HIM_DOMAIN_LABELS } from '@/types';

interface DomainBarProps {
  domain: HIMDomain;
  score: number;
  previousScore?: number;
}

export function DomainBar({ domain, score, previousScore }: DomainBarProps) {
  const change = previousScore !== undefined ? score - previousScore : null;
  
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-gray-700">{HIM_DOMAIN_LABELS[domain]}</span>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-900">{score}</span>
          {change !== null && change !== 0 && (
            <span className={`text-xs font-medium ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {change > 0 ? '+' : ''}{change}
            </span>
          )}
        </div>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-ach-primary rounded-full transition-all duration-500"
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

interface DomainListProps {
  scores: Partial<Record<HIMDomain, number>>;
  previousScores?: Partial<Record<HIMDomain, number>>;
}

export function DomainList({ scores, previousScores }: DomainListProps) {
  const domains = Object.keys(scores) as HIMDomain[];
  
  return (
    <div className="card">
      <h3 className="font-semibold text-gray-900 mb-4">HIM Domain Scores</h3>
      {domains.map(domain => (
        <DomainBar
          key={domain}
          domain={domain}
          score={scores[domain] || 0}
          previousScore={previousScores?.[domain]}
        />
      ))}
    </div>
  );
}
