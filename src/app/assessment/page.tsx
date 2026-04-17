import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { Plus, Building, Clock, CheckCircle2, FileCheck, ChevronRight, BarChart } from "lucide-react";
import DownloadReportButton from "@/components/DownloadReportButton";

export default async function AssesmentPage() {
    /// Traemos todas la relaciones de la tabla assessments
    const { data: rawAssessments, error } = await supabase.from('assessments').select('*, clients(name), findings(*)').order('created_at', { ascending: false });
    const assessments = rawAssessments as any[];
    
    if(error) {
        console.error("Error al obtener las evaluaciones: ", error.message);
        return (
            <div className="p-10 text-center text-red-500 font-medium">
                Hubo un error cargando la tabla de evaluaciones.
            </div>
        );
    }
    
    return(
        <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto">
            
            {/* Encabezado: Título y Botón */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Registro de Evaluaciones</h1>
                    <p className="text-slate-500 mt-1">Supervisa y administra el progreso de auditorías de todos tus clientes.</p>
                </div>
                
                <Link 
                    href="/assessment/new_assessment" 
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm shadow-blue-600/20"
                >
                    <Plus className="w-5 h-5" />
                    Nueva Evaluación
                </Link>
            </div>

            {/* Contenedor de la Tabla */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                
                {assessments?.length === 0 ? (
                    /* Estado Vacío (Empty State) */
                    <div className="flex flex-col items-center justify-center p-16 text-center">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                            <FileCheck className="w-8 h-8 text-slate-400" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-1">Sin evaluaciones activas</h3>
                        <p className="text-slate-500 max-w-sm mb-6">No has iniciado ninguna auditoría TISAX todavía. Crea tu primera evaluación para comenzar.</p>
                        <Link 
                            href="/assessment/new_assessment" 
                            className="bg-blue-50 text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-lg font-medium transition-colors"
                        >
                            Comenzar ahora
                        </Link>
                    </div>
                ) : (
                    /* Tabla de Datos */
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200">
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Empresa Auditada</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:table-cell">Estatus</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden lg:table-cell">Nivel General</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">Fecha</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {assessments?.map((assessment) => (
                                    <tr key={assessment.id} className="hover:bg-slate-50/80 transition-colors group">
                                        
                                        {/* Columna: Nombre de la Empresa */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center border border-indigo-100 shrink-0">
                                                    <Building className="w-5 h-5 text-indigo-600" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-slate-900">
                                                        {assessment.clients?.name || "Empresa Desconocida"}
                                                    </p>
                                                    <p className="text-xs text-slate-400 font-mono mt-0.5">ID: {assessment.id.slice(0, 8)}...</p>
                                                </div>
                                            </div>
                                        </td>
                                        
                                        {/* Columna: Estatus Visual Inteligente */}
                                        <td className="px-6 py-4 hidden sm:table-cell">
                                            {assessment.status === 'completed' ? (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                                    Completado
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                                                    <Clock className="w-3.5 h-3.5" />
                                                    Pendiente
                                                </span>
                                            )}
                                        </td>

                                        {/* Columna: Puntaje */}
                                        <td className="px-6 py-4 hidden lg:table-cell">
                                            <div className="flex items-center gap-2 text-slate-600">
                                                <BarChart className="w-4 h-4 shrink-0 text-slate-400" />
                                                <span className="font-medium text-slate-900 border border-slate-200 bg-white px-2 py-0.5 rounded text-sm">
                                                    Nivel {assessment.overall_score || 0}
                                                </span>
                                            </div>
                                        </td>

                                        {/* Columna: Fecha */}
                                        <td className="px-6 py-4 hidden md:table-cell">
                                            <p className="text-sm text-slate-500 capitalize">
                                                {new Date(assessment.created_at).toLocaleDateString("es-MX", {year: "numeric", month: "short", day: "numeric"})}
                                            </p>
                                        </td>

                                        {/* Columna: Botón Acciones */}
                                        <td className="px-6 py-4 text-right">
                                            <Link href={`/assessment/${assessment.id}`} className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                                Ver Evaluación
                                                <ChevronRight className="w-4 h-4" />
                                            </Link>
                                            {assessment.status === 'completed' && (
                                                <DownloadReportButton 
                                                    assessment={assessment}  // Objeto completo de la evaluación
                                                    clientName={assessment.clients?.name} // Nombre de la empresa
                                                    findings={assessment.findings} // Array de hallazgos
                                                />
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

        </div>
    )
}