import Logo from "../shared/logo";
import Link from "next/link";

const Footer = () => (
  <footer className="bg-slate-900 dark:bg-slate-950 text-white py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
      <div className="md:col-span-2">
        <Logo />
        <p className="text-slate-400 mt-4">
          Plataforma moderna para la gestión de equipos. Desarrollada con
          Next.js y desplegada en Railway.
        </p>
      </div>
      <div>
        <h4 className="font-semibold mb-4">Navegación</h4>
        <ul className="space-y-2 text-slate-400">
          <li>
            <Link href="/equipment" className="hover:text-white">
              Equipos
            </Link>
          </li>
          <li>
            <Link href="/reservas" className="hover:text-white">
              Reservas
            </Link>
          </li>
          <li>
            <Link href="/mantenimiento" className="hover:text-white">
              Mantenimiento
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-4">Cuenta</h4>
        <ul className="space-y-2 text-slate-400">
          <li>
            <Link href="/login" className="hover:text-white">
              Iniciar Sesión
            </Link>
          </li>
          <li>
            <Link href="/registro" className="hover:text-white">
              Registrarse
            </Link>
          </li>
        </ul>
      </div>
    </div>
    <div className="text-center text-slate-400 border-t border-slate-800 mt-8 pt-8">
      <p>&copy; 2024 AppNest. Todos los derechos reservados.</p>
    </div>
  </footer>
);

export default Footer;
