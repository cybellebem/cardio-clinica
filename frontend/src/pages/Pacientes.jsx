import { useEffect, useState } from "react";

import Header from "../components/Header";
import PessoaModal from "../components/PessoaModal";
import Sidebar from "../components/Sidebar";
import Table from "../components/Table";

function Pacientes() {
  const [openModal, setOpenModal] = useState(false);

  const [selectedPessoa, setSelectedPessoa] = useState(null);

  const [collapsed, setCollapsed] = useState(false);

  const [pacientes, setPacientes] = useState([]);

  const [loading, setLoading] = useState(true);

  function toggleSidebar() {
    setCollapsed(!collapsed);
  }

  async function fetchPacientes() {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:3000/pessoas/lista", {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Erro ao carregar pacientes");
        return;
      }

      const somentePacientes = data.pessoas.filter(
        (pessoa) => pessoa.funcao === "Paciente",
      );

      const pacientesFormatados = somentePacientes.map((paciente) => ({
        ...paciente,

        data_nascimento: paciente.data_nascimento
          ? new Date(paciente.data_nascimento).toLocaleDateString("pt-BR")
          : "-",
      }));

      setPacientes(pacientesFormatados);
    } catch (error) {
      console.error(error);

      alert("Erro ao conectar com servidor");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPacientes();
  }, []);

  function handleEdit(pessoa) {
    setSelectedPessoa(pessoa);

    setOpenModal(true);
  }

  async function handleDelete(pessoa) {
    const confirmar = window.confirm(`Deseja desativar ${pessoa.nome}?`);
    if (!confirmar) return;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:3000/pessoas/desativar/${pessoa.id}`,
        {
          method: "PUT",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Erro ao desativar paciente");
        return;
      }

      alert("Paciente desativado com sucesso");

      fetchPacientes();
    } catch (error) {
      console.error(error);

      alert("Erro ao conectar com servidor");
    }
  }

  const columns = [
    { label: "ID", accessor: "id" },

    { label: "Nome", accessor: "nome" },

    { label: "CPF", accessor: "cpf" },

    {
      label: "Data de Nascimento",
      accessor: "data_nascimento",
    },

    { label: "Telefone", accessor: "telefone" },

    { label: "Status", accessor: "status" },
  ];

  if (loading) {
    return <h1>Carregando pacientes...</h1>;
  }

  return (
    <div
      className={
        collapsed ? "dashboard-container collapsed" : "dashboard-container"
      }
    >
      <Sidebar />

      <div className="content-area">
        <Header toggleSidebar={toggleSidebar} collapsed={collapsed} />

        <main className="main-content">
          <Table
            title="Pacientes"
            columns={columns}
            data={pacientes}
            newButtonText="Novo Paciente"
            onNewClick={() => {
              setSelectedPessoa(null);

              setOpenModal(true);
            }}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </main>
        <PessoaModal
          isOpen={openModal}
          onClose={() => {
            setOpenModal(false);

            setSelectedPessoa(null);
          }}
          tipo="Paciente"
          pessoa={selectedPessoa}
          onSuccess={fetchPacientes}
        />
      </div>
    </div>
  );
}

export default Pacientes;
