// Tipos para la base de datos de Supabase

export interface PrayerRequest {
  id?: string;
  ticket: number;
  nombre: string;
  correo_electronico: string;
  asunto: string;
  peticion: string;
  status?: 'pending' | 'in_progress' | 'completed';
  created_at?: string;
  processed_at?: string;
}

export interface PrayerRequestInsert {
  ticket: number;
  nombre: string;
  correo_electronico: string;
  asunto: string;
  peticion: string;
  status?: 'pending' | 'in_progress' | 'completed';
}

export interface Feedback {
  id?: string;
  type: 'bug' | 'feature' | 'general';
  title?: string;
  subject?: string;
  description: string;
  priority?: 'low' | 'medium' | 'high';
  importance?: 'low' | 'medium' | 'high';
  browser?: string;
  email?: string;
  status?: 'pending' | 'in_progress' | 'completed';
  created_at?: string;
  processed_at?: string;
}

export interface FeedbackInsert {
  type: 'bug' | 'feature' | 'general';
  title?: string;
  subject?: string;
  description: string;
  priority?: 'low' | 'medium' | 'high';
  importance?: 'low' | 'medium' | 'high';
  browser?: string;
  email?: string;
  status?: 'pending' | 'in_progress' | 'completed';
}

export interface Database {
  public: {
    Tables: {
      prayer_requests: {
        Row: PrayerRequest;
        Insert: PrayerRequestInsert;
        Update: Partial<PrayerRequestInsert>;
      };
      feedback: {
        Row: Feedback;
        Insert: FeedbackInsert;
        Update: Partial<FeedbackInsert>;
      };
      // Otros tipos de tablas se pueden agregar aquí
    };
  };
}
