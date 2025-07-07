"use client"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { MapPin, AlertCircle } from "lucide-react"

interface LocationPermissionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAccept: () => void
}

export function LocationPermissionDialog({ open, onOpenChange, onAccept }: LocationPermissionDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-2xl">
        <DialogHeader>
          <div className="mx-auto bg-primary/10 p-3 rounded-full mb-4">
            <MapPin className="h-6 w-6 text-primary" />
          </div>
          <DialogTitle className="text-center text-xl">Acceso a tu ubicación</DialogTitle>
          <DialogDescription className="text-center">
            Para mostrarte cómo llegar al campus, necesitamos acceder a tu ubicación actual.
          </DialogDescription>
        </DialogHeader>
        <div className="bg-muted/50 p-4 rounded-xl my-2">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-muted-foreground mr-2 mt-0.5" />
            <p className="text-sm text-muted-foreground">
              Tu ubicación solo se utilizará para calcular la ruta y no será almacenada ni compartida.
            </p>
          </div>
        </div>
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" className="sm:w-full" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button
            className="sm:w-full"
            onClick={() => {
              onAccept()
              onOpenChange(false)
            }}
          >
            Permitir acceso
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

