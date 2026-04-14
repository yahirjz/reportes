"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function NewClientPage() {
    const [ name, setName ] = useState("");
    const [ address, setAdress ] = useState("");
    const [ representative, setRepresentative ] = useState("");

    const router = useRouter();
    // funcion para crear un nuevo cliente
    const newClient = async(e: React.FormEvent) => {
        e.preventDefault();
        const { data, error } = await supabase.from('clients').insert({
            name,
            address,
            representative_name: representative
        } as any)
        if(error) {
            console.error("Error al guardar el cliente: ", error.message);
            return;
        }
        // limpiar formulario
        setName("");
        setAdress("");
        setRepresentative("");

        // redirigir a la lista de clientes
        router.push("/clients");
        router.refresh();
    }
    
    return(
        <div className="flex flex-col items-center justify-center">
            <h1>Nuevo cliente</h1>

            <form onSubmit={newClient}>
                {/* nombre del cliente*/}
                <div className="flex flex-col">
                    <label htmlFor="name">Nombre del cliente</label>
                    <input
                        className="border border-gray-300 p-2 rounded-lg"
                        type="text" 
                        id="name" 
                        name="name" 
                        value={name} 
                        onChange ={ e => setName(e.target.value)} 
                        required/>
                </div>
                {/** Direccion del cliente */}
                <div className="flex flex-col">
                    <label htmlFor="address">Direccion</label>
                    <input 
                        className="border border-gray-300 p-2 rounded-lg"
                        type="text" 
                        id="addres" 
                        name="name" 
                        value= {address} 
                        onChange = { e => setAdress(e.target.value)} 
                        required/>
                </div>
                {/** Representante legal del cliente */} 
                <div className="flex flex-col">
                    <label htmlFor="representative_name">Representante legal</label>
                    <input 
                        className="border border-gray-300 p-2 rounded-lg"
                        type="text" 
                        id="representative_name" 
                        name="representative_name" 
                        value={representative} 
                        onChange = { e => setRepresentative(e.target.value)} 
                        required/>
                </div>
                {/** Boton de guardar */} 
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 cursor-pointer"> Guardar </button>
            </form>
        </div>
    )
}