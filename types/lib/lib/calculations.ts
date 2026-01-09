import { ScoreTier } from '@/types';

export function calculateProductivityGained(
  placements: number,
  avgSalary: number,
  weeksSaved: number = 6
): number {
  const weeklyValue = avgSalary / 52;
  return Math.round(weeklyValue * weeksSaved * placements);
}

export function calculateRetentionSavings(
  achRetention: number,
  baselineRetention: number,
  placements: number,
  replacementCost: number = 4500
): number {
  const improvement = Math.max(0, achRetention - baselineRetention) / 100;
  return Math.round(improvement * replacementCost * placements);
}

export function calculateBusinessValueScore(
  productivityGained: number,
  retentionRate: number
): number {
  const productivityScore = Math.min(100, (productivityGained / 20000) * 100);
  const retentionScore = Math.min(100, retentionRate);
  return Math.round((productivityScore * 0.5) + (retentionScore * 0.5));
}

export function calculateInclusionScore(
  dimensionScores: Record<string, number>
): number {
  const scores = Object.values(dimensionScores);
  if (scores.length === 0) return 0;
  return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
}

export function calculateTrainingImprovement(
  preAvg: number,
  postAvg: number
): number {
  if (preAvg === 0) return 0;
  return Math.round(((postAvg - preAvg) / preAvg) * 100);
}

export function calculateInfrastructureScore(
  items: Record<string, number>
): number {
  const values = Object.values(items);
  const total = values.reduce((a, b) => a + b, 0);
  const max = values.length * 2;
  return Math.round((total / max) * 100);
}

export function getScoreTier(score: number): ScoreTier {
  if (score < 40) return 'emerging';
  if (score < 60) return 'developing';
  if (score < 80) return 'established';
  return 'leading';
}

export function getTierLabel(tier: ScoreTier): string {
  return tier.charAt(0).toUpperCase() + tier.slice(1);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatPercentage(value: number): string {
  return `${Math.round(value)}%`;
}
