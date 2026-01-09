export type HIMDomain = 
  | 'employment'
  | 'housing'
  | 'education_skills'
  | 'health_wellbeing'
  | 'belonging_identity'
  | 'social_participation'
  | 'rights_citizenship';

export const HIM_DOMAIN_LABELS: Record<HIMDomain, string> = {
  employment: 'Employment Capability',
  housing: 'Housing Capability',
  education_skills: 'Education & Skills',
  health_wellbeing: 'Health & Wellbeing',
  belonging_identity: 'Belonging & Identity',
  social_participation: 'Social Participation',
  rights_citizenship: 'Rights & Citizenship'
};

export type InclusionDimension = 
  | 'economic_security'
  | 'skill_growth'
  | 'workplace_dignity'
  | 'voice_agency'
  | 'social_belonging'
  | 'wellbeing_confidence';

export const INCLUSION_DIMENSION_LABELS: Record<InclusionDimension, string> = {
  economic_security: 'Economic Security & Stability',
  skill_growth: 'Skill Use & Growth',
  workplace_dignity: 'Workplace Dignity & Respect',
  voice_agency: 'Voice & Agency',
  social_belonging: 'Social Belonging & Inclusion',
  wellbeing_confidence: 'Wellbeing & Confidence'
};

export type ScoreTier = 'emerging' | 'developing' | 'established' | 'leading';
