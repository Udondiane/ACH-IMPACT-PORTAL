export type Database = {
  public: {
    Tables: {
      partners: {
        Row: {
          id: string;
          name: string;
          sector: string | null;
          contact_name: string | null;
          contact_email: string | null;
          contact_phone: string | null;
          employee_count: number | null;
          is_employment_partner: boolean;
          is_training_partner: boolean;
          partnership_start: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['partners']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['partners']['Insert']>;
      };
      candidates: {
        Row: {
          id: string;
          first_name: string;
          last_name: string;
          email: string | null;
          phone: string | null;
          country_of_origin: string | null;
          source: 'tenant' | 'community' | 'partner_referral' | 'self_referral' | null;
          primary_programme: 'employment' | 'housing' | 'esol' | 'resettlement' | 'integration' | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['candidates']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['candidates']['Insert']>;
      };
      placements: {
        Row: {
          id: string;
          candidate_id: string;
          partner_id: string;
          role_title: string;
          start_date: string;
          end_date: string | null;
          salary: number | null;
          is_hard_to_fill: boolean;
          status: 'active' | 'completed' | 'left_early';
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['placements']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['placements']['Insert']>;
      };
      milestone_reviews: {
        Row: {
          id: string;
          placement_id: string;
          milestone: '3_month' | '6_month' | '12_month';
          still_employed: boolean;
          performance_rating: 'poor' | 'fair' | 'good' | 'excellent' | null;
          received_training: boolean;
          training_details: string | null;
          progression: boolean;
          progression_details: string | null;
          employer_quote: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['milestone_reviews']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['milestone_reviews']['Insert']>;
      };
      him_assessments: {
        Row: {
          id: string;
          candidate_id: string;
          assessment_date: string;
          source: 'baseline' | 'checkin' | 'milestone' | 'exit' | null;
          employment_score: number | null;
          housing_score: number | null;
          education_skills_score: number | null;
          health_wellbeing_score: number | null;
          belonging_identity_score: number | null;
          social_participation_score: number | null;
          rights_citizenship_score: number | null;
          notes: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['him_assessments']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['him_assessments']['Insert']>;
      };
      inclusion_assessments: {
        Row: {
          id: string;
          partner_id: string;
          assessment_date: string;
          economic_security_input: number | null;
          economic_security_conversion: number | null;
          economic_security_capability: number | null;
          skill_growth_input: number | null;
          skill_growth_conversion: number | null;
          skill_growth_capability: number | null;
          workplace_dignity_input: number | null;
          workplace_dignity_conversion: number | null;
          workplace_dignity_capability: number | null;
          voice_agency_input: number | null;
          voice_agency_conversion: number | null;
          voice_agency_capability: number | null;
          social_belonging_input: number | null;
          social_belonging_conversion: number | null;
          social_belonging_capability: number | null;
          wellbeing_confidence_input: number | null;
          wellbeing_confidence_conversion: number | null;
          wellbeing_confidence_capability: number | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['inclusion_assessments']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['inclusion_assessments']['Insert']>;
      };
      training_sessions: {
        Row: {
          id: string;
          partner_id: string;
          session_date: string;
          session_title: string | null;
          attendee_count: number | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['training_sessions']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['training_sessions']['Insert']>;
      };
      training_surveys: {
        Row: {
          id: string;
          session_id: string;
          survey_type: 'pre' | 'post' | 'followup';
          attendee_code: string | null;
          knowledge_score: number | null;
          awareness_score: number | null;
          confidence_score: number | null;
          psych_safety_score: number | null;
          refugee_employment_score: number | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['training_surveys']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['training_surveys']['Insert']>;
      };
      infrastructure_assessments: {
        Row: {
          id: string;
          partner_id: string;
          assessment_date: string;
          recruitment_bias_review: number | null;
          accessible_job_descriptions: number | null;
          alternative_qualifications: number | null;
          adapted_onboarding: number | null;
          language_support: number | null;
          manager_training: number | null;
          flexible_policies: number | null;
          progression_pathways: number | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['infrastructure_assessments']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['infrastructure_assessments']['Insert']>;
      };
      candidate_checkins: {
        Row: {
          id: string;
          candidate_id: string;
          placement_id: string | null;
          checkin_date: string;
          staff_member: string | null;
          employment_observation: number | null;
          education_skills_observation: number | null;
          health_wellbeing_observation: number | null;
          belonging_identity_observation: number | null;
          candidate_quote: string | null;
          notes: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['candidate_checkins']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['candidate_checkins']['Insert']>;
      };
      partner_baselines: {
        Row: {
          id: string;
          partner_id: string;
          role_title: string;
          annual_salary: number | null;
          baseline_retention_percent: number;
          difficulty: 'easy' | 'moderate' | 'hard' | 'very_hard' | null;
          weeks_to_fill: number;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['partner_baselines']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['partner_baselines']['Insert']>;
      };
    };
  };
};

export type Partner = Database['public']['Tables']['partners']['Row'];
export type Candidate = Database['public']['Tables']['candidates']['Row'];
export type Placement = Database['public']['Tables']['placements']['Row'];
export type PartnerBaseline = Database['public']['Tables']['partner_baselines']['Row'];
export type MilestoneReview = Database['public']['Tables']['milestone_reviews']['Row'];
export type HIMAssessment = Database['public']['Tables']['him_assessments']['Row'];
export type InclusionAssessment = Database['public']['Tables']['inclusion_assessments']['Row'];
export type TrainingSession = Database['public']['Tables']['training_sessions']['Row'];
export type TrainingSurvey = Database['public']['Tables']['training_surveys']['Row'];
export type InfrastructureAssessment = Database['public']['Tables']['infrastructure_assessments']['Row'];
export type CandidateCheckin = Database['public']['Tables']['candidate_checkins']['Row'];

export type PlacementWithRelations = Placement & {
  candidate: Candidate;
  partner: Partner;
};

export type MilestoneReviewWithRelations = MilestoneReview & {
  placement: PlacementWithRelations;
};

export type TrainingSessionWithRelations = TrainingSession & {
  partner: Partner;
  surveys: TrainingSurvey[];
};
