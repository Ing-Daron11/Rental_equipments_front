import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Zap, CheckCircle, Shield, Calendar, Settings, Users } from "lucide-react";

const features = [
  { icon: <Zap className="text-blue-600 dark:text-blue-400" />, title: "Fácil de usar", desc: "Interfaz intuitiva y moderna." },
  { icon: <CheckCircle className="text-green-600 dark:text-green-400" />, title: "100% Responsivo", desc: "Funciona en cualquier dispositivo." },
  { icon: <Shield className="text-purple-600 dark:text-purple-400" />, title: "Seguro", desc: "Autenticación JWT y control de roles." },
  { icon: <Calendar className="text-orange-600 dark:text-orange-400" />, title: "Gestión de reservas", desc: "Calendario y notificaciones." },
  { icon: <Settings className="text-red-600 dark:text-red-400" />, title: "Mantenimiento", desc: "Historial técnico detallado." },
  { icon: <Users className="text-cyan-600 dark:text-cyan-400" />, title: "Multi-usuario", desc: "Admin, técnico y usuario final." },
];

const Features = () => (
  <section className="py-16 px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">¿Por qué elegir AppNest?</h2>
      <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
        Plataforma diseñada para optimizar la gestión de equipos tecnológicos
      </p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {features.map((f, i) => (
        <Card key={i} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-opacity-10">
              {f.icon}
            </div>
            <CardTitle>{f.title}</CardTitle>
            <CardDescription>{f.desc}</CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  </section>
);

export default Features;
