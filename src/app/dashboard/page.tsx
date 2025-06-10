"use client"

import Navbar from "@/components/shared/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/useAuth"
import { Monitor, Users, Wrench } from "lucide-react"
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useDashboardData } from "@/hooks/use-dashboard-data"
import { useRouter } from "next/navigation"
import { ArrowRight } from "lucide-react";

export default function DashboardPage() {
  const { isAuthenticated} = useAuth();
  const { data, loading } = useDashboardData();
  const router = useRouter();

  return (
      <ProtectedRoute>
      <>
        <Navbar isAuthenticated={isAuthenticated} />
        <div className="min-h-screen pt-16 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-4xl font-bold mb-10 text-foreground text-center">Dashboard</h1>
            {loading || !data ? (
              <p className="text-center">Cargando datos...</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-8">
                {/* Card Equipos */}
                <Card className="h-72 flex flex-col justify-between shadow-xl">
                  <CardHeader>
                    <CardTitle data-testid="equipos-title" className="flex items-center gap-2 text-2xl">
                      <Monitor className="w-9 h-9 text-blue-600" />
                      Equipos
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-5xl font-extrabold mb-2">{data.totalEquipos}</p>
                    <Badge variant="outline" className="mt-2 text-lg px-4 py-2">
                      Disponibles: {data.equiposDisponibles}
                    </Badge>
                    <div className="mt-8 flex justify-end">
                      <button data-testid="equipos-button" className="btn-melo" onClick={() => router.push("/equipment")}>
                        Ver detalles
                        <ArrowRight style={{ marginLeft: 8, transition: "transform 0.2s" }} />
                      </button>
                    </div>
                  </CardContent>
                </Card>
                {/* Card Tus Equipos Rentados */}
                <Card className="h-72 flex flex-col justify-between shadow-xl">
                  <CardHeader>
                    <CardTitle data-testid="equipos-rentados-title" className="flex items-center gap-2 text-2xl">
                      <Users className="w-9 h-9 text-cyan-600" />
                      Tus Equipos Rentados
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-5xl font-extrabold mb-2">{data.equiposRentadosPorUsuario}</p>
                    <div className="mt-12 flex justify-end">
                      <button data-testid="equipos-rentados-button" className="btn-melo" onClick={() => router.push("/reservas")}>
                        Ver detalles
                        <ArrowRight style={{ marginLeft: 8, transition: "transform 0.2s" }} />
                      </button>
                    </div>
                  </CardContent>
                </Card>
                {/* Card Mantenimiento solo para admin o technical */}
                {(data.roles.includes("admin") || data.roles.includes("technical")) && (
                  <Card className="h-72 flex flex-col justify-between shadow-xl md:col-span-2">
                    <CardHeader>
                      <CardTitle data-testid="mantenimiento-title" className="flex items-center gap-2 text-2xl">
                        <Wrench className="w-9 h-9 text-orange-600" />
                        Mantenimiento
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-5xl font-extrabold mb-2">{data.equiposEnMantenimiento ?? 0}</p>
                      <div className="mt-12 flex justify-end">
                        <button data-testid="mantenimiento-button" className="btn-melo" onClick={() => router.push("/maintenance")}>
                          Ver detalles
                          <ArrowRight style={{ marginLeft: 8, transition: "transform 0.2s" }} />
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </div>
        </div>
      </>
    </ProtectedRoute>
  );
}