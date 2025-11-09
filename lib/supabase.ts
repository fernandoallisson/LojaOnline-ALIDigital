import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      products: {
        Row: {
          id: string;
          name: string;
          category: string;
          description: string;
          price: number;
          stock: number;
          image_url: string;
          active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['products']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['products']['Insert']>;
      };
      offers: {
        Row: {
          id: string;
          title: string;
          image_url: string;
          product_id: string | null;
          active: boolean;
          order_position: number;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['offers']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['offers']['Insert']>;
      };
      store_settings: {
        Row: {
          id: string;
          primary_color: string;
          secondary_color: string;
          neutral_color: string;
          store_name: string;
          store_description: string;
          show_offers: boolean;
          show_featured: boolean;
          updated_at: string;
        };
        Insert: Partial<Database['public']['Tables']['store_settings']['Row']>;
        Update: Partial<Database['public']['Tables']['store_settings']['Insert']>;
      };
      orders: {
        Row: {
          id: string;
          stripe_session_id: string;
          product_id: string | null;
          quantity: number;
          total_amount: number;
          status: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['orders']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['orders']['Insert']>;
      };
    };
  };
};
