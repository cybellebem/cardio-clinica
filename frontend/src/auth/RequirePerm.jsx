import { Navigate } from "react-router-dom"
import { useAuth } from "./AuthContext"

export const funcoes={
    Admin:{
        listar:["Admin","Atendente","Medico","Paciente"],
        gerenciar:["Admin","Atendente"],
    },
    Atendente:{
        listar:["Medico","Paciente"],
        gerenciar:["Medico","Paciente"],
    },
    Medico:{
        listar:["Paciente"],
        gerenciar:[],
    },
    Paciente:{
        listar:[],
        gerenciar:[],
    }
}

export default function RequirePerm({action,target,children}){
    const {pessoa,loading}=useAuth()

    if(loading) return null;

    if(!pessoa) return <Navigate to="/login" replace/>;

    const regras=funcoes[pessoa.funcao]||{}

    const permitido=
        action==="listar"
            ? regras?.listar?.includes(target)
        : action==="gerenciar"
            ? regras?.gerenciar?.includes(target)
            : false

    // if(!permitido) return <Navigate to="/forbidden" replace/>;

    return children
}