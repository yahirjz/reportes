"use client"
import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Aquí es donde diseñamos los estilos (Ya no es Tailwind, es un formato propio parecido a CSS)
const styles = StyleSheet.create({
  page: { padding: 40, fontFamily: 'Helvetica', backgroundColor: '#ffffff' },
  headerBox: { borderBottom: '2px solid #4f46e5', paddingBottom: 15, marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'extrabold', color: '#0f172a' },
  subtitle: { fontSize: 12, color: '#64748b', marginTop: 4 },
  section: { backgroundColor: '#f8fafc', padding: 15, borderRadius: 5, marginBottom: 20 },
  labelText: { fontSize: 10, color: '#94a3b8', textTransform: 'uppercase' },
  valueText: { fontSize: 16, color: '#0f172a', marginTop: 4 },
  valueHighlight: { fontSize: 16, color: '#4f46e5', marginTop: 4 },
});

// El Molde Estructural
export default function ReportTemplate({ assessment, clientName, findings }: any) {
  return (
    <Document>
      {/* Declaramos una hoja A4 normal */}
        <Page size="A4" style={styles.page}>
            
            <View style={styles.headerBox}>
                <Text style={styles.title}>Reporte Operativo TISAX</Text>
                <Text style={styles.subtitle}>Auditoría de Seguridad de la Información Automotriz</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.labelText}>Empresa Auditada</Text>
                <Text style={styles.valueText}>{clientName || "Desconocido"}</Text>

                <Text style={[styles.labelText, { marginTop: 15 }]}>Nivel de Madurez Obtenido</Text>
                <Text style={styles.valueHighlight}>{assessment?.overall_score || 0} / 3.0</Text>

            {/* Sección Dinámica (La Tabla Virtual) */}
                <View style={{ marginTop: 30 }}>
                    <Text style={styles.title}>Observaciones y Planes de Remediación</Text>
                    
                    {findings?.map((finding: any) => (
                        <View key={finding.id} style={{ borderBottom: '1px solid #e2e8f0', paddingVertical: 15 }}>
                            <Text style={styles.labelText}>Control: {finding.control_id} | Madurez: Nivel {finding.maturity_level}</Text>
                            
                            <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 8 }}>Hallazgos Observados:</Text>
                            <Text style={{ fontSize: 11, color: '#334155', marginTop: 2 }}>{finding.description || "Sin descripción."}</Text>
                            
                            <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 8, color: '#4f46e5' }}>Recomendación:</Text>
                            <Text style={{ fontSize: 11, color: '#334155', marginTop: 2 }}>{finding.recommendation || "No hay recomendaciones aplicadas."}</Text>
                        </View>
                    ))}
                </View>

            </View>
        </Page>
    </Document>
    );
}
