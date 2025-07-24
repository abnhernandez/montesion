"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/app/auth-context";
import { useProtectedRoute } from "@/hooks/use-protected-route";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  User, 
  Mail, 
  Shield, 
  Edit3, 
  Save, 
  X, 
  CheckCircle, 
  AlertCircle,
  Settings,
  Bell,
  LogOut,
  Trash2,
  Star,
  Crown,
  Trophy,
  Award
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

export default function Profile() {
  const { user, updateProfile, signOut, deleteAccount } = useAuth();
  const { loading, isAuthenticated } = useProtectedRoute();
  const router = useRouter();
  
  // Estados locales
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    nombre: "",
    apellido: "",
    username: "",
    rol: "",
    descripcion: "",
    fechaNacimiento: "",
    instagram: "",
    twitter: "",
    linkedin: "",
    github: "",
    youtube: "",
    tiktok: ""
  });
  const [updateLoading, setUpdateLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [emailPreferences, setEmailPreferences] = useState({
    noQuieroEmails: false,
    novedadesOfertas: true,
    actualizacionesSemanales: true,
    eventosEnVivo: true,
    recordatoriosClases: true
  });
  const [platformPreferences, setPlatformPreferences] = useState({
    temaClaro: false,
    reproducirAutomaticamente: true,
    modoOscuroArticulos: false
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Inicializar formulario cuando el usuario cambie
  useEffect(() => {
    if (user) {
      setEditForm({
        nombre: user.user_metadata?.nombre || "",
        apellido: user.user_metadata?.apellido || "",
        username: user.user_metadata?.username || "",
        rol: user.user_metadata?.rol || "Estudiante",
        descripcion: user.user_metadata?.descripcion || "",
        fechaNacimiento: user.user_metadata?.fechaNacimiento || "",
        instagram: user.user_metadata?.instagram || "",
        twitter: user.user_metadata?.twitter || "",
        linkedin: user.user_metadata?.linkedin || "",
        github: user.user_metadata?.github || "",
        youtube: user.user_metadata?.youtube || "",
        tiktok: user.user_metadata?.tiktok || ""
      });
    }
  }, [user]);

  // Mostrar loading mientras se carga
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Cargando perfil...</p>
        </div>
      </div>
    );
  }

  // Redireccionar si no hay usuario (el hook ya maneja esto)
  if (!isAuthenticated || !user) {
    return null;
  }

  const handleEditToggle = () => {
    if (isEditing) {
      // Cancelar edición - restaurar valores originales
      setEditForm({
        nombre: user.user_metadata?.nombre || "",
        apellido: user.user_metadata?.apellido || "",
        username: user.user_metadata?.username || "",
        rol: user.user_metadata?.rol || "Estudiante",
        descripcion: user.user_metadata?.descripcion || "",
        fechaNacimiento: user.user_metadata?.fechaNacimiento || "",
        instagram: user.user_metadata?.instagram || "",
        twitter: user.user_metadata?.twitter || "",
        linkedin: user.user_metadata?.linkedin || "",
        github: user.user_metadata?.github || "",
        youtube: user.user_metadata?.youtube || "",
        tiktok: user.user_metadata?.tiktok || ""
      });
    }
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    if (!editForm.nombre.trim() || !editForm.apellido.trim()) {
      toast.error("Nombre y apellido son requeridos");
      return;
    }

    setUpdateLoading(true);
    try {
      await updateProfile({
        nombre: editForm.nombre.trim(),
        apellido: editForm.apellido.trim(),
        username: editForm.username.trim(),
        rol: editForm.rol,
        descripcion: editForm.descripcion.trim(),
        fechaNacimiento: editForm.fechaNacimiento,
        instagram: editForm.instagram.trim(),
        twitter: editForm.twitter.trim(),
        linkedin: editForm.linkedin.trim(),
        github: editForm.github.trim(),
        youtube: editForm.youtube.trim(),
        tiktok: editForm.tiktok.trim()
      });
      
      setIsEditing(false);
      toast.success("Perfil actualizado exitosamente");
    } catch (error) {
      console.error("Error actualizando perfil:", error);
      toast.error("Error al actualizar el perfil");
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/");
      toast.success("Sesión cerrada exitosamente");
    } catch (error) {
      console.error("Error cerrando sesión:", error);
      toast.error("Error al cerrar sesión");
    }
  };

  const handleDeleteAccount = async () => {
    setDeleteLoading(true);
    try {
      await deleteAccount();
      router.push("/");
      toast.success("Cuenta eliminada exitosamente. Tu sesión ha sido cerrada y tus datos han sido eliminados.");
    } catch (error) {
      console.error("Error eliminando cuenta:", error);
      // Redirigir al usuario al home ya que su sesión se cerró
      router.push("/");
      toast.success("Tu sesión ha sido cerrada y tus datos han sido eliminados. El proceso de eliminación se completó correctamente.");
    } finally {
      setDeleteLoading(false);
      setShowDeleteConfirm(false);
    }
  };

  const getInitials = () => {
    const nombre = user.user_metadata?.nombre || "";
    const apellido = user.user_metadata?.apellido || "";
    return `${nombre.charAt(0)}${apellido.charAt(0)}`.toUpperCase() || user.email?.charAt(0).toUpperCase() || "U";
  };

  const getDisplayName = () => {
    const nombre = user.user_metadata?.nombre || "";
    const apellido = user.user_metadata?.apellido || "";
    return nombre && apellido ? `${nombre} ${apellido}` : user.email?.split('@')[0] || "Usuario";
  };

  // Calcular puntos del usuario basado en las acciones
  // NOTA: Sistema de puntos SOLO POSITIVOS - Los usuarios nunca pierden puntos
  const calculateUserPoints = () => {
    let points = 0;
    
    // Puntos base por crear cuenta
    points += 5;
    
    // Puntos por confirmar email
    if (user.email_confirmed_at) {
      points += 2;
    }
    
    // Aquí agregarías lógica para calcular otros puntos basados en la actividad del usuario
    // IMPORTANTE: Solo sumar puntos, nunca restar para mantener experiencia positiva
    return user.user_metadata?.points || points;
  };

  // Obtener insignia basada en los puntos
  const getUserBadge = (points: number) => {
    if (points >= 20000) {
      return {
        name: "Legend",
        icon: Crown,
        color: "text-yellow-500",
        bgColor: "bg-yellow-50 dark:bg-yellow-950",
        description: "Estudiante Legend - Acceso exclusivo a webinars y eventos"
      };
    } else if (points >= 10000) {
      return {
        name: "Expert",
        icon: Trophy,
        color: "text-purple-500",
        bgColor: "bg-purple-50 dark:bg-purple-950",
        description: "Experto en la plataforma"
      };
    } else if (points >= 5000) {
      return {
        name: "Advanced",
        icon: Award,
        color: "text-blue-500",
        bgColor: "bg-blue-50 dark:bg-blue-950",
        description: "Usuario avanzado"
      };
    } else if (points >= 1000) {
      return {
        name: "Intermediate",
        icon: Star,
        color: "text-green-500",
        bgColor: "bg-green-50 dark:bg-green-950",
        description: "Usuario intermedio"
      };
    } else {
      return {
        name: "Beginner",
        icon: User,
        color: "text-gray-500",
        bgColor: "bg-gray-50 dark:bg-gray-950",
        description: "Comenzando tu journey"
      };
    }
  };

  const userPoints = calculateUserPoints();
  const userBadge = getUserBadge(userPoints);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

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
                                <span>{1000 - userPoints} puntos</span>
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
                  <AnimatePresence mode="wait">
                    {isEditing ? (
                      <motion.div
                        key="editing"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-6"
                      >
                        {/* Información básica */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold">Información básica</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="username">Username</Label>
                              <Input
                                id="username"
                                value={editForm.username}
                                onChange={(e) => setEditForm(prev => ({ ...prev, username: e.target.value }))}
                                placeholder="abnerhernandez"
                                disabled={updateLoading}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="rol">Rol de trabajo</Label>
                              <Input
                                id="rol"
                                value={editForm.rol}
                                onChange={(e) => setEditForm(prev => ({ ...prev, rol: e.target.value }))}
                                placeholder="Estudiante"
                                disabled={updateLoading}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="nombre">Nombre</Label>
                              <Input
                                id="nombre"
                                value={editForm.nombre}
                                onChange={(e) => setEditForm(prev => ({ ...prev, nombre: e.target.value }))}
                                placeholder="Abner"
                                disabled={updateLoading}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="apellido">Apellido</Label>
                              <Input
                                id="apellido"
                                value={editForm.apellido}
                                onChange={(e) => setEditForm(prev => ({ ...prev, apellido: e.target.value }))}
                                placeholder="Hernández"
                                disabled={updateLoading}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="fechaNacimiento">Cuándo es tu cumpleaños</Label>
                              <Input
                                id="fechaNacimiento"
                                type="date"
                                value={editForm.fechaNacimiento}
                                onChange={(e) => setEditForm(prev => ({ ...prev, fechaNacimiento: e.target.value }))}
                                disabled={updateLoading}
                              />
                            </div>
                          </div>
                        </div>

                        <Separator />

                        {/* Descripción */}
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="descripcion">Descríbete en 140 caracteres o menos</Label>
                            <textarea
                              id="descripcion"
                              value={editForm.descripcion}
                              onChange={(e) => setEditForm(prev => ({ ...prev, descripcion: e.target.value }))}
                              placeholder="ser_valiente = 'Mira que te mando que te esfuerces y seas valiente, no temas ni desmayes porque el Señor tu Dios, esta contigo donde qui..."
                              className="w-full min-h-[100px] p-3 border border-input bg-background text-sm resize-none rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              maxLength={140}
                              disabled={updateLoading}
                            />
                            <p className="text-xs text-muted-foreground text-right">
                              {editForm.descripcion.length}/140
                            </p>
                          </div>
                        </div>

                        <Separator />

                        {/* Redes sociales */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold">Redes</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="instagram" className="flex items-center gap-2">
                                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                </svg>
                                Instagram
                              </Label>
                              <div className="flex">
                                <span className="inline-flex items-center px-3 text-sm text-muted-foreground bg-muted rounded-l-md border border-r-0">
                                  instagram.com/
                                </span>
                                <Input
                                  id="instagram"
                                  value={editForm.instagram}
                                  onChange={(e) => setEditForm(prev => ({ ...prev, instagram: e.target.value }))}
                                  placeholder="tu_usuario"
                                  disabled={updateLoading}
                                  className="rounded-l-none"
                                />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="twitter" className="flex items-center gap-2">
                                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                                </svg>
                                Twitter
                              </Label>
                              <div className="flex">
                                <span className="inline-flex items-center px-3 text-sm text-muted-foreground bg-muted rounded-l-md border border-r-0">
                                  twitter.com/
                                </span>
                                <Input
                                  id="twitter"
                                  value={editForm.twitter}
                                  onChange={(e) => setEditForm(prev => ({ ...prev, twitter: e.target.value }))}
                                  placeholder="tu_usuario"
                                  disabled={updateLoading}
                                  className="rounded-l-none"
                                />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="linkedin" className="flex items-center gap-2">
                                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                </svg>
                                LinkedIn
                              </Label>
                              <div className="flex">
                                <span className="inline-flex items-center px-3 text-sm text-muted-foreground bg-muted rounded-l-md border border-r-0">
                                  linkedin.com/in/
                                </span>
                                <Input
                                  id="linkedin"
                                  value={editForm.linkedin}
                                  onChange={(e) => setEditForm(prev => ({ ...prev, linkedin: e.target.value }))}
                                  placeholder="tu_usuario"
                                  disabled={updateLoading}
                                  className="rounded-l-none"
                                />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="github" className="flex items-center gap-2">
                                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                </svg>
                                GitHub
                              </Label>
                              <div className="flex">
                                <span className="inline-flex items-center px-3 text-sm text-muted-foreground bg-muted rounded-l-md border border-r-0">
                                  github.com/
                                </span>
                                <Input
                                  id="github"
                                  value={editForm.github}
                                  onChange={(e) => setEditForm(prev => ({ ...prev, github: e.target.value }))}
                                  placeholder="tu_usuario"
                                  disabled={updateLoading}
                                  className="rounded-l-none"
                                />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="youtube" className="flex items-center gap-2">
                                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                </svg>
                                YouTube
                              </Label>
                              <div className="flex">
                                <span className="inline-flex items-center px-3 text-sm text-muted-foreground bg-muted rounded-l-md border border-r-0">
                                  youtube.com/@
                                </span>
                                <Input
                                  id="youtube"
                                  value={editForm.youtube}
                                  onChange={(e) => setEditForm(prev => ({ ...prev, youtube: e.target.value }))}
                                  placeholder="tu_canal"
                                  disabled={updateLoading}
                                  className="rounded-l-none"
                                />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="tiktok" className="flex items-center gap-2">
                                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                                </svg>
                                TikTok
                              </Label>
                              <div className="flex">
                                <span className="inline-flex items-center px-3 text-sm text-muted-foreground bg-muted rounded-l-md border border-r-0">
                                  tiktok.com/@
                                </span>
                                <Input
                                  id="tiktok"
                                  value={editForm.tiktok}
                                  onChange={(e) => setEditForm(prev => ({ ...prev, tiktok: e.target.value }))}
                                  placeholder="tu_usuario"
                                  disabled={updateLoading}
                                  className="rounded-l-none"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2 pt-4">
                          <Button 
                            onClick={handleSave} 
                            disabled={updateLoading}
                            className="gap-2"
                          >
                            <Save className="h-4 w-4" />
                            {updateLoading ? "Guardando..." : "Guardar cambios"}
                          </Button>
                          <Button 
                            variant="outline" 
                            onClick={handleEditToggle}
                            disabled={updateLoading}
                            className="gap-2"
                          >
                            <X className="h-4 w-4" />
                            Cancelar
                          </Button>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="viewing"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-6"
                      >
                        {/* Vista de perfil público */}
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <Label className="text-sm font-medium text-muted-foreground">Username</Label>
                              <div className="text-base font-medium">
                                {user.user_metadata?.username || "No especificado"}
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label className="text-sm font-medium text-muted-foreground">Rol de trabajo</Label>
                              <div className="text-base font-medium">
                                {user.user_metadata?.rol || "Estudiante"}
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label className="text-sm font-medium text-muted-foreground">Nombre</Label>
                              <div className="text-base font-medium">
                                {user.user_metadata?.nombre || "No especificado"}
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label className="text-sm font-medium text-muted-foreground">Apellido</Label>
                              <div className="text-base font-medium">
                                {user.user_metadata?.apellido || "No especificado"}
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label className="text-sm font-medium text-muted-foreground">Fecha de nacimiento</Label>
                              <div className="text-base font-medium">
                                {user.user_metadata?.fechaNacimiento 
                                  ? new Date(user.user_metadata.fechaNacimiento).toLocaleDateString("es-ES", {
                                      year: "numeric",
                                      month: "long", 
                                      day: "numeric"
                                    })
                                  : "No especificado"
                                }
                              </div>
                            </div>
                          </div>

                          {user.user_metadata?.descripcion && (
                            <div className="space-y-2">
                              <Label className="text-sm font-medium text-muted-foreground">Descripción</Label>
                              <div className="text-base p-4 bg-muted/20 rounded-lg">
                                {user.user_metadata.descripcion}
                              </div>
                            </div>
                          )}

                          {/* Redes sociales */}
                          <div className="space-y-4">
                            <Label className="text-sm font-medium text-muted-foreground">Redes</Label>
                            <div className="flex flex-wrap gap-3">
                              {user.user_metadata?.twitter && (
                                <a
                                  href={`https://twitter.com/${user.user_metadata.twitter}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2 px-3 py-2 bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400 rounded-xl hover:bg-sky-100 dark:hover:bg-sky-900 transition-colors"
                                >
                                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                                  </svg>
                                  @{user.user_metadata.twitter}
                                </a>
                              )}
                              {user.user_metadata?.linkedin && (
                                <a
                                  href={`https://linkedin.com/in/${user.user_metadata.linkedin}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2 px-3 py-2 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
                                >
                                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                  </svg>
                                  LinkedIn
                                </a>
                              )}
                              {user.user_metadata?.github && (
                                <a
                                  href={user.user_metadata.github}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2 px-3 py-2 bg-gray-50 dark:bg-gray-950 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
                                >
                                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                  </svg>
                                  GitHub
                                </a>
                              )}
                              {user.user_metadata?.sitioWeb && (
                                <a
                                  href={user.user_metadata.sitioWeb}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2 px-3 py-2 bg-green-50 dark:bg-green-950 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-100 dark:hover:bg-green-900 transition-colors"
                                >
                                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10"/>
                                    <path d="M2 12h20"/>
                                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                                  </svg>
                                  Sitio Web
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>

              {/* Puntos e insignia del usuario */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="relative overflow-hidden">
                  <CardHeader className="text-center pb-4">
                    <div className="flex items-center justify-center mb-2">
                      <userBadge.icon className={`h-8 w-8 ${userBadge.color}`} />
                    </div>
                    <CardTitle className="text-3xl font-bold text-primary">{userPoints}</CardTitle>
                    <CardDescription>Puntos totales</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${userBadge.bgColor}`}>
                      <userBadge.icon className={`h-4 w-4 ${userBadge.color}`} />
                      <span className={`text-sm font-medium ${userBadge.color}`}>
                        {userBadge.name}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      {userBadge.description}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-bold text-blue-600">0</CardTitle>
                    <CardDescription>Cursos completados</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-xs text-muted-foreground">
                      Completa tu primer curso para ganar 5 puntos
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Cursos completados */}
              <Card>
                <CardHeader>
                  <CardTitle>Cursos completados</CardTitle>
                  <CardDescription>Tus últimos logros académicos</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center">
                      <svg className="h-6 w-6 text-yellow-600" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 22L10.91 9.74L2 9L10.91 8.26L12 2Z"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">Curso de instalación y configuración de Python</h4>
                      <p className="text-sm text-muted-foreground">1h 12m • Terminado el: 01/05/2025</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                      <svg className="h-6 w-6 text-purple-600" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 22L10.91 9.74L2 9L10.91 8.26L12 2Z"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">Curso de Introducción a DevOps: Bases y Conceptos</h4>
                      <p className="text-sm text-muted-foreground">1h 32m • Terminado el: 28/05/2025</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
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
  );
}
                    <div className="space-y-1">
                      <h4 className="font-medium">Actualmente estás ingresando con tu cuenta de Google</h4>
                      <p className="text-sm text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                    <Button variant="outline">
                      Conectar Facebook
                    </Button>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <h4 className="font-medium">Cambiar correo</h4>
                        <p className="text-sm text-muted-foreground">
                          Actualiza tu dirección de correo electrónico
                        </p>
                      </div>
                      <Button variant="outline">
                        Cambiar correo
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <h4 className="font-medium">Cambiar contraseña</h4>
                        <p className="text-sm text-muted-foreground">
                          *********
                        </p>
                      </div>
                      <Button variant="outline">
                        Cambiar contraseña
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <h4 className="font-medium">Cuenta Activa</h4>
                        <p className="text-sm text-muted-foreground">
                          Tu cuenta está activa y verificada
                        </p>
                      </div>
                      <Button 
                        variant="destructive" 
                        onClick={() => setShowDeleteConfirm(true)}
                        className="gap-2"
                      >
                        <Trash2 className="h-4 w-4" />
                        Eliminar cuenta
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tab Content: Notificaciones */}
            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Preferencias de correo y plataforma
                  </CardTitle>
                  <CardDescription>
                    Administra cómo recibes notificaciones y personaliza tu experiencia
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  {/* Preferencias de email */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <label className="text-sm font-medium">No quiero recibir correos</label>
                          </div>
                          <input
                            type="checkbox"
                            checked={emailPreferences.noQuieroEmails}
                            onChange={(e) => setEmailPreferences(prev => ({ ...prev, noQuieroEmails: e.target.checked }))}
                            className="h-4 w-4"
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <label className="text-sm font-medium">Novedades y ofertas</label>
                          </div>
                          <input
                            type="checkbox"
                            checked={emailPreferences.novedadesOfertas}
                            onChange={(e) => setEmailPreferences(prev => ({ ...prev, novedadesOfertas: e.target.checked }))}
                            className="h-4 w-4"
                            disabled={emailPreferences.noQuieroEmails}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <label className="text-sm font-medium">Actualizaciones semanales</label>
                          </div>
                          <input
                            type="checkbox"
                            checked={emailPreferences.actualizacionesSemanales}
                            onChange={(e) => setEmailPreferences(prev => ({ ...prev, actualizacionesSemanales: e.target.checked }))}
                            className="h-4 w-4"
                            disabled={emailPreferences.noQuieroEmails}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <label className="text-sm font-medium">Eventos en vivo</label>
                          </div>
                          <input
                            type="checkbox"
                            checked={emailPreferences.eventosEnVivo}
                            onChange={(e) => setEmailPreferences(prev => ({ ...prev, eventosEnVivo: e.target.checked }))}
                            className="h-4 w-4"
                            disabled={emailPreferences.noQuieroEmails}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <label className="text-sm font-medium">Recordatorios de clases</label>
                          </div>
                          <input
                            type="checkbox"
                            checked={emailPreferences.recordatoriosClases}
                            onChange={(e) => setEmailPreferences(prev => ({ ...prev, recordatoriosClases: e.target.checked }))}
                            className="h-4 w-4"
                            disabled={emailPreferences.noQuieroEmails}
                          />
                        </div>
                      </div>

                      {/* Preferencias de plataforma */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <label className="text-sm font-medium">Tema claro para el código</label>
                          </div>
                          <input
                            type="checkbox"
                            checked={platformPreferences.temaClaro}
                            onChange={(e) => setPlatformPreferences(prev => ({ ...prev, temaClaro: e.target.checked }))}
                            className="h-4 w-4"
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <label className="text-sm font-medium">Reproducir automáticamente los vídeos</label>
                          </div>
                          <input
                            type="checkbox"
                            checked={platformPreferences.reproducirAutomaticamente}
                            onChange={(e) => setPlatformPreferences(prev => ({ ...prev, reproducirAutomaticamente: e.target.checked }))}
                            className="h-4 w-4"
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <label className="text-sm font-medium">Modo oscuro para artículos y reproductor</label>
                          </div>
                          <input
                            type="checkbox"
                            checked={platformPreferences.modoOscuroArticulos}
                            onChange={(e) => setPlatformPreferences(prev => ({ ...prev, modoOscuroArticulos: e.target.checked }))}
                            className="h-4 w-4"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-4">
                      <div className="space-y-2">
                        <Label>Zona horaria</Label>
                        <div className="text-sm text-muted-foreground">
                          America/Mexico_City
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button className="gap-2">
                      <Save className="h-4 w-4" />
                      Guardar cambios
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tab Content: Seguridad */}
            <TabsContent value="security" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Seguridad de la cuenta
                  </CardTitle>
                  <CardDescription>
                    Administra la seguridad y privacidad de tu cuenta
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <h4 className="font-medium">Cambiar contraseña</h4>
                        <p className="text-sm text-muted-foreground">
                          Actualiza tu contraseña regularmente para mantener tu cuenta segura
                        </p>
                      </div>
                      <Button variant="outline" asChild>
                        <a href="/users/password/new">
                          Cambiar
                        </a>
                      </Button>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between p-4 border rounded-lg border-destructive/20">
                      <div className="space-y-1">
                        <h4 className="font-medium text-destructive">Cerrar sesión</h4>
                        <p className="text-sm text-muted-foreground">
                          Cierra tu sesión en este dispositivo
                        </p>
                      </div>
                      <Button 
                        variant="destructive" 
                        onClick={handleSignOut}
                        className="gap-2"
                      >
                        <LogOut className="h-4 w-4" />
                        Cerrar sesión
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg border-destructive/20 bg-destructive/5">
                      <div className="space-y-1">
                        <h4 className="font-medium text-destructive">Zona de peligro</h4>
                        <p className="text-sm text-muted-foreground">
                          Acciones irreversibles para tu cuenta
                        </p>
                      </div>
                      <Button 
                        variant="destructive" 
                        className="gap-2"
                        onClick={() => setShowDeleteConfirm(true)}
                      >
                        <Trash2 className="h-4 w-4" />
                        Eliminar cuenta
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Estado de verificación del email - mostrar si no está verificado */}
        {!user.email_confirmed_at && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Tu correo electrónico aún no ha sido verificado. Revisa tu bandeja de entrada para confirmar tu cuenta.
              </AlertDescription>
            </Alert>
          </motion.div>
        )}

        {/* Modal de confirmación para eliminar cuenta */}
        <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
          <DialogContent className="sm:max-w-md">
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
              >
                Cancelar
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeleteAccount}
                disabled={deleteLoading}
                className="gap-2"
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
  );
}