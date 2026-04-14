import { supabase } from "@/lib/supabase";
import { Clients } from "@/lib/types";
import Link from "next/link";
import { ArrowLeft, Building2, MapPin, UserCircle, Briefcase, CalendarDays } from "lucide-react";

export default async function ClientIdPage({params}: {params: Promise<{id: string}>}) {
    const {id} = await params;
    const {data: client, error} = await supabase.from("clients").select("*").eq("id", id).single().returns<Clients>();
    
    if (error || !client) {
        return (
            <div className="p-10 text-center">
                <p className="text-red-500 font-medium mb-4">No se pudo encontrar la información de este cliente.</p>
                <Link href="/clients" className="text-blue-600 hover:underline inline-flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> Volver al directorio
                </Link>
            </div>
        )
    }

    return(
        <div className="flex flex-col gap-8 w-full max-w-4xl mx-auto">
            
            {/* Botón de regreso */}
            <div>
                <Link href="/clients" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    Volver a clientes
                </Link>
            </div>

            {/* Cabecera del Perfil con Ícono Gigante */}
            <div className="flex items-center gap-5 mt-2">
                <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-900/20 shrink-0">
                    <Building2 className="w-10 h-10 text-white" />
                </div>
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">{client.name}</h1>
                    <p className="text-slate-500 font-medium mt-1">ID: <span className="font-mono text-xs bg-slate-200 px-2 py-1 rounded text-slate-600">{client.id}</span></p>
                </div>
            </div>

            {/* Tarjeta de Información General */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8 mt-2">
                <h2 className="text-lg font-bold text-slate-900 pb-4 border-b border-slate-100 mb-6">Información General</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* Dato: Ubicación */}
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-slate-50 text-slate-500 rounded-xl">
                            <MapPin className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500">Dirección Física</p>
                            <p className="text-slate-900 font-medium mt-1">{client.address || "No especificada"}</p>
                        </div>
                    </div>

                    {/* Dato: Representante */}
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-slate-50 text-slate-500 rounded-xl">
                            <UserCircle className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500">Representante Legal</p>
                            <p className="text-slate-900 font-medium mt-1">{client.representative_name || "No especificado"}</p>
                        </div>
                    </div>

                    {/* Dato: ID del Consultor */}
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-slate-50 text-slate-500 rounded-xl">
                            <Briefcase className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500">ID del Consultor Responsable</p>
                            <p className="text-slate-900 font-medium mt-1 font-mono text-sm">{client.consultant_id || "No asignado"}</p>
                        </div>
                    </div>

                    {/* Dato: Fecha de Creación */}
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-slate-50 text-slate-500 rounded-xl">
                            <CalendarDays className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500">Fecha de Registro</p>
                            <p className="text-slate-900 font-medium mt-1 capitalize">
                                {new Date(client.created_at).toLocaleDateString("es-MX", {year: "numeric", month: "long", day: "numeric"})}
                            </p>
                        </div>
                    </div>

                </div>
            </div>
            
            {/* Teaser Funcionalidades Futuras */}
            <div className="bg-slate-50 border border-slate-200 border-dashed rounded-2xl p-8 text-center mt-2">
                <h3 className="text-slate-600 font-medium mb-2">Auditorías</h3>
                <p className="text-slate-500 text-sm max-w-sm mx-auto mb-4">Aquí se enlazarán automáticamente las evaluaciones relacionadas a esta empresa.</p>
            </div>

        </div>
    )
}