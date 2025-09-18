import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase-client'; // Asegúrate de tener configurado el cliente de Supabase

interface PreferenciasNotificacionesProps {
    onSave?: (preferences: PreferenciasState) => void;
    userId: string; // Añadimos el userId para identificar al usuario
}

interface PreferenciasState {
    noRecibirCorreos: boolean;
    novedadesOfertas: boolean;
    actualizacionesSemanales: boolean;
    eventosEnVivo: boolean;
    recordatoriosClases: boolean;
    temaClaro: boolean;
    reproduccionAutomatica: boolean;
    modoOscuro: boolean;
    zonaHoraria: string;
}

export default function PreferenciasNotificaciones({ onSave, userId }: PreferenciasNotificacionesProps) {
    const [preferences, setPreferences] = useState<PreferenciasState>({
        noRecibirCorreos: false,
        novedadesOfertas: false,
        actualizacionesSemanales: false,
        eventosEnVivo: false,
        recordatoriosClases: false,
        temaClaro: false,
        reproduccionAutomatica: false,
        modoOscuro: false,
        zonaHoraria: 'America/Mexico_City',
    });

    // Cargar preferencias al montar el componente

    useEffect(() => {
        const loadPreferences = async () => {
            try {
                const { data, error } = await supabase
                    .from('preferencias_usuarios')
                    .select('*')
                    .eq('user_id', userId)
                    .single();

                if (error) throw error;

                if (data) {
                    setPreferences(data);
                }
            } catch (error) {
                console.error('Error al cargar preferencias:', error);
            }
        };
        loadPreferences();
    }, [userId]);

    const handleChange = (field: keyof PreferenciasState) => {
        setPreferences((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    const handleSave = async () => {
        try {
            const { error } = await supabase
                .from('preferencias_usuarios')
                .upsert({
                    user_id: userId,
                    ...preferences
                });

            if (error) throw error;

            onSave?.(preferences);
            alert('Preferencias guardadas exitosamente');
        } catch (error) {
            console.error('Error al guardar preferencias:', error);
            alert('Error al guardar las preferencias');
        }
    };

    return (
        <div className="space-y-4">
            <div>
                <h2 className="text-lg font-semibold">Preferencias de Notificaciones</h2>
                <div className="mt-4 space-y-2">
                    {Object.entries(preferences).map(([key, value]) => (
                        key !== 'zonaHoraria' && (
                            <div key={key} className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={value}
                                    onChange={() => handleChange(key as keyof PreferenciasState)}
                                    className="mr-2"
                                />
                                <label>{key}</label>
                            </div>
                        )
                    ))}
                </div>
            </div>
            <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-500 text-white rounded"
            >
                Guardar Preferencias
            </button>
        </div>
    );
}
