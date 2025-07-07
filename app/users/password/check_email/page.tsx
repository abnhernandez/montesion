"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CheckEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-neutral-900 transition-colors duration-300 px-4">
      <main className="w-full max-w-md text-center space-y-6">
        <h1 className="text-2xl font-semibold text-foreground">Revisa tu correo</h1>
        <p className="text-gray-700 dark:text-gray-300">
          Si existe una cuenta asociada, te enviamos un correo con instrucciones para restablecer tu contraseña.
        </p>
        <Link href="/users/sign_in">
          <Button variant="outline" className="mt-4">Volver al inicio de sesión</Button>
        </Link>
      </main>
    </div>
  )
}