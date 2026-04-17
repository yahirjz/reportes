"use client"
import React, { useState, useEffect } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ReportTemplate from './ReporteTemplate';

export default function DownloadReportButton({ assessment, clientName, findings }: any) {
    
    //  Evitamos que el servidor intente leer PDFs antes de que exista un navegador
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return (
            <button className="text-slate-400 font-medium bg-slate-50 px-3 py-1 rounded-md border border-slate-200 cursor-not-allowed">
                Cargando PDF...
            </button>
        );
    }

    return (
        <PDFDownloadLink 
            document={<ReportTemplate assessment={assessment} clientName={clientName} findings={findings} />} 
            fileName={`Reporte_TISAX_${clientName || 'General'}.pdf`}
        >
            {({ loading }) => (
                <button className="text-emerald-600 font-medium bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200 hover:bg-emerald-100 transition-colors">
                    {loading ? 'Preparando...' : 'Descargar PDF'}
                </button>
            )}
        </PDFDownloadLink>
    )
}
