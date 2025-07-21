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
  Trash2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

export default function Profile() {
  const { user, updateProfile, signOut } = useAuth();
  const { loading, isAuthenticated } = useProtectedRoute();
  const router = useRouter();
  
  // Estados locales
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    nombre: "",
    apellido: ""
  });
  const [updateLoading, setUpdateLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  // Inicializar formulario cuando el usuario cambie
  useEffect(() => {
    if (user) {
      setEditForm({
        nombre: user.user_metadata?.nombre || "",
        apellido: user.user_metadata?.apellido || ""
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
        apellido: user.user_metadata?.apellido || ""
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
        apellido: editForm.apellido.trim()
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header del perfil */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Card className="relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10" />
            
            <CardContent className="relative p-8">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                {/* Avatar */}
                <div className="relative">
                  <Avatar className="h-24 w-24 ring-4 ring-background shadow-lg">
                    <AvatarImage src="" alt={getDisplayName()} />
                    <AvatarFallback className="text-2xl font-bold bg-primary text-primary-foreground">
                      {getInitials()}
                    </AvatarFallback>
                  </Avatar>
                  {user.email_confirmed_at && (
                    <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>

                {/* Información básica */}
                <div className="flex-1 text-center sm:text-left space-y-2">
                  <h1 className="text-3xl font-bold">{getDisplayName()}</h1>
                  <p className="text-muted-foreground flex items-center justify-center sm:justify-start gap-2">
                    <Mail className="h-4 w-4" />
                    {user.email}
                  </p>
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <Badge variant={user.email_confirmed_at ? "default" : "secondary"} className="gap-1">
                      {user.email_confirmed_at ? (
                        <>
                          <CheckCircle className="h-3 w-3" />
                          Verificado
                        </>
                      ) : (
                        <>
                          <AlertCircle className="h-3 w-3" />
                          Pendiente verificación
                        </>
                      )}
                    </Badge>
                  </div>
                </div>

                {/* Botón de editar */}
                <div className="flex gap-2">
                  <Button
                    variant={isEditing ? "secondary" : "outline"}
                    size="sm"
                    onClick={handleEditToggle}
                    className="gap-2"
                  >
                    {isEditing ? (
                      <>
                        <X className="h-4 w-4" />
                        Cancelar
                      </>
                    ) : (
                      <>
                        <Edit3 className="h-4 w-4" />
                        Editar
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tabs del perfil */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:grid-cols-3">
              <TabsTrigger value="profile" className="gap-2">
                <User className="h-4 w-4" />
                Perfil
              </TabsTrigger>
              <TabsTrigger value="settings" className="gap-2">
                <Settings className="h-4 w-4" />
                Configuración
              </TabsTrigger>
              <TabsTrigger value="security" className="gap-2">
                <Shield className="h-4 w-4" />
                Seguridad
              </TabsTrigger>
            </TabsList>

            {/* Tab Content: Perfil */}
            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Información Personal
                  </CardTitle>
                  <CardDescription>
                    Administra tu información personal y datos de contacto
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <AnimatePresence mode="wait">
                    {isEditing ? (
                      <motion.div
                        key="editing"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-4"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="nombre">Nombre</Label>
                            <Input
                              id="nombre"
                              value={editForm.nombre}
                              onChange={(e) => setEditForm(prev => ({ ...prev, nombre: e.target.value }))}
                              placeholder="Tu nombre"
                              disabled={updateLoading}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="apellido">Apellido</Label>
                            <Input
                              id="apellido"
                              value={editForm.apellido}
                              onChange={(e) => setEditForm(prev => ({ ...prev, apellido: e.target.value }))}
                              placeholder="Tu apellido"
                              disabled={updateLoading}
                            />
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
                        className="space-y-4"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                            <Label className="text-sm font-medium text-muted-foreground">Correo electrónico</Label>
                            <div className="text-base font-medium flex items-center gap-2">
                              {user.email}
                              {user.email_confirmed_at && (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              )}
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm font-medium text-muted-foreground">Miembro desde</Label>
                            <div className="text-base font-medium">
                              {formatDate(user.created_at)}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>

              {/* Estado de verificación */}
              {!user.email_confirmed_at && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Tu correo electrónico aún no ha sido verificado. Revisa tu bandeja de entrada para confirmar tu cuenta.
                  </AlertDescription>
                </Alert>
              )}
            </TabsContent>

            {/* Tab Content: Configuración */}
            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notificaciones
                  </CardTitle>
                  <CardDescription>
                    Administra cómo recibes notificaciones
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Configuración de notificaciones estará disponible próximamente.
                    </AlertDescription>
                  </Alert>
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
                        disabled
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
      </div>
    </main>
  );
}