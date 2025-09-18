'use client'

import { useState, useEffect, useCallback } from 'react'
import { toast } from 'sonner'
import { useSupabase } from '@/components/auth/supabase-provider'

interface Profile {
    username: string
    nombre: string
    apellido: string
    cumpleanos: string
    rol_trabajo: string
    codigo_facilito: string
    linkedin: string
    github: string
    sitio_web: string
    descripcion: string
    tecnologias: string[]
}

export default function EdicionProfile() {
    const { supabase, session } = useSupabase()
    const [loading, setLoading] = useState(true)
    const [profile, setProfile] = useState<Profile>({
        username: '',
        nombre: '',
        apellido: '',
        cumpleanos: '',
        rol_trabajo: '',
        codigo_facilito: '',
        linkedin: '',
        github: '',
        sitio_web: '',
        descripcion: '',
        tecnologias: [],
    })

    const getProfile = useCallback(async () => {
        try {
            setLoading(true)
            if (!session?.user) throw new Error('No user')

            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .single()

            if (error) throw error
            if (data) setProfile(data)
        } catch (error) {
            if (error instanceof Error) {
                toast.error('Error al cargar el perfil: ' + error.message)
            } else {
                toast.error('Error al cargar el perfil')
            }
        } finally {
            setLoading(false)
        }
    }, [session, supabase])

    useEffect(() => {
        getProfile()
    }, [session, getProfile])

    async function updateProfile() {
        try {
            setLoading(true)
            if (!session?.user) throw new Error('No user')

            const { error } = await supabase
                .from('profiles')
                .update(profile)
                .eq('id', session.user.id)

            if (error) throw error
            toast.success('Perfil actualizado correctamente')
        } catch (error) {
            if (error instanceof Error) {
                toast.error('Error al actualizar el perfil: ' + error.message)
            } else {
                toast.error('Error al actualizar el perfil')
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Editar Perfil</h1>
            
            <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium">Username</label>
                        <input
                            type="text"
                            value={profile.username}
                            onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium">Nombre</label>
                        <input
                            type="text"
                            value={profile.nombre}
                            onChange={(e) => setProfile({ ...profile, nombre: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Apellido</label>
                        <input
                            type="text"
                            value={profile.apellido}
                            onChange={(e) => setProfile({ ...profile, apellido: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Cumpleaños</label>
                        <input
                            type="date"
                            value={profile.cumpleanos}
                            onChange={(e) => setProfile({ ...profile, cumpleanos: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Rol de trabajo</label>
                        <input
                            type="text"
                            value={profile.rol_trabajo}
                            onChange={(e) => setProfile({ ...profile, rol_trabajo: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium">Redes profesionales</label>
                        <input
                            type="text"
                            placeholder="Código Facilito"
                            value={profile.codigo_facilito}
                            onChange={(e) => setProfile({ ...profile, codigo_facilito: e.target.value })}
                            className="block w-full rounded-md border-gray-300 shadow-sm"
                        />
                        <input
                            type="text"
                            placeholder="LinkedIn"
                            value={profile.linkedin}
                            onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                            className="block w-full rounded-md border-gray-300 shadow-sm"
                        />
                        <input
                            type="text"
                            placeholder="GitHub"
                            value={profile.github}
                            onChange={(e) => setProfile({ ...profile, github: e.target.value })}
                            className="block w-full rounded-md border-gray-300 shadow-sm"
                        />
                        <input
                            type="text"
                            placeholder="Sitio web personal"
                            value={profile.sitio_web}
                            onChange={(e) => setProfile({ ...profile, sitio_web: e.target.value })}
                            className="block w-full rounded-md border-gray-300 shadow-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Descripción</label>
                        <textarea
                            value={profile.descripcion}
                            onChange={(e) => setProfile({ ...profile, descripcion: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            rows={4}
                        />
                    </div>
                </div>

                <div className="flex justify-end space-x-4">
                    <button
                        onClick={() => getProfile()}
                        className="px-4 py-2 bg-gray-200 rounded-md"
                        disabled={loading}
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={() => updateProfile()}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md"
                        disabled={loading}
                    >
                        {loading ? 'Guardando...' : 'Guardar cambios'}
                    </button>
                </div>
            </div>
        </div>
    )
}