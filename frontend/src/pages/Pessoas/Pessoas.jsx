import { useEffect, useState } from "react"
import { Navigate, useParams } from "react-router-dom"
import { http } from "../../api/http"

export default function Pessoas({funcao}){
    // const { funcao }=useParams()
    const [pessoas,setPessoas]=useState([])
    const [loading,setLoading]=useState(true)
	const [error,setError]=useState(null)

	async function buscaPessoas(){
		setError(null)
		setLoading(true)

		try{
			const response=await http.get(`/pessoas/funcao/${funcao}`)
			if(!response.data.pessoas) throw new Error("Nenhuma pessoa encontrada");
			setPessoas(response.data.pessoas)
			console.log(pessoas[0])
		}catch(error){
			setError(error.message)
		}finally{
			setLoading(false)
		}
	}

	useEffect(()=>{
		buscaPessoas()
	},[funcao])

    return(
        <div>
            <h1>Lista de {funcao}s</h1>

			{loading && <p>Carregando...</p>}

			{error && !loading && <p>{error}</p>}

            {pessoas.length>0 && !loading
				?(
					<table>
						<thead>
							<tr>
								<th>ID</th>
								<th>CPF</th>
								<th>Nome</th>
								<th>Telefone</th>
								<th>Função</th>
								<th>CRM</th>
								<th>Data de Nascimento</th>
								<th>Endereço</th>
								<th>Status</th>
								{/* botões ativar/desativar/editar? */}
							</tr>
						</thead>
						<tbody>
							{pessoas.map(p=>(
								<tr key={p.id}>
									<td>{p.id}</td>
									<td>{p.cpf}</td>
									<td>{p.nome}</td>
									<td>{p.telefone}</td>
									<td>{p.funcao}</td>
									<td>{p.crm&&p.crm!==null ? p.crm : "-"}</td>
									<td>{p.data_nascimento&&p.data_nascimento!==null&&
										new Date(p.data_nascimento).toLocaleDateString("pt-BR")
									}</td>
									<td>{p.endereco&&p.endereco!==null?p.endereco:"-"}</td>
									<td>{p.status}</td>
								</tr>
							))}
						</tbody>
					</table>
				)
				:(!error && !loading && <p>Nenhuma pessoa encontrada</p>)
			}
        </div>
    )
}