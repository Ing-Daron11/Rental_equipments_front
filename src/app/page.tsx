"use client"

import Navbar from "@/components/shared/navbar";
import Hero from "@/components/landing/hero";
import Features from "@/components/landing/features";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";
import { useAuth } from "@/hooks/useAuth";

export default function HomePage() {

const { isAuthenticated } = useAuth();
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <Navbar isAuthenticated={isAuthenticated} />
      <Hero isAuthenticated/>
      <Features />
      <CTA />
      <Footer />
    </div>
  );
}
