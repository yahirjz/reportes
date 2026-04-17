"use client"
import { supabase } from "@/lib/supabase"
import { Clients } from "@/lib/types"
import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation";
import { ArrowLeft, ClipboardCheck, Building2, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function NewAssesmentPage() {
    const [clients, setClients] = useState<Clients[]>([]);
    const [client_id, setClient_id] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    
    const router = useRouter();

    useEffect(() => {
        const fetchClients = async () => {
            const {data, error} = await supabase.from('clients').select('name, id').order('name', {ascending: true});
            if(error) {
                console.error("Error al obtener los clientes: ", error.message);
                return;
            }
            setClients(data || []);
        }
        fetchClients();
    }, []);
    
    const newAssesment = async(e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        
        const { data, error } = await supabase.from('assessments').insert({
            client_id,
            status: 'pending',
            overall_score: 0
        } as any).select();
        
        if(error) {
            console.error("Error al crear la evaluación: ", error.message);
            setIsSaving(false);
            return;
        }
        if(data) {
            const returnedData = data as any[];
            const assessment_id = returnedData[0].id;
            router.push(`/assessment/${assessment_id}`);
            router.refresh();
        }
    }

    return(
        <div className="flex flex-col w-full max-w-2xl mx-auto py-10 px-4 md:px-0">
            
            {/* Navegación de Regreso */}
            <div className="mb-8">
                <Link href="/assessment" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    Volver a Evaluaciones
                </Link>
            </div>

            {/* Tarjeta Principal */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                
                {/* Cabecera */}
                <div className="bg-slate-50 px-8 py-6 border-b border-slate-100 flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 shrink-0">
                        <ClipboardCheck className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Cargar Evaluación</h1>
                        <p className="text-slate-500 text-sm mt-0.5">Inicia un nuevo ciclo de auditoría TISAX para un cliente.</p>
                    </div>
                </div>

                {/* Formulario */}
                <form onSubmit={newAssesment} className="p-8 flex flex-col gap-6">
                    
                    {/* Selector de Cliente */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="client_id" className="font-semibold text-slate-700 text-sm">Empresa a Auditar</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Building2 className="h-5 w-5 text-slate-400" />
                            </div>
                            <select 
                                id="client_id"
                                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-slate-800 font-medium appearance-none"
                                onChange={e => setClient_id(e.target.value)} 
                                value={client_id}
                                required
                            >
                                <option value="" disabled>Seleccione un cliente registrado...</option>
                                {clients?.map(client => (
                                    <option key={client.id} value={client.id}>{client.name}</option>
                                ))}
                            </select>
                            {/* Chevron decorativo custom para el Select */}
                            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                                <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                        </div>
                    </div>

                    {/* Separador */}
                    <div className="h-px bg-slate-100 my-2 w-full"></div>

                    {/* Boton de crear */}
                    <button
                        type="submit"
                        disabled={isSaving || !client_id}
                        className="flex items-center justify-center gap-2 w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold py-3.5 px-4 rounded-xl shadow-md transition-all shadow-indigo-600/20"
                    >
                        {isSaving ? (
                            "Iniciando..."
                        ) : (
                            <>
                                <CheckCircle2 className="w-5 h-5" />
                                Iniciar Auditoría Formativa
                            </>
                        )}
                    </button>
                    
                </form>
            </div>
            
        </div>
    );
}