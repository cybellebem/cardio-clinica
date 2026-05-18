import { useEffect, useState } from "react"
import { Navigate, useParams } from "react-router-dom"
import { http } from "../../api/http"
import { usePerm } from "../../auth/RequirePerm"
import PessoaModal from "./PessoaModal"
import { FaEdit, FaTrash } from "react-icons/fa"

import "./Pessoas.css"
import Sidebar from "../../components/Sidebar"
import Header from "../../components/Header"

const labelMap = {
	Admin: "Administrador",
	Atendente: "Atendente",
	Medico: "Médico",
	Paciente: "Paciente",
}

export default function Pessoas({ funcao }) {
	const [pessoas, setPessoas] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const [openModal, setOpenModal] = useState(false)
	const [selectedPessoa, setSelectedPessoa] = useState(null)

	const podeInserir = usePerm("gerenciar", funcao)
	const podeEditar = podeInserir && funcao !== "Paciente"

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

	function handleEdit(p) {
		setSelectedPessoa(p)
		setOpenModal(true)
	}

	function handleCloseModal() {
		setOpenModal(false)
		setSelectedPessoa(null)
	}

	async function handleDelete(p) {
		if (!window.confirm(`Deseja desativar ${p.nome}?`)) return

		try {
			await http.put(`/pessoas/desativar/${p.id}`)
			buscaPessoas()
		} catch (error) {
			alert(error.response?.data?.message || "Erro ao desativar")
		}
	}

	return (
		<>
		<section className="table">
			<div className="table-header">
				<h2>Lista de {labelMap[funcao]}s</h2>

				{podeInserir && (
					<button className="new-button" onClick={() => setOpenModal(true)}>
						+ Incluir {labelMap[funcao]}
					</button>
				)}
			</div>

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
								{podeEditar && <th>Ações</th>}
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
									<td>{p.crm ?? "-"}</td>
									<td>{p.data_nascimento
										? new Date(p.data_nascimento).toLocaleDateString("pt-BR")
										: "-"}
									</td>
									<td className="left">{p.endereco ?? "-"}</td>
									<td>{p.status === "Ativo"
										? <span style={{ color: "green" }}>{p.status}</span>
										: <span style={{ color: "darkred" }}>{p.status}</span>
									}</td>
									{podeEditar && (
										<td className="table-buttons">
											<button className="edit-button" onClick={() => handleEdit(p)}>
												<FaEdit />
											</button>
											<button className="delete-button" onClick={() => handleDelete(p)}>
												<FaTrash />
											</button>
										</td>
									)}
								</tr>
							))}
						</tbody>
					</table>
				)
				: (!error && !loading && <p>Nenhuma pessoa encontrada</p>)
			}
		</section>

		<PessoaModal
			isOpen={openModal}
			onClose={handleCloseModal}
			funcao={funcao}
			pessoa={selectedPessoa}
			onSuccess={buscaPessoas}
		/>
		</>
	)
}
