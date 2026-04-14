import { supabase } from "@/lib/supabase";
import { Users, FileCheck, CheckCircle2, Clock } from "lucide-react";

export default async function HomePage() {
  // Total de clientes
  const { count: totalClients } = await supabase.from('clients').select('*', { count: 'exact', head: true })
  // Total de auditorias
  const { count: totalAssessments } = await supabase.from('assessments').select('*', { count: 'exact', head: true })
  // Auditorias completadas
  const { count: completedAssessments } = await supabase.from('assessments').select('*', { count: 'exact', head: true }).eq('status', 'completed')
  // Auditorias pendientes
  const { count: pendingAssessments } = await supabase.from('assessments').select('*', { count: 'exact', head: true }).eq('status', 'pending')
  
  return (
    <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto">
      
      {/* Título de la página */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Resumen Operativo</h1>
        <p className="text-slate-500 mt-1">Métricas principales.</p>
      </div>

      {/* Grid de 4 tarjetas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Tarjeta: Total de clientes */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Total Clientes</h2>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <p className="text-4xl font-extrabold text-slate-900 mt-4">{totalClients || 0}</p>
        </div>

        {/* Tarjeta: Total de auditorías */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Evaluaciones</h2>
            <div className="p-2 bg-slate-100 text-slate-600 rounded-lg">
              <FileCheck className="w-5 h-5" />
            </div>
          </div>
          <p className="text-4xl font-extrabold text-slate-900 mt-4">{totalAssessments || 0}</p>
        </div>

        {/* Tarjeta: Auditorias completadas */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Completadas</h2>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <p className="text-4xl font-extrabold text-slate-900 mt-4">{completedAssessments || 0}</p>
        </div>

        {/* Tarjeta: Auditorias pendientes */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Pendientes</h2>
            <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <p className="text-4xl font-extrabold text-slate-900 mt-4">{pendingAssessments || 0}</p>
        </div>

      </div>

    </div>
  )
}