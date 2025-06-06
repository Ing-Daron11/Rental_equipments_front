import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const CTA = () => (
  <section className="py-16 px-4 sm:px-6 lg:px-8">
    <div className="max-w-4xl mx-auto">
      <Card className="border-0 shadow-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardContent className="p-8 text-center">
          <h3 className="text-3xl font-bold mb-4">
            ¿Listo para optimizar tu gestión de equipos?
          </h3>
          <p className="text-xl mb-8 opacity-90">
            Únete a AppNest y transforma la administración de tus dispositivos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/equipment">Explorar Equipos</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600"
            >
              <Link href="/login">Comenzar Ahora</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  </section>
);

export default CTA;
