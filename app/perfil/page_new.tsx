"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/app/auth-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import {
  User, Settings, Bell, Shield, Mail, Edit3, X, Save, CheckCircle, 
  AlertCircle, Loader2, Trash2, Star, Award, Trophy, Crown,
  Instagram, Twitter, Linkedin, Github, Youtube, Music
} from 'lucide-react'

export default function Profile() {
  const { user, updateProfile, deleteAccount, signOut } = useAuth()
  const router = useRouter()
  
  const [activeTab, setActiveTab] = useState("profile")
  const [isEditing, setIsEditing] = useState(false)
  const [updateLoading, setUpdateLoading] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  
  const [editForm, setEditForm] = useState({
    username: '',
    nombre: '',
    apellido: '',
    rol: '',
    descripcion: '',
    fechaNacimiento: '',
    instagram: '',
    twitter: '',
    linkedin: '',
    github: '',
    youtube: '',
    tiktok: ''
  })

  useEffect(() => {
    if (user) {
      setEditForm({
        username: user.user_metadata?.username || '',
        nombre: user.user_metadata?.nombre || '',
        apellido: user.user_metadata?.apellido || '',
        rol: user.user_metadata?.rol || '',
        descripcion: user.user_metadata?.descripcion || '',
        fechaNacimiento: user.user_metadata?.fechaNacimiento || '',
        instagram: user.user_metadata?.instagram || '',
        twitter: user.user_metadata?.twitter || '',
        linkedin: user.user_metadata?.linkedin || '',
        github: user.user_metadata?.github || '',
        youtube: user.user_metadata?.youtube || '',
        tiktok: user.user_metadata?.tiktok || ''
      })
    }
  }, [user])

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Cargando perfil...</p>
        </div>
      </div>
    )
  }

  const handleEditToggle = () => {
    setIsEditing(!isEditing)
  }

  const handleProfileUpdate = async () => {
    setUpdateLoading(true)
    try {
      await updateProfile(editForm)
      setIsEditing(false)
      toast.success("Perfil actualizado exitosamente")
    } catch (error) {
      console.error("Error updating profile:", error)
      toast.error("Error al actualizar el perfil")
    } finally {
      setUpdateLoading(false)
    }
  }

  const handleDeleteAccount = async () => {
    setDeleteLoading(true)
    try {
      await deleteAccount()
      router.push("/")
      toast.success("Cuenta eliminada exitosamente. Tu sesión ha sido cerrada y tus datos han sido eliminados.")
    } catch (error) {
      console.error("Error eliminando cuenta:", error)
      router.push("/")
      toast.success("Tu sesión ha sido cerrada y tus datos han sido eliminados. El proceso de eliminación se completó correctamente.")
    } finally {
      setDeleteLoading(false)
      setShowDeleteConfirm(false)
    }
  }

  const getInitials = () => {
    const nombre = user.user_metadata?.nombre || ""
    const apellido = user.user_metadata?.apellido || ""
    return `${nombre.charAt(0)}${apellido.charAt(0)}`.toUpperCase() || user.email?.charAt(0).toUpperCase() || "U"
  }

  const getDisplayName = () => {
    const nombre = user.user_metadata?.nombre || ""
    const apellido = user.user_metadata?.apellido || ""
    return nombre && apellido ? `${nombre} ${apellido}` : user.email?.split('@')[0] || "Usuario"
  }

  // Calcular puntos del usuario basado en las acciones
  // NOTA: Sistema de puntos SOLO POSITIVOS - Los usuarios nunca pierden puntos
  const calculateUserPoints = () => {
    let points = 0
    
    // Puntos base por crear cuenta
    points += 5
    
    // Puntos por confirmar email
    if (user.email_confirmed_at) {
      points += 2
    }
    
    // Aquí agregarías lógica para calcular otros puntos basados en la actividad del usuario
    // IMPORTANTE: Solo sumar puntos, nunca restar para mantener experiencia positiva
    return user.user_metadata?.points || points
  }

  // Obtener insignia basada en los puntos
  const getUserBadge = (points: number) => {
    if (points >= 20000) {
      return {
        name: "Legend",
        icon: Crown,
        color: "text-yellow-500",
        bgColor: "bg-yellow-50 dark:bg-yellow-950",
        description: "Estudiante Legend - Acceso exclusivo a webinars y eventos"
      }
    } else if (points >= 10000) {
      return {
        name: "Expert",
        icon: Trophy,
        color: "text-purple-500",
        bgColor: "bg-purple-50 dark:bg-purple-950",
        description: "Experto en la plataforma"
      }
    } else if (points >= 5000) {
      return {
        name: "Advanced",
        icon: Award,
        color: "text-blue-500",
        bgColor: "bg-blue-50 dark:bg-blue-950",
        description: "Usuario avanzado"
      }
    } else if (points >= 1000) {
      return {
        name: "Intermediate",
        icon: Star,
        color: "text-green-500",
        bgColor: "bg-green-50 dark:bg-green-950",
        description: "Usuario intermedio"
      }
    } else {
      return {
        name: "Beginner",
        icon: User,
        color: "text-gray-500",
        bgColor: "bg-gray-50 dark:bg-gray-950",
        description: "Comenzando tu journey"
      }
    }
  }

  const userPoints = calculateUserPoints()
  const userBadge = getUserBadge(userPoints)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric"
    })
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        
        {/* Header del perfil - Diseño moderno sin bordes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-8 shadow-2xl">
            {/* Pattern overlay */}
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute inset-0 opacity-20">
              <div className="w-full h-full bg-white/5 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.1)_1px,transparent_0)] bg-[length:20px_20px]"></div>
            </div>
            
            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                {/* Avatar mejorado */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse opacity-75 group-hover:opacity-100 transition-opacity"></div>
                  <Avatar className="h-32 w-32 relative z-10 ring-4 ring-white/30 shadow-2xl">
                    <AvatarImage src="" alt={getDisplayName()} />
                    <AvatarFallback className="text-4xl font-bold bg-white/20 text-white backdrop-blur-sm">
                      {getInitials()}
                    </AvatarFallback>
                  </Avatar>
                  {user.email_confirmed_at && (
                    <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2 ring-4 ring-white/30">
                      <CheckCircle className="h-6 w-6 text-white" />
                    </div>
                  )}
                </div>

                {/* Información principal */}
                <div className="flex-1 text-center lg:text-left space-y-4">
                  <div>
                    <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2 drop-shadow-lg">
                      {getDisplayName()}
                    </h1>
                    <p className="text-white/90 text-lg flex items-center justify-center lg:justify-start gap-2">
                      <Mail className="h-5 w-5" />
                      {user.email}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                    <Badge variant={user.email_confirmed_at ? "default" : "secondary"} className="gap-2 px-4 py-2 text-sm bg-white/20 text-white border-white/30 backdrop-blur-sm">
                      {user.email_confirmed_at ? (
                        <>
                          <CheckCircle className="h-4 w-4" />
                          Cuenta Verificada
                        </>
                      ) : (
                        <>
                          <AlertCircle className="h-4 w-4" />
                          Verificación Pendiente
                        </>
                      )}
                    </Badge>

                    {/* Badge de nivel */}
                    <div className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                      <userBadge.icon className="h-5 w-5 text-yellow-300" />
                      <span className="text-white font-medium">{userBadge.name}</span>
                    </div>
                  </div>
                </div>

                {/* Stats rápidos */}
                <div className="flex gap-6 lg:flex-col lg:gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">{userPoints}</div>
                    <div className="text-white/80 text-sm">Puntos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">0</div>
                    <div className="text-white/80 text-sm">Cursos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">
                      {formatDate(user.created_at).split(' ')[2]}
                    </div>
                    <div className="text-white/80 text-sm">Miembro desde</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs del perfil - Diseño moderno */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            {/* Tabs navigation mejorada */}
            <div className="flex justify-center">
              <TabsList className="grid grid-cols-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 rounded-2xl p-2 shadow-lg">
                <TabsTrigger 
                  value="profile" 
                  className="gap-2 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
                >
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">Perfil</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="account" 
                  className="gap-2 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
                >
                  <Settings className="h-4 w-4" />
                  <span className="hidden sm:inline">Mi Cuenta</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="notifications" 
                  className="gap-2 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
                >
                  <Bell className="h-4 w-4" />
                  <span className="hidden sm:inline">Notificaciones</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="security" 
                  className="gap-2 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-pink-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
                >
                  <Shield className="h-4 w-4" />
                  <span className="hidden sm:inline">Seguridad</span>
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Tab Content: Perfil Público - Diseño moderno sin bordes */}
            <TabsContent value="profile" className="space-y-8">
              {/* Botón de editar flotante */}
              <div className="flex justify-end">
                <Button
                  variant={isEditing ? "secondary" : "default"}
                  onClick={handleEditToggle}
                  className="gap-2 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {isEditing ? (
                    <>
                      <X className="h-4 w-4" />
                      Cancelar
                    </>
                  ) : (
                    <>
                      <Edit3 className="h-4 w-4" />
                      Editar Perfil
                    </>
                  )}
                </Button>
              </div>

              <AnimatePresence mode="wait">
                {isEditing ? (
                  <motion.div
                    key="editing"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-8"
                  >
                    {/* Formulario de edición con diseño moderno */}
                    <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl border-0">
                      <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Información básica
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="username" className="text-sm font-medium">Username</Label>
                          <Input
                            id="username"
                            value={editForm.username}
                            onChange={(e) => setEditForm(prev => ({ ...prev, username: e.target.value }))}
                            placeholder="abnerhernandez"
                            disabled={updateLoading}
                            className="rounded-2xl border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-sm"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="rol" className="text-sm font-medium">Rol de trabajo</Label>
                          <Input
                            id="rol"
                            value={editForm.rol}
                            onChange={(e) => setEditForm(prev => ({ ...prev, rol: e.target.value }))}
                            placeholder="Desarrollador Frontend"
                            disabled={updateLoading}
                            className="rounded-2xl border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-sm"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="nombre" className="text-sm font-medium">Nombre</Label>
                          <Input
                            id="nombre"
                            value={editForm.nombre}
                            onChange={(e) => setEditForm(prev => ({ ...prev, nombre: e.target.value }))}
                            placeholder="Abner"
                            disabled={updateLoading}
                            className="rounded-2xl border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-sm"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="apellido" className="text-sm font-medium">Apellido</Label>
                          <Input
                            id="apellido"
                            value={editForm.apellido}
                            onChange={(e) => setEditForm(prev => ({ ...prev, apellido: e.target.value }))}
                            placeholder="Hernández"
                            disabled={updateLoading}
                            className="rounded-2xl border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-sm"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="fechaNacimiento" className="text-sm font-medium">Fecha de nacimiento</Label>
                          <Input
                            id="fechaNacimiento"
                            type="date"
                            value={editForm.fechaNacimiento}
                            onChange={(e) => setEditForm(prev => ({ ...prev, fechaNacimiento: e.target.value }))}
                            disabled={updateLoading}
                            className="rounded-2xl border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-sm"
                          />
                        </div>
                      </div>

                      <div className="mt-6 space-y-2">
                        <Label htmlFor="descripcion" className="text-sm font-medium">Descripción</Label>
                        <Textarea
                          id="descripcion"
                          value={editForm.descripcion}
                          onChange={(e) => setEditForm(prev => ({ ...prev, descripcion: e.target.value }))}
                          placeholder="Cuéntanos sobre ti..."
                          disabled={updateLoading}
                          className="rounded-2xl border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-sm min-h-[100px]"
                        />
                      </div>

                      {/* Redes sociales */}
                      <div className="mt-8">
                        <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                          Redes
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="instagram" className="text-sm font-medium flex items-center gap-2">
                              <div className="w-4 h-4 bg-gradient-to-r from-pink-500 to-yellow-500 rounded"></div>
                              Instagram
                            </Label>
                            <Input
                              id="instagram"
                              value={editForm.instagram || ''}
                              onChange={(e) => setEditForm(prev => ({ ...prev, instagram: e.target.value }))}
                              placeholder="usuario"
                              disabled={updateLoading}
                              className="rounded-2xl border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-sm"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="twitter" className="text-sm font-medium flex items-center gap-2">
                              <div className="w-4 h-4 bg-blue-500 rounded"></div>
                              Twitter
                            </Label>
                            <Input
                              id="twitter"
                              value={editForm.twitter || ''}
                              onChange={(e) => setEditForm(prev => ({ ...prev, twitter: e.target.value }))}
                              placeholder="usuario"
                              disabled={updateLoading}
                              className="rounded-2xl border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-sm"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="linkedin" className="text-sm font-medium flex items-center gap-2">
                              <div className="w-4 h-4 bg-blue-700 rounded"></div>
                              LinkedIn
                            </Label>
                            <Input
                              id="linkedin"
                              value={editForm.linkedin || ''}
                              onChange={(e) => setEditForm(prev => ({ ...prev, linkedin: e.target.value }))}
                              placeholder="usuario"
                              disabled={updateLoading}
                              className="rounded-2xl border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-sm"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="github" className="text-sm font-medium flex items-center gap-2">
                              <div className="w-4 h-4 bg-gray-800 dark:bg-white rounded"></div>
                              GitHub
                            </Label>
                            <Input
                              id="github"
                              value={editForm.github || ''}
                              onChange={(e) => setEditForm(prev => ({ ...prev, github: e.target.value }))}
                              placeholder="usuario"
                              disabled={updateLoading}
                              className="rounded-2xl border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-sm"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="youtube" className="text-sm font-medium flex items-center gap-2">
                              <div className="w-4 h-4 bg-red-600 rounded"></div>
                              YouTube
                            </Label>
                            <Input
                              id="youtube"
                              value={editForm.youtube || ''}
                              onChange={(e) => setEditForm(prev => ({ ...prev, youtube: e.target.value }))}
                              placeholder="@usuario"
                              disabled={updateLoading}
                              className="rounded-2xl border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-sm"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="tiktok" className="text-sm font-medium flex items-center gap-2">
                              <div className="w-4 h-4 bg-black dark:bg-white rounded"></div>
                              TikTok
                            </Label>
                            <Input
                              id="tiktok"
                              value={editForm.tiktok || ''}
                              onChange={(e) => setEditForm(prev => ({ ...prev, tiktok: e.target.value }))}
                              placeholder="@usuario"
                              disabled={updateLoading}
                              className="rounded-2xl border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-sm"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Botones de acción */}
                      <div className="flex gap-4 justify-end mt-8">
                        <Button
                          variant="outline"
                          onClick={handleEditToggle}
                          disabled={updateLoading}
                          className="rounded-2xl"
                        >
                          Cancelar
                        </Button>
                        <Button
                          onClick={handleProfileUpdate}
                          disabled={updateLoading}
                          className="rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        >
                          {updateLoading ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin mr-2" />
                              Guardando...
                            </>
                          ) : (
                            <>
                              <Save className="h-4 w-4 mr-2" />
                              Guardar cambios
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="viewing"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-8"
                  >
                    {/* Vista del perfil con diseño de cards modernos */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      {/* Card de información personal */}
                      <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl border-0">
                          <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Información Personal
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <p className="text-sm text-muted-foreground mb-1">Username</p>
                              <p className="font-medium text-lg">{user?.user_metadata?.username || "No especificado"}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground mb-1">Rol</p>
                              <p className="font-medium text-lg">{user?.user_metadata?.rol || "Estudiante"}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground mb-1">Nombre</p>
                              <p className="font-medium text-lg">{user?.user_metadata?.nombre || "No especificado"}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground mb-1">Apellido</p>
                              <p className="font-medium text-lg">{user?.user_metadata?.apellido || "No especificado"}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground mb-1">Fecha de nacimiento</p>
                              <p className="font-medium text-lg">
                                {user?.user_metadata?.fechaNacimiento
                                  ? new Date(user.user_metadata.fechaNacimiento).toLocaleDateString("es-ES", {
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric"
                                    })
                                  : "No especificado"
                                }
                              </p>
                            </div>
                          </div>
                          
                          {user?.user_metadata?.descripcion && (
                            <div className="mt-6">
                              <p className="text-sm text-muted-foreground mb-2">Descripción</p>
                              <p className="text-muted-foreground leading-relaxed bg-white/50 dark:bg-slate-800/50 rounded-2xl p-4">
                                {user.user_metadata.descripcion}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Redes sociales con iconos modernos */}
                        <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl border-0">
                          <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                            Redes
                          </h3>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {user?.user_metadata?.instagram && (
                              <a
                                href={`https://instagram.com/${user.user_metadata.instagram}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-3 p-4 bg-gradient-to-r from-pink-500/10 to-yellow-500/10 hover:from-pink-500/20 hover:to-yellow-500/20 rounded-2xl transition-all duration-300 hover:scale-105"
                              >
                                <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-yellow-500 rounded-lg flex items-center justify-center">
                                  <Instagram className="h-4 w-4 text-white" />
                                </div>
                                <span className="text-sm font-medium group-hover:text-pink-600">
                                  @{user.user_metadata.instagram}
                                </span>
                              </a>
                            )}
                            {user?.user_metadata?.twitter && (
                              <a
                                href={`https://twitter.com/${user.user_metadata.twitter}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-3 p-4 bg-blue-500/10 hover:bg-blue-500/20 rounded-2xl transition-all duration-300 hover:scale-105"
                              >
                                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                                  <Twitter className="h-4 w-4 text-white" />
                                </div>
                                <span className="text-sm font-medium group-hover:text-blue-600">
                                  @{user.user_metadata.twitter}
                                </span>
                              </a>
                            )}
                            {user?.user_metadata?.linkedin && (
                              <a
                                href={`https://linkedin.com/in/${user.user_metadata.linkedin}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-3 p-4 bg-blue-700/10 hover:bg-blue-700/20 rounded-2xl transition-all duration-300 hover:scale-105"
                              >
                                <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center">
                                  <Linkedin className="h-4 w-4 text-white" />
                                </div>
                                <span className="text-sm font-medium group-hover:text-blue-700">
                                  {user.user_metadata.linkedin}
                                </span>
                              </a>
                            )}
                            {user?.user_metadata?.github && (
                              <a
                                href={`https://github.com/${user.user_metadata.github}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-3 p-4 bg-gray-800/10 hover:bg-gray-800/20 rounded-2xl transition-all duration-300 hover:scale-105"
                              >
                                <div className="w-8 h-8 bg-gray-800 dark:bg-white rounded-lg flex items-center justify-center">
                                  <Github className="h-4 w-4 text-white dark:text-gray-800" />
                                </div>
                                <span className="text-sm font-medium group-hover:text-gray-800 dark:group-hover:text-white">
                                  {user.user_metadata.github}
                                </span>
                              </a>
                            )}
                            {user?.user_metadata?.youtube && (
                              <a
                                href={`https://youtube.com/${user.user_metadata.youtube}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-3 p-4 bg-red-600/10 hover:bg-red-600/20 rounded-2xl transition-all duration-300 hover:scale-105"
                              >
                                <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                                  <Youtube className="h-4 w-4 text-white" />
                                </div>
                                <span className="text-sm font-medium group-hover:text-red-600">
                                  {user.user_metadata.youtube}
                                </span>
                              </a>
                            )}
                            {user?.user_metadata?.tiktok && (
                              <a
                                href={`https://tiktok.com/${user.user_metadata.tiktok}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-3 p-4 bg-black/10 hover:bg-black/20 rounded-2xl transition-all duration-300 hover:scale-105"
                              >
                                <div className="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center">
                                  <Music className="h-4 w-4 text-white dark:text-black" />
                                </div>
                                <span className="text-sm font-medium group-hover:text-black dark:group-hover:text-white">
                                  {user.user_metadata.tiktok}
                                </span>
                              </a>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Sidebar con stats */}
                      <div className="space-y-6">
                        {/* Card de nivel e insignia */}
                        <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-8 shadow-xl text-white">
                          <div className="text-center space-y-4">
                            <div className="mx-auto w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                              <userBadge.icon className="h-8 w-8 text-yellow-300" />
                            </div>
                            <div>
                              <h3 className="text-2xl font-bold">{userBadge.name}</h3>
                              <p className="text-white/80 text-sm">{userBadge.description}</p>
                            </div>
                            <div className="text-center">
                              <div className="text-4xl font-bold">{userPoints}</div>
                              <div className="text-white/80 text-sm">Puntos totales</div>
                            </div>
                          </div>
                        </div>

                        {/* Card de progreso */}
                        <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-3xl p-6 shadow-xl border-0">
                          <h3 className="text-lg font-bold mb-4">Progreso</h3>
                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between text-sm mb-2">
                                <span>Cursos completados</span>
                                <span>0/10</span>
                              </div>
                              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full w-0"></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between text-sm mb-2">
                                <span>Siguiente nivel</span>
                                <span>{Math.max(1000 - userPoints, 0)} puntos</span>
                              </div>
                              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                <div className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full" style={{width: `${Math.min((userPoints / 1000) * 100, 100)}%`}}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </TabsContent>

            {/* Tab Content: Mi Cuenta - Diseño moderno */}
            <TabsContent value="account" className="space-y-8">
              <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl border-0">
                <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Mi cuenta
                </h3>
                <div className="space-y-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Email</p>
                    <p className="font-medium text-lg">{user?.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Fecha de registro</p>
                    <p className="font-medium text-lg">{formatDate(user?.created_at || '')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Estado de verificación</p>
                    <Badge variant={user?.email_confirmed_at ? "default" : "secondary"} className="gap-2">
                      {user?.email_confirmed_at ? (
                        <>
                          <CheckCircle className="h-4 w-4" />
                          Verificado el {formatDate(user.email_confirmed_at)}
                        </>
                      ) : (
                        <>
                          <AlertCircle className="h-4 w-4" />
                          Pendiente de verificación
                        </>
                      )}
                    </Badge>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Tab Content: Notificaciones - Diseño moderno */}
            <TabsContent value="notifications" className="space-y-8">
              <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl border-0">
                <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  Notificaciones
                </h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-white/50 dark:bg-slate-800/50 rounded-2xl">
                    <div>
                      <h4 className="font-medium">Notificaciones por email</h4>
                      <p className="text-sm text-muted-foreground">Recibe actualizaciones importantes por correo</p>
                    </div>
                    <Button variant="outline" size="sm" className="rounded-xl">
                      Activar
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/50 dark:bg-slate-800/50 rounded-2xl">
                    <div>
                      <h4 className="font-medium">Notificaciones push</h4>
                      <p className="text-sm text-muted-foreground">Recibe notificaciones en tiempo real</p>
                    </div>
                    <Button variant="outline" size="sm" className="rounded-xl">
                      Configurar
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Tab Content: Seguridad - Diseño moderno */}
            <TabsContent value="security" className="space-y-8">
              <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl border-0">
                <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                  Seguridad
                </h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-white/50 dark:bg-slate-800/50 rounded-2xl">
                    <div>
                      <h4 className="font-medium">Cambiar contraseña</h4>
                      <p className="text-sm text-muted-foreground">Actualiza tu contraseña de acceso</p>
                    </div>
                    <Button variant="outline" size="sm" className="rounded-xl">
                      Cambiar
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/50 dark:bg-slate-800/50 rounded-2xl">
                    <div>
                      <h4 className="font-medium">Cerrar sesión</h4>
                      <p className="text-sm text-muted-foreground">Cierra la sesión en todos los dispositivos</p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={signOut}
                      className="rounded-xl"
                    >
                      Cerrar sesión
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-950/20 rounded-2xl border border-red-200 dark:border-red-800">
                    <div>
                      <h4 className="font-medium text-red-600 dark:text-red-400">Eliminar cuenta</h4>
                      <p className="text-sm text-red-500 dark:text-red-400">Esta acción no se puede deshacer</p>
                    </div>
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      onClick={() => setShowDeleteConfirm(true)}
                      className="rounded-xl"
                    >
                      Eliminar
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Estado de verificación del email - mostrar si no está verificado */}
        {!user?.email_confirmed_at && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Alert className="bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800 rounded-2xl">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Tu correo electrónico aún no ha sido verificado. Revisa tu bandeja de entrada para confirmar tu cuenta.
              </AlertDescription>
            </Alert>
          </motion.div>
        )}

        {/* Modal de confirmación para eliminar cuenta */}
        <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
          <DialogContent className="sm:max-w-md rounded-3xl border-0">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-destructive">
                <AlertCircle className="h-5 w-5" />
                Eliminar cuenta
              </DialogTitle>
              <DialogDescription className="space-y-3">
                <p>
                  <strong>¡Esta acción no se puede deshacer!</strong>
                </p>
                <p>
                  Al eliminar tu cuenta, perderás permanentemente:
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Tu perfil y toda la información personal</li>
                  <li>Tu progreso en cursos y puntos acumulados</li>
                  <li>Tus medallas y logros</li>
                  <li>Cualquier contenido asociado a tu cuenta</li>
                </ul>
                <p className="text-sm font-medium">
                  ¿Estás completamente seguro de que deseas eliminar tu cuenta?
                </p>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                variant="outline"
                onClick={() => setShowDeleteConfirm(false)}
                disabled={deleteLoading}
                className="rounded-2xl"
              >
                Cancelar
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeleteAccount}
                disabled={deleteLoading}
                className="gap-2 rounded-2xl"
              >
                {deleteLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Eliminando...
                  </>
                ) : (
                  <>
                    <Trash2 className="h-4 w-4" />
                    Sí, eliminar mi cuenta
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </main>
  )
}
