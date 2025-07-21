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

export interface Database {
  public: {
    Tables: {
      prayer_requests: {
        Row: PrayerRequest;
        Insert: PrayerRequestInsert;
        Update: Partial<PrayerRequestInsert>;
      };
      // Otros tipos de tablas se pueden agregar aquí
    };
  };
}
