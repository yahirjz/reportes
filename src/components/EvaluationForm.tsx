"use client"
import { Controls } from "@/lib/types"
import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { CheckCircle2, AlertCircle, BarChart } from "lucide-react"

// Chapters centralizados
const chapters = [
  "Information Security",
  "Human Resources",
  "Physical Security",
  "Identity and Access Management",
  "IT Security / Cyber Security",
  "Supplier Relationships",
  "Compliance"
]

// Proms que recibira
type EvaluationFormProps = {
    assessment_id: string,
    controls: Controls[] 
}

export default function EvaluationForm({assessment_id, controls}: EvaluationFormProps){ 
    
    const [findings, setFindings] = useState<Record<string, {
        maturity_level: number,
        description: string,
        recommendation: string
    }>>({})
    
    // Estado para controlar pantallas de carga de guardado
    const [isSaving, setIsSaving] = useState(false);

    const handleFindingChange = (controlId: number, field:string, value:string | number) => {
        setFindings(prev => ({
            ...prev,
            [controlId]: {
                ...prev[controlId], 
                [field]: value 
            }
        }))
    }

    const handleSave = async(e: React.FormEvent) => {
        e.preventDefault()
        setIsSaving(true);
        
        const findingArray = Object.entries(findings).map(([controlId, data]) => ({
            assessment_id: assessment_id,
            control_id: Number(controlId),
            maturity_level: data.maturity_level || 0,
            description: data.description || "",
            recommendation: data.recommendation || ""
        }))

        if(findingArray.length > 0) {
            const {error} = await supabase.from('findings').insert( findingArray as any);
            if(error){
                console.error("Error al insertar findings:", error);
                alert("Hubo un error al guardar. Revisa la consola.");
            } else {
                alert("¡Evaluación guardada correctamente!");
            }
        } else {
            alert("No has modificado ningún control para guardar.");
        }
        setIsSaving(false);
    }
    
    return(
        <form onSubmit={handleSave} className="flex flex-col gap-10">
            
            {/* Iteración Maestra de Capítulos */}
            {chapters.map((chapter, chapterIndex) => {
                // Filtramos los controles que pertenecen solo a este capítulo
                const chapterControls = controls?.filter(control => control.chapter === chapter);
                
                // Si por alguna razón el capítulo no tiene controles, no lo dibujamos
                if(!chapterControls || chapterControls.length === 0) return null;

                return (
                    <div key={chapter} className="bg-white border border-slate-200 shadow-sm rounded-2xl overflow-hidden">
                        
                        {/* Cabecera del Capítulo */}
                        <div className="bg-slate-900 px-6 py-4 flex items-center gap-4">
                            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-white font-bold shrink-0">
                                {chapterIndex + 1}
                            </div>
                            <h2 className="text-xl font-bold text-white">{chapter}</h2>
                        </div>

                        {/* Lista de Controles que corresponden a este capítulo */}
                        <div className="divide-y divide-slate-100">
                            {chapterControls.map(control => (
                                <div key={control.id} className="p-6 md:p-8 hover:bg-slate-50/50 transition-colors">
                                    
                                    <div className="flex items-start gap-4 mb-6">
                                        <div className="bg-indigo-100 text-indigo-700 font-bold px-3 py-1 rounded shadow-sm shrink-0 mt-0.5">
                                            {control.code}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg text-slate-800 leading-tight">{control.title}</h3>
                                            <p className="text-slate-500 mt-2 text-sm max-w-3xl leading-relaxed">{control.objective}</p>
                                        </div>
                                    </div>

                                    {/* Zona de Inputs Operativos */}
                                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-50 p-5 rounded-xl border border-slate-200">
                                        
                                        {/* Nivel de madurez (Pequeño) */}
                                        <div className="lg:col-span-3 flex flex-col gap-2">
                                            <label className="font-semibold text-slate-700 text-sm flex items-center gap-1.5">
                                                <BarChart className="w-4 h-4 text-indigo-500" /> Nivel de Madurez
                                            </label>
                                            <input 
                                                type="number"
                                                min="0" max="3"
                                                placeholder="Ej. 3"
                                                className="border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                                onChange={(e) => handleFindingChange(control.id, "maturity_level", Number(e.target.value))}
                                            />
                                            <span className="text-xs text-slate-400">Escala TISAX 1 al 3</span>
                                        </div>

                                        {/* Descripcion (Mediano) */}
                                        <div className="lg:col-span-4 flex flex-col gap-2">
                                            <label className="font-semibold text-slate-700 text-sm mt-[3px]">Hallazgos observados</label>
                                            <textarea
                                                placeholder="Describe el análisis puntual y evidencias..."
                                                className="border border-slate-300 rounded-lg p-2.5 min-h-[100px] text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                                onChange={(e) => handleFindingChange(control.id, "description", e.target.value)}
                                            />
                                        </div>

                                        {/* Recomendacion (Mediano) */}
                                        <div className="lg:col-span-5 flex flex-col gap-2">
                                            <label className="font-semibold text-slate-700 text-sm flex items-center gap-1 mt-[3px]">
                                                <AlertCircle className="w-4 h-4 text-amber-500" /> Plan de Acción / Recomendación
                                            </label>
                                            <textarea
                                                placeholder="Plan de remediación operativo requerido..."
                                                className="border border-slate-300 rounded-lg p-2.5 min-h-[100px] text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                                onChange={(e) => handleFindingChange(control.id, "recommendation", e.target.value)}
                                            />
                                        </div>

                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
            
            {/* Gran Botón Decorativo Inferior */}
            <div className="sticky bottom-4 z-50 bg-white/90 backdrop-blur border border-slate-200 p-4 rounded-2xl shadow-xl flex items-center justify-between mt-4">
                <div>
                    <h4 className="font-bold text-slate-800">Finalizar Evaluacion</h4>
                    <p className="text-xs text-slate-500 hidden sm:block">Asegúrate de que los datos sean correctos antes de guardar.</p>
                </div>
                <button 
                    type="submit" 
                    disabled={isSaving}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold py-3 px-6 sm:px-8 rounded-xl shadow-md transition-all shadow-indigo-600/20"
                >
                    <CheckCircle2 className="w-5 h-5 hidden sm:block" />
                    {isSaving ? "Guardando..." : "Subir a Base de Datos"}
                </button>
            </div>

        </form>
    )
}