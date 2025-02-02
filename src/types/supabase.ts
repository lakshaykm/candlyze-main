export interface Database {
  public: {
    Tables: {
      charts: {
        Row: {
          id: string;
          image_url: string;
          analysis: string;
          created_at: string;
          user_id: string;
        };
        Insert: {
          id?: string;
          image_url: string;
          analysis: string;
          created_at?: string;
          user_id: string;
        };
        Update: {
          id?: string;
          image_url?: string;
          analysis?: string;
          created_at?: string;
          user_id?: string;
        };
      };
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      subscriptions: {
        Row: {
          id: string;
          user_id: string;
          plan_id: string;
          status: string;
          amount: number;
          razorpay_subscription_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          plan_id: string;
          status: string;
          amount: number;
          razorpay_subscription_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          plan_id?: string;
          status?: string;
          amount?: number;
          razorpay_subscription_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      user_credits: {
        Row: {
          user_id: string;
          credits: number;
          plan: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          credits: number;
          plan: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          user_id?: string;
          credits?: number;
          plan?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}
