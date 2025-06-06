import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface HeroProps {
  isAuthenticated: boolean;
}

const Hero = ({ isAuthenticated }: HeroProps) => (
  <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 text-center">
    <Badge variant="secondary" className="mb-4">
      🚀 Gestión de equipos tecnológicos
    </Badge>
    <h1 className="text-5xl font-bold text-slate-900 dark:text-white mb-6">
      Administra tus equipos
      <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
        de forma inteligente
      </span>
    </h1>
    <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto">
      AppNest facilita la reserva, administración y mantenimiento de equipos
      como laptops, cámaras, proyectores y más.
    </p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Button
        asChild
        size="lg"
        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
      >
        <Link href="/equipment">
          Ver Equipos Disponibles <ArrowRight className="ml-2 w-4 h-4" />
        </Link>
      </Button>
      {!isAuthenticated && (
        <Button asChild variant="outline" size="lg">
          <Link href="/login">Iniciar Sesión</Link>
        </Button>
      )}
      {isAuthenticated && (
        <Button asChild variant="secondary" className="border-white text-white hover:bg-white hover:text-blue-600" size="lg">
          <Link href="/dashboard">Ir al Dashboard</Link>
        </Button>
      )}

      
    </div>
  </section>
);

export default Hero;
