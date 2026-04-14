import { supabase } from "@/lib/supabase";
import EvaluationForm from "@/components/EvaluationForm";
import Link from "next/link";
import { ArrowLeft, Building, ClipboardCheck, Clock, CheckCircle2, CalendarDays, BarChart } from "lucide-react";

export default async function AssesmentIdPage({params}: {params: Promise<{id: string}>}) {
    const { id } = await params
    const { data: assessment, error} = await supabase.from('assessments').select('*,  clients(name)').eq('id', id).single()
    const { data: rawControls, error: controlsError} = await supabase.from('controls').select('*')
    
    // Ordenamiento natural (1.1.2 irá antes que 1.1.10)
    const controls = rawControls?.sort((a, b) => a.code.localeCompare(b.code, undefined, { numeric: true })) || [];
    // Fallback de seguridad estilizado (Si no hay db)
    if(error || !assessment){
        return (
            <div className="flex flex-col items-center justify-center p-20 text-center">
                <p className="text-red-500 font-bold mb-4">La auditoría solicitada no existe o fue eliminada.</p>
                <Link href="/assessment" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium">
                    <ArrowLeft className="w-4 h-4" /> Volver al directorio de evaluaciones
                </Link>
            </div>
        )
    }

    return(
        <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto pb-20">
            
            {/* Navegación de Regreso */}
            <div>
                <Link href="/assessment" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    Volver a Evaluaciones
                </Link>
            </div>

            {/* Cabecera Principal de la Auditoría */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sm:p-8">
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-slate-100 pb-6">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center justify-center shrink-0 shadow-sm">
                            <ClipboardCheck className="w-8 h-8 text-indigo-600" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">Auditoría Operativa TISAX</h1>
                            <div className="flex items-center gap-2 mt-1">
                                <Building className="w-4 h-4 text-slate-400" />
                                <p className="text-slate-600 font-medium">{assessment.clients?.name || "Empresa no indexada"}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Estatus Visual Dinámico (Badges) */}
                        {assessment.status === 'completed' ? (
                            <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 border border-emerald-200 px-4 py-2 rounded-lg font-medium shadow-sm">
                                <CheckCircle2 className="w-5 h-5" />
                                Completada
                            </div>
                        ) : (
                            <div className="flex items-center gap-2 bg-amber-50 text-amber-700 border border-amber-200 px-4 py-2 rounded-lg font-medium shadow-sm">
                                <Clock className="w-5 h-5" />
                                En Curso
                            </div>
                        )}
                    </div>
                </div>

                {/* Metadatos Rápidos (Grid Estadístico) */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 shadow-sm">
                        <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">Puntaje General</p>
                        <div className="flex items-center gap-2">
                            <BarChart className="w-5 h-5 text-indigo-600" />
                            <p className="text-lg font-bold text-slate-900">{assessment.overall_score || 0}%</p>
                        </div>
                    </div>
                    
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 shadow-sm">
                        <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">Inventario de Controles</p>
                        <p className="text-lg font-bold text-slate-900">{controls?.length || 0}</p>
                    </div>

                    <div className="col-span-2 bg-slate-50 p-4 rounded-xl border border-slate-100 shadow-sm">
                        <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">Fecha de Apertura</p>
                        <div className="flex items-center gap-2 text-slate-700">
                            <CalendarDays className="w-5 h-5 text-slate-400" />
                            <p className="font-medium capitalize">{new Date(assessment.created_at).toLocaleDateString("es-MX", {year: "numeric", month: "long", day: "numeric"})}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Invocación del Formulario Maestro (Ahora mucho más limpio) */}
            <div className="mt-4">
                <h2 className="text-2xl font-extrabold text-slate-800 mb-6 px-1 tracking-tight">Cuestionario TISAX</h2>
                <EvaluationForm assessment_id={id} controls={controls || []} />
            </div>

        </div>
    )
}