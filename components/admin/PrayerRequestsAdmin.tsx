"use client";

import React, { useState, useEffect } from "react";
import { getPrayerRequests, updatePrayerRequestStatus } from "@/lib/prayer-requests";
import type { PrayerRequest } from "@/types/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, AlertCircle } from "lucide-react";

const statusConfig = {
  pending: { 
    label: "Pendiente", 
    color: "bg-yellow-100 text-yellow-800", 
    icon: Clock 
  },
  in_progress: { 
    label: "En Progreso", 
    color: "bg-blue-100 text-blue-800", 
    icon: AlertCircle 
  },
  completed: { 
    label: "Completada", 
    color: "bg-green-100 text-green-800", 
    icon: CheckCircle 
  }
} as const;

export default function PrayerRequestsAdmin() {
  const [requests, setRequests] = useState<PrayerRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

  const loadRequests = async () => {
    setLoading(true);
    try {
      const result = await getPrayerRequests();
      if (result.success && result.data) {
        setRequests(result.data);
        setError(null);
      } else {
        setError(result.error || 'Error al cargar las peticiones');
      }
    } catch (err) {
      setError('Error inesperado al cargar las peticiones');
      console.error('Error loading prayer requests:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id: string, newStatus: 'pending' | 'in_progress' | 'completed') => {
    setUpdatingStatus(id);
    try {
      const result = await updatePrayerRequestStatus(id, newStatus);
      if (result.success) {
        // Actualizar el estado local
        setRequests(prev => 
          prev.map(request => 
            request.id === id 
              ? { ...request, status: newStatus, processed_at: newStatus === 'completed' ? new Date().toISOString() : request.processed_at }
              : request
          )
        );
      } else {
        setError(result.error || 'Error al actualizar el estado');
      }
    } catch (err) {
      setError('Error inesperado al actualizar el estado');
      console.error('Error updating status:', err);
    } finally {
      setUpdatingStatus(null);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p>Cargando peticiones...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="text-center text-red-600">
          <p>Error: {error}</p>
          <Button onClick={loadRequests} className="mt-4">
            Intentar de nuevo
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Peticiones de Oración
        </h1>
        <p className="text-gray-600">
          Total de peticiones: {requests.length}
        </p>
        <Button onClick={loadRequests} className="mt-2">
          Actualizar
        </Button>
      </div>

      <div className="space-y-4">
        {requests.map((request) => {
          const status = request.status || 'pending';
          const config = statusConfig[status as keyof typeof statusConfig];
          const IconComponent = config.icon;

          return (
            <Card key={request.id} className="w-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">
                    Ticket #{request.ticket}
                  </CardTitle>
                  <Badge className={config.color}>
                    <IconComponent className="w-4 h-4 mr-1" />
                    {config.label}
                  </Badge>
                </div>
                <div className="text-sm text-gray-600">
                  <p><strong>Nombre:</strong> {request.nombre}</p>
                  <p><strong>Email:</strong> {request.correo_electronico}</p>
                  <p><strong>Asunto:</strong> {request.asunto}</p>
                  <p><strong>Fecha:</strong> {new Date(request.created_at || '').toLocaleDateString('es-ES')}</p>
                  {request.processed_at && (
                    <p><strong>Procesada:</strong> {new Date(request.processed_at).toLocaleDateString('es-ES')}</p>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Petición:</h4>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded whitespace-pre-wrap">
                    {request.peticion}
                  </p>
                </div>
                
                <div className="flex gap-2 flex-wrap">
                  {status !== 'pending' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleStatusUpdate(request.id!, 'pending')}
                      disabled={updatingStatus === request.id}
                    >
                      Marcar como Pendiente
                    </Button>
                  )}
                  {status !== 'in_progress' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleStatusUpdate(request.id!, 'in_progress')}
                      disabled={updatingStatus === request.id}
                    >
                      Marcar en Progreso
                    </Button>
                  )}
                  {status !== 'completed' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleStatusUpdate(request.id!, 'completed')}
                      disabled={updatingStatus === request.id}
                    >
                      Marcar como Completada
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {requests.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No hay peticiones de oración registradas.</p>
        </div>
      )}
    </div>
  );
}
