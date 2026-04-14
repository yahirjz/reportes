// Tipado de la tabla clientes 
export type Clients = {
    id: string,
    name: string,
    address: string,
    representative_name: string, // nombre del representante legal
    consultant_id: string,
    created_at: string
}

//tipado de la tabla Profiles
export type Profiles = {
    id: string,
    email: string,
    full_name: string
}

// tipado de tabla de Assessments
export type Assessments = {
    id: string,
    client_id: string,
    status: string,
    overall_score: number, // <-- nivel de madures 
    created_at: string
}

//tipado de Findings
export type Findings = {
    id: string,
    assessment_id: string,
    control_id: string,
    maturity_level: number,
    recommendation: string,
    description: string,
    created_at: string
}

// tipado de controls
export type Controls = {
    id: number,
    code: string,
    chapter: string,
    title: string,
    objective: string,
    created_at: string
}

export type Data = {
    public : {
        Tables : {
           clients: { Row: Clients, Insert: Partial<Clients>, Update: Partial<Clients>, Relationships: any[] },
           profiles: { Row: Profiles, Insert: Partial<Profiles>, Update: Partial<Profiles>, Relationships: any[]},
           assessments: { Row: Assessments, Insert: Partial<Assessments>, Update: Partial<Assessments>, Relationships: any[]},
           findings: { Row: Findings, Insert: Partial<Findings>, Update: Partial<Findings>, Relationships: any[]},
           controls: { Row: Controls, Insert: Partial<Controls>, Update: Partial<Controls>, Relationships: any[]}
        }
    }
}
