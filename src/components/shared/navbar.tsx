'use client';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Menu } from "lucide-react";
import Logo from "../shared/logo";

type NavbarProps = {
  isAuthenticated?: boolean;
}

const Navbar = ({ isAuthenticated }: NavbarProps) => {
  return (
    <nav className="fixed top-0 w-full bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div>
            <Link href="/" className="flex items-center space-x-2">
              <Logo />
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/dashboard" className="navbar-btn">Dashboard</Link>
            <Link href="/equipment" className="navbar-btn">Equipos</Link>
            <Link href="/reservas" className="navbar-btn">Reservas</Link>
            <Link href="/maintenance" className="navbar-btn">Mantenimiento</Link>
           {!isAuthenticated && (
            <Link href="/login" className="navbar-btn-login">
              Iniciar Sesión
            </Link>
          )}
          </div>
          <div className="md:hidden">
            <Button variant="ghost" size="icon"><Menu className="w-5 h-5" /></Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
