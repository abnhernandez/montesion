import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Image from 'next/image';
import Link from 'next/link';

interface UserProfile {
    avatar_url: string;
    full_name: string;
    points: number;
}

export default function ProfilePresentation() {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProfile() {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                
                if (user) {
                    const { data, error } = await supabase
                        .from('profiles')
                        .select('avatar_url, full_name, points')
                        .eq('id', user.id)
                        .single();

                    if (error) throw error;
                    setProfile(data);
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchProfile();
    }, []);

    if (loading) return <div>Cargando...</div>;
    if (!profile) return <div>No se encontró el perfil</div>;

    return (
        <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow">
            <div className="relative w-32 h-32">
                <Image
                    src={profile.avatar_url || '/default-avatar.png'}
                    alt="Perfil"
                    className="rounded-full"
                    width={128}
                    height={128}
                />
                <div className="absolute bottom-0 right-0 bg-green-500 rounded-full p-2">
                    <svg 
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" 
                        />
                    </svg>
                </div>
            </div>

            <h1 className="text-xl font-bold mt-4">{profile.full_name}</h1>
            <p className="text-green-500">{profile.points} Puntos</p>

            <nav className="w-full mt-6 space-y-2">
                <Link href="/perfil/editar" className="flex items-center p-3 hover:bg-gray-50">
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    Editar Perfil
                </Link>

                <Link href="/mi-cuenta" className="flex items-center p-3 hover:bg-gray-50">
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Mi cuenta
                </Link>

                <Link href="/preferencias-correo" className="flex items-center p-3 hover:bg-gray-50">
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Preferencias de correo
                </Link>

                <Link href="/mi-plan" className="flex items-center p-3 hover:bg-gray-50">
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    Mi plan
                </Link>

                <Link href="/pagos" className="flex items-center p-3 hover:bg-gray-50">
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    Pagos
                </Link>
            </nav>
        </div>
    );
}