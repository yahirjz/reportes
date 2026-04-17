"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { ArrowLeft, Building2, UserCircle, MapPin, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function NewClientPage() {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [representative, setRepresentative] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    const router = useRouter();

    // funcion para crear un nuevo cliente
    const newClient = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        
        const { data, error } = await supabase.from('clients').insert({
            name,
            address,
            representative_name: representative
        } as any);

        if (error) {
            console.error("Error al guardar el cliente: ", error.message);
            setIsSaving(false);
            return;
        }

        // limpiar formulario
        setName("");
        setAddress("");
        setRepresentative("");
        setIsSaving(false);

        // redirigir a la lista de clientes
        router.push("/clients");
        router.refresh();
    };

    return (
        <div className="flex flex-col w-full max-w-2xl mx-auto py-10 px-4 md:px-0">
            
            {/* Navegación de Regreso */}
            <div className="mb-8">
                <Link href="/clients" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    Volver al Directorio
                </Link>
            </div>

            {/* Tarjeta Principal */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                
                {/* Cabecera */}
                <div className="bg-slate-50 px-8 py-6 border-b border-slate-100 flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 shrink-0">
                        <Building2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Nuevo Cliente</h1>
                        <p className="text-slate-500 text-sm mt-0.5">Registra una nueva empresa u organización en la plataforma.</p>
                    </div>
                </div>

                {/* Formulario */}
                <form onSubmit={newClient} className="p-8 flex flex-col gap-6">
                    
                    {/* Nombre del cliente */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="font-semibold text-slate-700 text-sm">Razón Social o Nombre Público</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Building2 className="h-5 w-5 text-slate-400" />
                            </div>
                            <input
                                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-slate-800 font-medium"
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Ej. Corporativo Tech Solutions S.A. de C.V."
                                value={name}
                                onChange={e => setName(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Representante legal */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="representative_name" className="font-semibold text-slate-700 text-sm">Representante Legal</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <UserCircle className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-slate-800 font-medium"
                                    type="text"
                                    id="representative_name"
                                    name="representative_name"
                                    placeholder="Nombre completo"
                                    value={representative}
                                    onChange={e => setRepresentative(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* Direccion */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="address" className="font-semibold text-slate-700 text-sm">Dirección Física</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <MapPin className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-slate-800 font-medium"
                                    type="text"
                                    id="address"
                                    name="address"
                                    placeholder="Ciudad, Estado, País"
                                    value={address}
                                    onChange={e => setAddress(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Separador */}
                    <div className="h-px bg-slate-100 my-2 w-full"></div>

                    {/* Boton de guardar */}
                    <button
                        type="submit"
                        disabled={isSaving}
                        className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-3.5 px-4 rounded-xl shadow-md transition-all shadow-blue-600/20"
                    >
                        {isSaving ? (
                            "Guardando..."
                        ) : (
                            <>
                                <CheckCircle2 className="w-5 h-5" />
                                Registrar Nuevo Cliente
                            </>
                        )}
                    </button>
                    
                </form>
            </div>
            
        </div>
    );
}