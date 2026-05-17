import { Navigate, useParams } from "react-router-dom"
import RequirePerm from "../../auth/RequirePerm"
import Pessoas from "./Pessoas"

export default function PessoasWrapper(){
    const {funcao}=useParams()

    const mapping={
        medicos:"Medico",
        pacientes:"Paciente",
        admins:"Admin",
        atendentes:"Atendente"
    }

    const target=mapping[funcao?.toLowerCase()]
    if(!target) return <Navigate to="/forbidden" replace/>

    return(
        <RequirePerm action="listar" target={target}>
            <Pessoas funcao={target}/>
        </RequirePerm>
    )
}