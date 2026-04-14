"use client"
import { supabase } from "@/lib/supabase"
import { Clients } from "@/lib/types"
import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation";

export default function NewAssesmentPage() {
    const [clients, setClients] = useState<Clients[]>([]);
    const [client_id, setClient_id] = useState("");
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
        
        const { data, error } = await supabase.from('assessments').insert({
            client_id,
            status: 'pending',
            overall_score: 0
        } as any).select();
        
        if(error) {
            console.error("Error al crear la evaluación: ", error.message);
            return;
        }
        if(data) {
            const assessment_id = data[0].id;
            router.push(`/assessment/${assessment_id}`);
            router.refresh();
        }
    }

    return(
        <div>
            <h1>Evaluaciones</h1>
            <form onSubmit={newAssesment}>
                <label htmlFor="client_id">Cliente</label>
                <select onChange={e => setClient_id(e.target.value)} value={client_id}>
                    <option value="">Seleccione un cliente</option>
                    {clients?.map(client => (
                        <option key={client.id} value={client.id}>{client.name}</option>
                    ))}
                </select>
                <button type="submit">Crear</button>
            </form>
        </div>
    )
}