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
    };
  };
}