"use client"
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'

export function useAuth() {
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const token = Cookies.get('token')
    setIsAuthenticated(!!token)
    setLoading(false)
  }, [])

  return { isAuthenticated, loading }
}
