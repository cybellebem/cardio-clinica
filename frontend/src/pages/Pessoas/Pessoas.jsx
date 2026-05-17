import { useEffect, useState } from "react"
import { Navigate, useParams } from "react-router-dom"
import { http } from "../../api/http"

import "./Pessoas.css"
import Sidebar from "../../components/Sidebar"
import Header from "../../components/Header"

export default function Pessoas({ funcao }) {
	const [pessoas, setPessoas] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const [collapsed, setCollapsed] = useState(false)

	function toggleSidebar() {
		setCollapsed(!collapsed)
	}

	async function buscaPessoas() {
		setError(null)
		setLoading(true)

		try {
			const response = await http.get(`/pessoas/funcao/${funcao}`)
			if (!response.data.pessoas) throw new Error("Nenhuma pessoa encontrada");
			setPessoas(response.data.pessoas)
		} catch (error) {
			setError(error.message)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		buscaPessoas()
	}, [funcao])

	return (
		<div
			className={
				collapsed ? "dashboard-container collapsed" : "dashboard-container"
			}
		>
			{/* SIDEBAR */}
			<Sidebar />

			{/* ÁREA DIREITA */}
			<div className="content-area">
				{/* HEADER */}
				<Header toggleSidebar={toggleSidebar} collapsed={collapsed} />

				{/* CONTEÚDO */}
				<main className="main-content">
					<section className="table">
						<h2>Lista de {funcao}s</h2>

						{loading && <p>Carregando...</p>}

						{error && !loading && <p>{error}</p>}

						{pessoas.length > 0 && !loading
							? (
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
										{pessoas.map(p => (
											<tr key={p.id}>
												<td>{p.id}</td>
												<td>{p.cpf}</td>
												<td className="left">{p.nome}</td>
												<td>{p.telefone}</td>
												<td>{p.funcao}</td>
												<td>{p.crm && p.crm !== null ? p.crm : "-"}</td>
												<td>{p.data_nascimento && p.data_nascimento !== null &&
													new Date(p.data_nascimento).toLocaleDateString("pt-BR")
												}</td>
												<td className="left">{p.endereco && p.endereco !== null ? p.endereco : "-"}</td>
												<td>{p.status === "Ativo"
													? <span style={{ color: "green" }}>{p.status}</span>
													: <span style={{ color: "darkred" }}>{p.status}</span>
												}</td>
											</tr>
										))}
									</tbody>
								</table>
							)
							: (!error && !loading && <p>Nenhuma pessoa encontrada</p>)
						}
					</section>
				</main>
			</div>
		</div>
	)
}