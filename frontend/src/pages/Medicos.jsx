import { useEffect, useState } from "react";

import Header from "../components/Header";
import PessoaModal from "../components/PessoaModal";
import Sidebar from "../components/Sidebar";
import Table from "../components/Table";

function Medicos() {
  const [openModal, setOpenModal] = useState(false);

  const [selectedPessoa, setSelectedPessoa] = useState(null);

  const [collapsed, setCollapsed] = useState(false);

  const [medicos, setMedicos] = useState([]);

  const [loading, setLoading] = useState(true);

  function toggleSidebar() {
    setCollapsed(!collapsed);
  }

  async function fetchMedicos() {
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
        alert(data.message || "Erro ao carregar médicos");
        return;
      }

      const somenteMedicos = data.pessoas.filter(
        (pessoa) => pessoa.funcao === "Medico",
      );

      setMedicos(somenteMedicos);
    } catch (error) {
      console.error(error);

      alert("Erro ao conectar com servidor");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMedicos();
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
        alert(data.message || "Erro ao desativar médico");
        return;
      }

      alert("Médico desativado com sucesso");

      fetchMedicos();
    } catch (error) {
      console.error(error);

      alert("Erro ao conectar com servidor");
    }
  }

  const columns = [
    { label: "ID", accessor: "id" },

    { label: "Nome", accessor: "nome" },

    { label: "CRM", accessor: "crm" },

    { label: "Status", accessor: "status" },
  ];

  if (loading) {
    return <h1>Carregando médicos...</h1>;
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
            title="Médicos"
            columns={columns}
            data={medicos}
            newButtonText="Novo Médico"
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
          tipo="Medico"
          pessoa={selectedPessoa}
          onSuccess={fetchMedicos}
        />
      </div>
    </div>
  );
}

export default Medicos;
