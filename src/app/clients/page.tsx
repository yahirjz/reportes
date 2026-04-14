import { supabase } from "@/lib/supabase";
import type { Clients } from "@/lib/types";
import Link from "next/link";
import { Plus, Building2, User, MapPin, ChevronRight } from "lucide-react";

export default async function ClientsPage() {
    const { data, error} = await supabase.from('clients').select('*').order('created_at', { ascending: false }).returns<Clients[]>()
    
    if (error) return (
        <div className="p-10 text-center text-red-500 font-medium">
            Error al cargar el directorio de clientes. Revisa tu conexión a Supabase.
        </div>
    )
    
    return(
        <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto">
            
            {/* Encabezado: Título y Botón */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Directorio de Clientes</h1>
                    <p className="text-slate-500 mt-1">Administraciòn de las empresas auditadas.</p>
                </div>
                
                <Link 
                    href="/clients/new_client" 
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm shadow-blue-600/20"
                >
                    <Plus className="w-5 h-5" />
                    Nuevo cliente
                </Link>
            </div>

            {/* Contenedor de la Tabla */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                
                {data?.length === 0 ? (
                    /* Estado Vacío (Empty State) cuando no hay clientes */
                    <div className="flex flex-col items-center justify-center p-16 text-center">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                            <Building2 className="w-8 h-8 text-slate-400" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-1">Aún no hay clientes</h3>
                        <p className="text-slate-500 max-w-sm mb-6">No has registrado a ninguna empresa de la cual hacer auditorías. Comienza agregando tu primer cliente.</p>
                        <Link 
                            href="/clients/new_client" 
                            className="bg-blue-50 text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-lg font-medium transition-colors"
                        >
                            Registrar empresa
                        </Link>
                    </div>
                ) : (
                    /* Tabla de Datos cuando sí hay clientes */
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200">
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Empresa (Cliente)</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:table-cell">Representante Legal</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden lg:table-cell">Ubicación</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {data?.map((client) => (
                                    <tr key={client.id} className="hover:bg-slate-50/80 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center border border-blue-100 shrink-0">
                                                    <Building2 className="w-5 h-5 text-blue-600" />
                                                </div>
                                                <p className="font-semibold text-slate-900">{client.name}</p>
                                            </div>
                                        </td>
                                        
                                        <td className="px-6 py-4 hidden sm:table-cell">
                                            <div className="flex items-center gap-2 text-slate-600">
                                                <User className="w-4 h-4 shrink-0" />
                                                <span className="text-sm truncate max-w-[200px]">{client.representative_name}</span>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 hidden lg:table-cell">
                                            <div className="flex items-center gap-2 text-slate-600">
                                                <MapPin className="w-4 h-4 shrink-0" />
                                                <span className="text-sm truncate max-w-[200px] block" title={client.address}>{client.address}</span>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 text-right">
                                            {/* Enlace hacia el perfil del cliente */}
                                            <Link href={`/clients/${client.id}`} className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                                Ver perfil
                                                <ChevronRight className="w-4 h-4" />
                                            </Link>
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