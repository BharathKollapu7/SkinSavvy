export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      chat_histories: {
        Row: {
          created_at: string
          id: string
          messages: Json
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          messages?: Json
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          messages?: Json
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      combo_routines: {
        Row: {
          concerns: string[]
          created_at: string
          id: string
          morning_suggestion: string
          night_suggestion: string
        }
        Insert: {
          concerns: string[]
          created_at?: string
          id?: string
          morning_suggestion: string
          night_suggestion: string
        }
        Update: {
          concerns?: string[]
          created_at?: string
          id?: string
          morning_suggestion?: string
          night_suggestion?: string
        }
        Relationships: []
      }
      favorites: {
        Row: {
          brand: string | null
          created_at: string
          id: string
          notable_effects: string | null
          price: string
          product_link: string | null
          product_name: string
          product_type: string
          user_id: string
        }
        Insert: {
          brand?: string | null
          created_at?: string
          id?: string
          notable_effects?: string | null
          price: string
          product_link?: string | null
          product_name: string
          product_type: string
          user_id: string
        }
        Update: {
          brand?: string | null
          created_at?: string
          id?: string
          notable_effects?: string | null
          price?: string
          product_link?: string | null
          product_name?: string
          product_type?: string
          user_id?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          brand: string | null
          Combination: number | null
          Dry: string | null
          Normal: string | null
          notable_effects: string | null
          Oily: number | null
          price: string
          product_link: string | null
          product_name: string
          product_type: string
          Sensitive: string | null
        }
        Insert: {
          brand?: string | null
          Combination?: number | null
          Dry?: string | null
          Normal?: string | null
          notable_effects?: string | null
          Oily?: number | null
          price: string
          product_link?: string | null
          product_name: string
          product_type: string
          Sensitive?: string | null
        }
        Update: {
          brand?: string | null
          Combination?: number | null
          Dry?: string | null
          Normal?: string | null
          notable_effects?: string | null
          Oily?: number | null
          price?: string
          product_link?: string | null
          product_name?: string
          product_type?: string
          Sensitive?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email_verified: boolean | null
          full_name: string | null
          id: string
          key_ingredients: string[] | null
          mobile_number: string | null
          name: string | null
          otp_attempts: number | null
          otp_code: string | null
          otp_expires_at: string | null
          routine_recommendations: string[] | null
          skin_analysis: Json | null
          skin_concerns: string[] | null
          skin_type: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email_verified?: boolean | null
          full_name?: string | null
          id: string
          key_ingredients?: string[] | null
          mobile_number?: string | null
          name?: string | null
          otp_attempts?: number | null
          otp_code?: string | null
          otp_expires_at?: string | null
          routine_recommendations?: string[] | null
          skin_analysis?: Json | null
          skin_concerns?: string[] | null
          skin_type?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email_verified?: boolean | null
          full_name?: string | null
          id?: string
          key_ingredients?: string[] | null
          mobile_number?: string | null
          name?: string | null
          otp_attempts?: number | null
          otp_code?: string | null
          otp_expires_at?: string | null
          routine_recommendations?: string[] | null
          skin_analysis?: Json | null
          skin_concerns?: string[] | null
          skin_type?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      quiz_responses: {
        Row: {
          ai_analysis: Json | null
          confidence_score: number | null
          created_at: string | null
          determined_skin_type: string | null
          id: string
          quiz_type: string
          responses: Json
          updated_at: string | null
          user_id: string
        }
        Insert: {
          ai_analysis?: Json | null
          confidence_score?: number | null
          created_at?: string | null
          determined_skin_type?: string | null
          id?: string
          quiz_type?: string
          responses: Json
          updated_at?: string | null
          user_id: string
        }
        Update: {
          ai_analysis?: Json | null
          confidence_score?: number | null
          created_at?: string | null
          determined_skin_type?: string | null
          id?: string
          quiz_type?: string
          responses?: Json
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      routine_templates: {
        Row: {
          concern_name: string
          created_at: string
          food_recommendations: string[] | null
          home_remedies: string[] | null
          icon: string | null
          id: string
          skincare_steps: Json
          updated_at: string
        }
        Insert: {
          concern_name: string
          created_at?: string
          food_recommendations?: string[] | null
          home_remedies?: string[] | null
          icon?: string | null
          id?: string
          skincare_steps: Json
          updated_at?: string
        }
        Update: {
          concern_name?: string
          created_at?: string
          food_recommendations?: string[] | null
          home_remedies?: string[] | null
          icon?: string | null
          id?: string
          skincare_steps?: Json
          updated_at?: string
        }
        Relationships: []
      }
      skincare_routines: {
        Row: {
          created_at: string
          id: string
          products: string[]
          routine_type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          products?: string[]
          routine_type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          products?: string[]
          routine_type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
