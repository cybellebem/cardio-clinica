import { useParams } from "react-router-dom"
import RequirePerm from "../../auth/RequirePerm"
import Pessoas from "./Pessoas"
import NotFound from "../NotFound/NotFound"

export default function PessoasWrapper(){
    const {funcao}=useParams()

    const mapping={
        medicos:"Medico",
        pacientes:"Paciente",
        admins:"Admin",
        atendentes:"Atendente"
    }

    const target=mapping[funcao?.toLowerCase()]
    if(!target) return <NotFound/>

    return(
        <RequirePerm action="listar" target={target}>
            <Pessoas funcao={target}/>
        </RequirePerm>
    )
}