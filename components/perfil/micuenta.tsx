import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { supabase } from '@/lib/supabase-client'; // Make sure you have this configured
import { User, Key, Shield } from 'lucide-react';
import { toast } from 'sonner'; // Import directly from sonner package

interface MiCuentaProps {
    email: string;
    fechaCreacion: string;
}

const MiCuenta: React.FC = () => {
    const [userData, setUserData] = useState<MiCuentaProps | null>(null);

    useEffect(() => {
        getUserData();
    }, []);

    const getUserData = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setUserData({
                    email: user.email || '',
                    fechaCreacion: new Date(user.created_at).toLocaleDateString()
                });
            }
        } catch {
            toast.error("No se pudo obtener la información del usuario", {
                description: "Error"
            });
        }
    };

    const handleDeleteAccount = async () => {
        try {
            const { error } = await supabase.auth.admin.deleteUser(
                (await supabase.auth.getUser()).data.user?.id || ''
            );
            if (error) throw error;
            
            toast.success("Cuenta eliminada", {
                description: "Tu cuenta ha sido eliminada exitosamente"
            });
        } catch {
            toast.error("No se pudo eliminar la cuenta", {
                description: "Error"
            });
        }
    };

    if (!userData) return null;

    return (
        <div className="w-full max-w-3xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Mi cuenta</h1>
            
            <div className="bg-white rounded-lg shadow p-6 space-y-6">
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                        Esta cuenta fue creada el {userData?.fechaCreacion}
                    </span>
                </div>

                <div className="space-y-2">
                    <p className="text-gray-600">
                        Actualmente estás ingresando con tu cuenta de Google
                    </p>

                    <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                        <div className="flex items-center gap-3">
                            <User className="text-gray-500 w-5 h-5" />
                            <span className="text-gray-600">{userData?.email}</span>
                        </div>
                        <Button
                            variant="outline"
                            className="w-full sm:w-auto"
                            onClick={() => console.log('Cambiar correo')}
                        >
                            Cambiar correo
                        </Button>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                        <div className="flex items-center gap-3">
                            <Key className="text-gray-500 w-5 h-5" />
                            <span className="text-gray-600">********</span>
                        </div>
                        <Button
                            variant="outline"
                            className="w-full sm:w-auto"
                            onClick={() => console.log('Cambiar contraseña')}
                        >
                            Cambiar contraseña
                        </Button>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                        <div className="flex items-center gap-3">
                            <Shield className="text-gray-500 w-5 h-5" />
                            <span className="text-gray-600">Cuenta Activa</span>
                        </div>
                    </div>
                </div>

                <Button
                    variant="destructive"
                    className="w-full sm:w-auto mt-6"
                    onClick={handleDeleteAccount}
                >
                    Eliminar cuenta
                </Button>
            </div>
        </div>
    );
};

export default MiCuenta;