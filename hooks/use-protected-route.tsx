"use client"

import { useEffect } from "react"
import { useAuth } from "@/app/auth-context"
import { useRouter } from "next/navigation"

export function useProtectedRoute() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth")
    }
  }, [user, loading, router])

  return { user, loading, isAuthenticated: !!user }
}
