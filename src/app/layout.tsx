import React from "react";
import "./globals.css";
import Link from "next/link";
import { LayoutDashboard, Users, FileCheck, ShieldCheck } from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="flex h-screen bg-slate-50 antialiased overflow-hidden text-slate-900">
        
        {/* SIDEBAR (NAV) */}
        <nav className="w-64 bg-slate-900 text-white flex flex-col shadow-2xl h-full z-10 hidden md:flex shrink-0">
          {/* BRANDING */}
          <div className="flex items-center gap-3 px-6 py-8 border-b border-slate-800">
            <div className="bg-blue-600 p-2 rounded-lg shadow-lg shadow-blue-900/20">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>

            <div>
              <h1 className="text-xl font-bold tracking-tight text-white leading-none">REPORTES</h1>
              <p className="text-xs text-slate-400 font-medium">TISAX</p>
            </div>
          </div>

          {/* MENÚ DE NAVEGACIÓN */}
          <div className="flex-1 py-6 px-4 space-y-2">
            <p className="px-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Menú principal</p>
            
            <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-all duration-200 group">
              <LayoutDashboard className="w-5 h-5 text-slate-400 group-hover:text-blue-400 transition-colors" />
              <span className="font-medium">Dashboard</span>
            </Link>

            <Link href="/clients" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-all duration-200 group">
              <Users className="w-5 h-5 text-slate-400 group-hover:text-amber-400 transition-colors" />
              <span className="font-medium">Clientes</span>
            </Link>

            <Link href="/assessment" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-all duration-200 group">
              <FileCheck className="w-5 h-5 text-slate-400 group-hover:text-emerald-400 transition-colors" />
              <span className="font-medium">Evaluaciones</span>
            </Link>
          </div>

          {/* PERFIL (BOTTOM NAV) */}
          <div className="p-4 border-t border-slate-800">
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-slate-800/50">
              <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-sm font-bold text-slate-300">
                Y
              </div>
              <div>
                <p className="text-sm font-medium text-white">Yair</p>
                <p className="text-xs text-slate-400">Auditor TISAX</p>
              </div>
            </div>
          </div>
        </nav>

        {/* CONTENIDO PRINCIPAL */}
        <main className="flex-1 h-full overflow-y-auto bg-slate-50 relative w-full">
          {/* Header móvil */}
          <header className="md:hidden bg-slate-900 text-white p-4 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-400" />
              <h1 className="font-bold">TISAX Portal</h1>
            </div>
          </header>

          {/* Área de despliegue de las páginas */}
          <div className="p-6 md:p-10 max-w-7xl mx-auto min-h-full">
            {children}
          </div>
        </main>

      </body>
    </html>
  );
}