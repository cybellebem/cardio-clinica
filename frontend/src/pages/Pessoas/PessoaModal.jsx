import { useEffect, useState } from "react"
import { http } from "../../api/http"

import "../../components/Modal.css"

const labelMap = {
  Admin: "Administrador",
  Atendente: "Atendente",
  Medico: "Médico",
  Paciente: "Paciente",
}

function formatCpf(value) {
  const d = value.replace(/\D/g, "").slice(0, 11)
  if (d.length > 9) return `${d.slice(0,3)}.${d.slice(3,6)}.${d.slice(6,9)}-${d.slice(9)}`
  if (d.length > 6) return `${d.slice(0,3)}.${d.slice(3,6)}.${d.slice(6)}`
  if (d.length > 3) return `${d.slice(0,3)}.${d.slice(3)}`
  return d
}

function formatTelefone(value) {
  const d = value.replace(/\D/g, "").slice(0, 11)
  if (d.length > 10) return `(${d.slice(0,2)}) ${d.slice(2,7)}-${d.slice(7)}`
  if (d.length > 6)  return `(${d.slice(0,2)}) ${d.slice(2,6)}-${d.slice(6)}`
  if (d.length > 2)  return `(${d.slice(0,2)}) ${d.slice(2)}`
  if (d.length > 0)  return `(${d}`
  return d
}

const emptyForm = { cpf: "", nome: "", telefone: "", endereco: "", crm: "", data_nascimento: "", senha: "" }

export default function PessoaModal({ isOpen, onClose, funcao, pessoa, onSuccess }) {
  const [loading, setLoading] = useState(false)
  const [validated, setValidated] = useState(false)
  const [formData, setFormData] = useState(emptyForm)
  const [errorMessage, setErrorMessage] = useState("");

  const editando = !!pessoa

  useEffect(() => {
    if (!isOpen) {
      setValidated(false)
      return
    }
    if (pessoa) {
      setFormData({
        cpf: formatCpf(pessoa.cpf || ""),
        nome: pessoa.nome || "",
        telefone: formatTelefone(pessoa.telefone || ""),
        endereco: pessoa.endereco || "",
        crm: pessoa.crm || "",
        data_nascimento: pessoa.data_nascimento ? pessoa.data_nascimento.slice(0, 10) : "",
        senha: "",
      })
    } else {
      setFormData(emptyForm)
    }
  }, [isOpen, pessoa])

  if (!isOpen) return null

  const ehPaciente = funcao === "Paciente"
  const ehMedico = funcao === "Medico"

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  function handleCpfInput(e) {
    setFormData({ ...formData, cpf: formatCpf(e.target.value) })
  }

  function handleTelefoneInput(e) {
    setFormData({ ...formData, telefone: formatTelefone(e.target.value) })
  }

  function buildPayload() {
    const base = { cpf: formData.cpf, nome: formData.nome, telefone: formData.telefone, funcao }

    if (ehPaciente) return { ...base, data_nascimento: formData.data_nascimento }

    const payload = { ...base, endereco: formData.endereco }
    if (formData.senha) payload.senha = formData.senha
    if (ehMedico) payload.crm = formData.crm
    return payload
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setValidated(true)

    if (!e.target.checkValidity()) {
      setErrorMessage("Preencha todos os campos obrigatórios.");
      return;
    }

    setErrorMessage("");

    try {
      setLoading(true)

      if (editando) {
        await http.put(`/pessoas/atualizar/${pessoa.id}`, buildPayload())
        alert(`${labelMap[funcao]} atualizado com sucesso`)
      } else {
        await http.post("/pessoas/incluir", buildPayload())
        alert(`${labelMap[funcao]} cadastrado com sucesso`)
      }

      onClose()
      onSuccess()
    } catch (error) {
      alert(error.response?.data?.message || "Erro ao salvar")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>{editando ? "Editar" : "Incluir"} {labelMap[funcao]}</h2>

          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Fechar"
          >
            ✕
          </button>
        </div>
        {errorMessage && (
        <div className="modal-error">
          {errorMessage}
        </div>
        )}
        <form id="pessoa-form" className={`modal-form ${validated ? "was-validated" : ""}`} onSubmit={handleSubmit} noValidate>
          <div className="form-field">
            <label htmlFor="cpf">CPF</label>
            <input
              id="cpf"
              type="text"
              inputMode="numeric"
              name="cpf"
              placeholder="000.000.000-00"
              maxLength={14}
              value={formData.cpf}
              onChange={handleCpfInput}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="nome">Nome</label>
            <input
              id="nome"
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="telefone">Telefone</label>
            <input
              id="telefone"
              type="text"
              inputMode="numeric"
              name="telefone"
              placeholder="(00) 00000-0000"
              maxLength={15}
              value={formData.telefone}
              onChange={handleTelefoneInput}
              required
            />
          </div>

          {ehMedico && (
            <div className="form-field">
              <label htmlFor="crm">CRM</label>
              <input
                id="crm"
                type="text"
                name="crm"
                value={formData.crm}
                onChange={handleChange}
                required
              />
            </div>
          )}

          {!ehPaciente && (
            <div className="form-field">
              <label htmlFor="endereco">Endereço</label>
              <input
                id="endereco"
                type="text"
                name="endereco"
                value={formData.endereco}
                onChange={handleChange}
                required
              />
            </div>
          )}

          {ehPaciente && (
            <div className="form-field">
              <label htmlFor="data_nascimento">Data de Nascimento</label>
              <input
                id="data_nascimento"
                type="date"
                name="data_nascimento"
                value={formData.data_nascimento}
                onChange={handleChange}
                required
              />
            </div>
          )}

          {!ehPaciente && (
            <div className="form-field">
              <label htmlFor="senha">{editando ? "Nova Senha" : "Senha"}</label>
              <input
                id="senha"
                type="password"
                name="senha"
                placeholder={editando ? "Deixe em branco para não alterar" : ""}
                value={formData.senha}
                onChange={handleChange}
                {...(!editando && { required: true })}
              />
            </div>
          )}
        </form>

        <div className="modal-footer">
          <button
            type="button"
            className="cancel-button"
            onClick={onClose}
          >
            Cancelar
          </button>

          <button
            type="submit"
            form="pessoa-form"
            className="save-button"
            disabled={loading}
          >
            {loading ? "Salvando..." : editando ? "Atualizar" : "Salvar"}
          </button>
        </div>
      </div>
    </div>
  )
}
