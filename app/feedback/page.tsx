"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bug, MessageSquare, Lightbulb, Send } from "lucide-react"
import { toast } from "sonner"

export default function MinimalFeedbackForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedbackType, setFeedbackType] = useState<'bug' | 'feature' | 'general'>('bug')

  // Detectar el tema del sistema cuando se carga el componente
  useEffect(() => {
    // Verificar si hay una preferencia guardada
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    
    if (savedTheme) {
      document.documentElement.classList.toggle('dark', savedTheme === 'dark')
    } else {
      // Si no hay preferencia, usar la preferencia del sistema
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      document.documentElement.classList.toggle('dark', isDark)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    const form = e.currentTarget
    const formData = new FormData(form)
    // Construir payload según tipo
    const payload: {
      type: string;
      description: string;
      title?: string;
      priority?: string;
      browser?: string;
      email?: string;
      importance?: string;
      subject?: string;
    } = { type: feedbackType, description: '' }
    if (feedbackType === 'bug') {
      payload.title = (formData.get('title') ?? '') as string
      payload.description = (formData.get('description') ?? '') as string
      payload.priority = (formData.get('priority') ?? '') as string
      payload.browser = (formData.get('browser') ?? '') as string
      payload.email = (formData.get('email') ?? '') as string
    } else if (feedbackType === 'feature') {
      payload.title = (formData.get('title') ?? '') as string
      payload.description = (formData.get('description') ?? '') as string
      payload.importance = (formData.get('importance') ?? '') as string
      payload.email = (formData.get('email') ?? '') as string
    } else {
      payload.subject = (formData.get('subject') ?? '') as string
      payload.description = (formData.get('message') ?? '') as string
      payload.email = (formData.get('email') ?? '') as string
    }
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!res.ok) throw new Error('Error al enviar feedback')
      toast('Gracias por tu feedback')
      form.reset()
    } catch (err) {
      console.error(err)
      toast.error('Error al enviar, inténtalo de nuevo')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 transition-colors duration-200">

      <Card className="w-full max-w-xl shadow-sm border border-border rounded-3xl bg-background transition-colors duration-200">
        <div className="p-6 border-b border-border">
          <h2 className="text-2xl font-semibold text-foreground text-center transition-colors duration-200">Feedback</h2>
          <p className="text-muted-foreground text-center mt-1 text-sm transition-colors duration-200">Comparte tu opinión</p>
        </div>

        <CardContent className="p-6">
          <Tabs defaultValue="bug" onValueChange={(val: string) => setFeedbackType(val as 'bug' | 'feature' | 'general')} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gray-100 dark:bg-gray-900 rounded-2xl p-1 mb-6 transition-colors duration-200">
              <TabsTrigger
                value="bug"
                className="flex items-center gap-2 rounded-xl data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-sm transition-all text-sm dark:text-white"
              >
                <Bug className="h-4 w-4" />
                Bug
              </TabsTrigger>
              <TabsTrigger
                value="feature"
                className="flex items-center gap-2 rounded-xl data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-sm transition-all text-sm dark:text-white"
              >
                <Lightbulb className="h-4 w-4" />
                Idea
              </TabsTrigger>
              <TabsTrigger
                value="general"
                className="flex items-center gap-2 rounded-xl data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-sm transition-all text-sm dark:text-white"
              >
                <MessageSquare className="h-4 w-4" />
                General
              </TabsTrigger>
            </TabsList>

            <TabsContent value="bug" className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="bug-title" className="text-sm font-medium text-gray-700 dark:text-white transition-colors duration-200">
                    Título *
                  </Label>
                  <Input
                    id="bug-title"
                    name="title"
                    placeholder="Describe el problema"
                    className="rounded-2xl border-gray-300 dark:border-gray-700 focus:border-gray-400 dark:focus:border-gray-600 focus:ring-gray-400/20 dark:focus:ring-white/20 bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-200"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bug-priority" className="text-sm font-medium text-gray-700 dark:text-white transition-colors duration-200">
                      Prioridad
                    </Label>
                    <Select name="priority">
                      <SelectTrigger className="rounded-2xl border-gray-300 dark:border-gray-700 focus:border-gray-400 dark:focus:border-gray-600 bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-200">
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                      <SelectContent className="rounded-2xl bg-white dark:bg-black border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white transition-colors duration-200">
                        <SelectItem value="low">Baja</SelectItem>
                        <SelectItem value="medium">Media</SelectItem>
                        <SelectItem value="high">Alta</SelectItem>
                        <SelectItem value="critical">Crítica</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bug-browser" className="text-sm font-medium text-gray-700 dark:text-white transition-colors duration-200">
                      Navegador
                    </Label>
                    <Select name="browser">
                      <SelectTrigger className="rounded-2xl border-gray-300 dark:border-gray-700 focus:border-gray-400 dark:focus:border-gray-600 bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-200">
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                      <SelectContent className="rounded-2xl bg-white dark:bg-black border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white transition-colors duration-200">
                        <SelectItem value="chrome">Chrome</SelectItem>
                        <SelectItem value="firefox">Firefox</SelectItem>
                        <SelectItem value="safari">Safari</SelectItem>
                        <SelectItem value="edge">Edge</SelectItem>
                        <SelectItem value="opera">Opera</SelectItem>
                        <SelectItem value="brave">Brave</SelectItem>
                        <SelectItem value="arc">Arc</SelectItem>
                        <SelectItem value="other">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bug-description" className="text-sm font-medium text-gray-700 dark:text-white transition-colors duration-200">
                    Descripción *
                  </Label>
                  <Textarea
                    id="bug-description"
                    name="description"
                    placeholder="Describe qué pasó y cómo reproducir el problema..."
                    className="min-h-[100px] rounded-2xl border-gray-300 dark:border-gray-700 focus:border-gray-400 dark:focus:border-gray-600 focus:ring-gray-400/20 dark:focus:ring-white/20 resize-none bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-200"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bug-email" className="text-sm font-medium text-gray-700 dark:text-white transition-colors duration-200">
                    Email (opcional)
                  </Label>
                  <Input
                    id="bug-email"
                    name="email"
                    type="email"
                    placeholder="tu@email.com"
                    className="rounded-2xl border-gray-300 dark:border-gray-700 focus:border-gray-400 dark:focus:border-gray-600 focus:ring-gray-400/20 dark:focus:ring-white/20 bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-200"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gray-900 dark:bg-gray-900 hover:bg-gray-800 dark:hover:bg-black text-white rounded-2xl py-2.5 font-medium transition-colors duration-200"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-gray-300 border-t-white rounded-full animate-spin" />
                      Enviando...
                    </div>
                  ) : (
                    <>
                      <Bug className="mr-2 h-4 w-4" />
                      Reportar Bug
                    </>
                  )}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="feature" className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="feature-title" className="text-sm font-medium text-gray-700 dark:text-white transition-colors duration-200">
                    Título *
                  </Label>
                  <Input
                    id="feature-title"
                    name="title"
                    placeholder="¿Qué te gustaría que añadiéramos?"
                    className="rounded-2xl border-gray-300 dark:border-gray-700 focus:border-gray-400 dark:focus:border-gray-600 focus:ring-gray-400/20 dark:focus:ring-white/20 bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-200"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="feature-description" className="text-sm font-medium text-gray-700 dark:text-white transition-colors duration-200">
                    Descripción *
                  </Label>
                  <Textarea
                    id="feature-description"
                    name="description"
                    placeholder="Describe tu idea y por qué sería útil..."
                    className="min-h-[100px] rounded-2xl border-gray-300 dark:border-gray-700 focus:border-gray-400 dark:focus:border-gray-600 focus:ring-gray-400/20 dark:focus:ring-white/20 resize-none bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-200"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-medium text-gray-700 dark:text-white transition-colors duration-200">Importancia</Label>
                  <RadioGroup name="importance" defaultValue="medium" className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="low" id="imp-low" className="border-gray-400 dark:border-white text-gray-900 dark:text-white" />
                      <Label htmlFor="imp-low" className="text-sm cursor-pointer text-gray-700 dark:text-white transition-colors duration-200">
                        Sería útil
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="medium" id="imp-medium" className="border-gray-400 dark:border-white text-gray-900 dark:text-white" />
                      <Label htmlFor="imp-medium" className="text-sm cursor-pointer text-gray-700 dark:text-white transition-colors duration-200">
                        Importante
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="high" id="imp-high" className="border-gray-400 dark:border-white text-gray-900 dark:text-white" />
                      <Label htmlFor="imp-high" className="text-sm cursor-pointer text-gray-700 dark:text-white transition-colors duration-200">
                        Esencial
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="feature-email" className="text-sm font-medium text-gray-700 dark:text-white transition-colors duration-200">
                    Email (opcional)
                  </Label>
                  <Input
                    id="feature-email"
                    name="email"
                    type="email"
                    placeholder="tu@email.com"
                    className="rounded-2xl border-gray-300 dark:border-gray-700 focus:border-gray-400 dark:focus:border-gray-600 focus:ring-gray-400/20 dark:focus:ring-white/20 bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-200"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gray-900 dark:bg-gray-900 hover:bg-gray-800 dark:hover:bg-black text-white rounded-2xl py-2.5 font-medium transition-colors duration-200"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-gray-300 border-t-white rounded-full animate-spin" />
                      Enviando...
                    </div>
                  ) : (
                    <>
                      <Lightbulb className="mr-2 h-4 w-4" />
                      Enviar Idea
                    </>
                  )}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="general" className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="general-subject" className="text-sm font-medium text-gray-700 dark:text-white transition-colors duration-200">
                    Asunto *
                  </Label>
                  <Input
                    id="general-subject"
                    name="subject"
                    placeholder="¿De qué quieres hablarnos?"
                    className="rounded-2xl border-gray-300 dark:border-gray-700 focus:border-gray-400 dark:focus:border-gray-600 focus:ring-gray-400/20 dark:focus:ring-white/20 bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-200"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="general-category" className="text-sm font-medium text-gray-700 dark:text-white transition-colors duration-200">
                    Categoría
                  </Label>
                  <Select name="category">
                    <SelectTrigger className="rounded-2xl border-gray-300 dark:border-gray-700 focus:border-gray-400 dark:focus:border-gray-600 bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-200">
                      <SelectValue placeholder="Seleccionar categoría" />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl bg-white dark:bg-black border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white transition-colors duration-200">
                      <SelectItem value="ui">Interfaz</SelectItem>
                      <SelectItem value="performance">Rendimiento</SelectItem>
                      <SelectItem value="content">Contenido</SelectItem>
                      <SelectItem value="account">Cuenta</SelectItem>
                      <SelectItem value="orientation">Orientación</SelectItem>
                      <SelectItem value="medium">Soporte</SelectItem>
                      <SelectItem value="other">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="general-message" className="text-sm font-medium text-gray-700 dark:text-white transition-colors duration-200">
                    Mensaje *
                  </Label>
                  <Textarea
                    id="general-message"
                    name="message"
                    placeholder="Compártenos tu feedback..."
                    className="min-h-[100px] rounded-2xl border-gray-300 dark:border-gray-700 focus:border-gray-400 dark:focus:border-gray-600 focus:ring-gray-400/20 dark:focus:ring-white/20 resize-none bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-200"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="general-email" className="text-sm font-medium text-gray-700 dark:text-white transition-colors duration-200">
                    Email *
                  </Label>
                  <Input
                    id="general-email"
                    name="email"
                    type="email"
                    placeholder="tu@email.com"
                    className="rounded-2xl border-gray-300 dark:border-gray-700 focus:border-gray-400 dark:focus:border-gray-600 focus:ring-gray-400/20 dark:focus:ring-white/20 bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-200"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gray-900 dark:bg-gray-900 hover:bg-gray-800 dark:hover:bg-black text-white rounded-2xl py-2.5 font-medium transition-colors duration-200"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-gray-300 border-t-white rounded-full animate-spin" />
                      Enviando...
                    </div>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Enviar Feedback
                    </>
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}