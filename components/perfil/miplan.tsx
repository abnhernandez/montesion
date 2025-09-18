import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { useUser } from '@supabase/auth-helpers-react';
import { toast } from 'react-hot-toast';

interface ReferredUser {
    id: string;
    email: string;
    created_at: string;
}

interface PlanData {
    plan_name: string;
    expiry_date: string;
    referral_code: string;
    referred_users: ReferredUser[];
}

const MiPlan: React.FC = () => {
    const [planData, setPlanData] = useState<PlanData | null>(null);
    const [loading, setLoading] = useState(true);
    const user = useUser();

    useEffect(() => {
        const fetchPlanData = async () => {
            try {
                if (!user?.id) return;

                const { data } = await supabase
                    .from('user_plans')
                    .select(`
                        plan_name,
                        expiry_date,
                        referral_code,
                        referred_users
                    `)
                    .eq('user_id', user.id)
                    .single();

                setPlanData(data);
            } catch {
                toast.error('Error al cargar los datos del plan');
            } finally {
                setLoading(false);
            }
        };

        fetchPlanData();
    }, [user]);

    const copyReferralCode = async () => {
        try {
            await navigator.clipboard.writeText(planData?.referral_code || '');
            toast.success('Código copiado al portapapeles');
        } catch {
            toast.error('Error al copiar el código');
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[200px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
            </div>
        );
    }

    if (!planData) {
        return (
            <div className="p-4 text-center">
                <p className="text-gray-600">No se encontró información del plan</p>
                <Link href="/planes" className="text-blue-500 hover:text-blue-600 mt-2 inline-block">
                    Ver planes disponibles
                </Link>
            </div>
        );
    }

    return (
        <div className="p-4 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Mi Plan</h1>
            
            <div className="bg-white rounded-lg shadow p-6 mb-8">
                <div className="flex items-center gap-2 mb-4">
                    <h2 className="text-xl font-semibold">Plan {planData.plan_name}</h2>
                    <svg 
                        className="w-6 h-6 text-green-500" 
                        fill="none" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                        <path d="M5 13l4 4L19 7"></path>
                    </svg>
                </div>

                <div className="space-y-3">
                    <p className="text-gray-700">
                        Tu acceso Premium MAX vence el{' '}
                        <span className="font-medium text-blue-600">
                            {formatDate(planData.expiry_date)}
                        </span>
                    </p>
                    <p className="text-gray-700">
                        Tu acceso Premium a cursos termina el{' '}
                        <span className="font-medium text-blue-600">
                            {formatDate(planData.expiry_date)}
                        </span>
                    </p>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
                <div className="mb-6">
                    <p className="text-gray-700 mb-2">Este es tu código de referido:</p>
                    <div className="flex items-center gap-2 bg-gray-50 p-3 rounded">
                        <input 
                            type="text" 
                            readOnly 
                            value={planData.referral_code}
                            className="flex-1 bg-transparent outline-none"
                        />
                        <button 
                            onClick={copyReferralCode}
                            className="p-2 hover:bg-gray-100 rounded transition-colors"
                            aria-label="Copiar código de referido"
                        >
                            <svg 
                                className="w-5 h-5" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth="2" 
                                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" 
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-3">Usuarios referidos</h3>
                    {planData.referred_users?.length > 0 ? (
                        <ul className="space-y-2">
                            {planData.referred_users.map((referredUser) => (
                                <li 
                                    key={referredUser.id}
                                    className="p-3 bg-gray-50 rounded-lg flex items-center justify-between"
                                >
                                    <span className="text-gray-700">{referredUser.email}</span>
                                    <span className="text-sm text-gray-500">
                                        {formatDate(referredUser.created_at)}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-700">
                            Aún no has completado ninguna referencia.
                            <Link href="/referir" className="text-blue-500 hover:text-blue-600 ml-2">
                                Invitar amigos
                            </Link>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MiPlan;