export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      academic_terms: {
        Row: {
          created_at: string | null
          end_date: string
          id: string
          is_current: boolean | null
          name: string
          school_id: string
          start_date: string
        }
        Insert: {
          created_at?: string | null
          end_date: string
          id?: string
          is_current?: boolean | null
          name: string
          school_id: string
          start_date: string
        }
        Update: {
          created_at?: string | null
          end_date?: string
          id?: string
          is_current?: boolean | null
          name?: string
          school_id?: string
          start_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "academic_terms_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
      classes: {
        Row: {
          academic_term_id: string | null
          created_at: string | null
          form_teacher_id: string | null
          grade_level: string
          id: string
          name: string
          school_id: string
          student_count: number | null
          updated_at: string | null
        }
        Insert: {
          academic_term_id?: string | null
          created_at?: string | null
          form_teacher_id?: string | null
          grade_level: string
          id?: string
          name: string
          school_id: string
          student_count?: number | null
          updated_at?: string | null
        }
        Update: {
          academic_term_id?: string | null
          created_at?: string | null
          form_teacher_id?: string | null
          grade_level?: string
          id?: string
          name?: string
          school_id?: string
          student_count?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "classes_academic_term_id_fkey"
            columns: ["academic_term_id"]
            isOneToOne: false
            referencedRelation: "academic_terms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "classes_form_teacher_id_fkey"
            columns: ["form_teacher_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "classes_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
      schools: {
        Row: {
          address: string | null
          contact_email: string
          contact_phone: string | null
          created_at: string | null
          district: string | null
          established_year: number | null
          gender_type: string | null
          id: string
          is_active: boolean | null
          logo_url: string | null
          motto: string | null
          name: string
          primary_color: string | null
          region: string | null
          residency_type: string | null
          secondary_color: string | null
          slug: string
          student_count: number | null
          teacher_count: number | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          contact_email: string
          contact_phone?: string | null
          created_at?: string | null
          district?: string | null
          established_year?: number | null
          gender_type?: string | null
          id?: string
          is_active?: boolean | null
          logo_url?: string | null
          motto?: string | null
          name: string
          primary_color?: string | null
          region?: string | null
          residency_type?: string | null
          secondary_color?: string | null
          slug: string
          student_count?: number | null
          teacher_count?: number | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          contact_email?: string
          contact_phone?: string | null
          created_at?: string | null
          district?: string | null
          established_year?: number | null
          gender_type?: string | null
          id?: string
          is_active?: boolean | null
          logo_url?: string | null
          motto?: string | null
          name?: string
          primary_color?: string | null
          region?: string | null
          residency_type?: string | null
          secondary_color?: string | null
          slug?: string
          student_count?: number | null
          teacher_count?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      subjects: {
        Row: {
          category: string | null
          code: string | null
          created_at: string | null
          description: string | null
          id: string
          name: string
          school_id: string
        }
        Insert: {
          category?: string | null
          code?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          school_id: string
        }
        Update: {
          category?: string | null
          code?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          school_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subjects_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string | null
          date_of_birth: string | null
          email: string
          full_name: string
          gender: string | null
          id: string
          is_active: boolean | null
          last_login: string | null
          phone_number: string | null
          profile_image: string | null
          role: string
          school_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          date_of_birth?: string | null
          email: string
          full_name: string
          gender?: string | null
          id: string
          is_active?: boolean | null
          last_login?: string | null
          phone_number?: string | null
          profile_image?: string | null
          role: string
          school_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          date_of_birth?: string | null
          email?: string
          full_name?: string
          gender?: string | null
          id?: string
          is_active?: boolean | null
          last_login?: string | null
          phone_number?: string | null
          profile_image?: string | null
          role?: string
          school_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_school_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      is_superadmin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
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
