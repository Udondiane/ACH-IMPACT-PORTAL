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
          employee_count: number | null;
          is_employment_partner: boolean;
          is_training_partner: boolean;
          created_at: string;
        };
      };
      candidates: {
        Row: {
          id: string;
          first_name: string;
          last_name: string;
          email: string | null;
          country_of_origin: string | null;
          primary_programme: string | null;
          created_at: string;
        };
      };
      placements: {
        Row: {
          id: string;
          candidate_id: string;
          partner_id: string;
          role_title: string;
          start_date: string;
          salary: number | null;
          is_hard_to_fill: boolean;
          status: string;
          created_at: string;
        };
      };
      partner_baselines: {
        Row: {
          id: string;
          partner_id: string;
          role_title: string;
          annual_salary: number | null;
          baseline_retention_percent: number;
          created_at: string;
        };
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
      };
    };
  };
};

export type Partner = Database['public']['Tables']['partners']['Row'];
export type Candidate = Database['public']['Tables']['candidates']['Row'];
export type Placement = Database['public']['Tables']['placements']['Row'];
export type PartnerBaseline = Database['public']['Tables']['partner_baselines']['Row'];
export type TrainingSession = Database['public']['Tables']['training_sessions']['Row'];
