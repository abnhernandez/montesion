'use client'

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Info } from "lucide-react";

export default function BootcampsSection() {
  const [open, setOpen] = useState(false);

  const services = [
    {
      title: "Estudio bíblico",
      description: "Aprende sobre la Biblia y profundiza en su enseñanza.",
      image: "/placeholder.svg?height=300&width=400",
      startDate: "Clases a partir del 28 Enero",
    },
    {
      title: "Reunión General",
      description: "Un tiempo de adoración y enseñanza para todos.",
      image: "/placeholder.svg?height=300&width=400",
      startDate: "Todos los domingos 2:30 p.m.",
    },
    {
      title: "Ayuno Congregacional",
      description: "Un tiempo especial de oración y ayuno en comunidad.",
      image: "/placeholder.svg?height=300&width=400",
      startDate: "Primer domingo de cada mes",
    },
  ];

  return (
    <TooltipProvider>
      <section className="w-full min-h-screen mx-auto py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col justify-center space-y-12">
          <div className="text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Nuestros Servicios
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Encuentra espacios de comunión y crecimiento espiritual.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="rounded-lg border bg-card text-card-foreground shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="relative h-56 w-full overflow-hidden rounded-t-lg">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, (max-width: 1600px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-xl font-semibold leading-tight">{service.title}</h3>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="w-4 h-4 text-gray-500 cursor-pointer" />
                      </TooltipTrigger>
                      <TooltipContent>{service.description}</TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <div className="w-2 h-2 rounded-full bg-green-500 mr-2" />
                    {service.startDate}
                  </div>
                  <Button className="w-full text-base py-4" size="lg" onClick={() => setOpen(true)}>
                    Asistir
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal de opciones */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Selecciona tu modalidad</DialogTitle>
            </DialogHeader>
            <div className="flex justify-center gap-4">
              <Button variant="outline" onClick={() => setOpen(false)}>Presencial</Button>
              <Button onClick={() => setOpen(false)}>Online</Button>
            </div>
          </DialogContent>
        </Dialog>
      </section>
    </TooltipProvider>
  );
}