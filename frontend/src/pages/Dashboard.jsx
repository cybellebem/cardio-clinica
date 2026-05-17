import { useEffect, useState } from "react";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState({
    consultasHoje: [],
    totalConsultas: 0,
    totalPacientes: 0,
    totalMedicos: 0,
    faturamento: 0,
  });

  const [loading, setLoading] = useState(true);

  const [collapsed, setCollapsed] = useState(false);

  function toggleSidebar() {
    setCollapsed(!collapsed);
  }

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:3000/dashboard/resumo", {
          method: "GET",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          alert(data.message || "Erro ao carregar dashboard");
          return;
        }

        setDashboardData(data);
      } catch (error) {
        console.error(error);

        alert("Erro ao conectar com servidor");
      } finally {
        setLoading(false);
      }
    }

    fetchDashboard();
  }, []);

  if (loading) {
    return <h1>Carregando dashboard...</h1>;
  }

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
          {/* CONSULTAS */}
          <section className="table">
            <h2>Consultas do dia</h2>

            <table>
              <thead>
                <tr>
                  <th>Hora</th>
                  <th>Paciente</th>
                  <th>Médico</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {dashboardData.consultasHoje.length > 0 ? (
                  dashboardData.consultasHoje.map((consulta) => (
                    <tr key={consulta.id}>
                      <td>{consulta.data_hora}</td>

                      <td>{consulta.paciente_nome}</td>

                      <td>{consulta.medico_nome}</td>

                      <td>{consulta.status}</td>

                      <td>👁️</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">Nenhuma consulta encontrada</td>
                  </tr>
                )}
              </tbody>
            </table>
          </section>

          {/* RESUMO */}
          <section className="summary">
            <h2>Resumo mensal</h2>

            <div className="cards">
              {/* CONSULTAS */}
              <div className="card">
                <h3>Total de consultas</h3>

                <h1>{dashboardData.totalConsultas}</h1>

                <div className="chart">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>

              {/* PACIENTES */}
              <div className="card">
                <h3>Total de pacientes</h3>

                <h1>{dashboardData.totalPacientes}</h1>

                <div className="chart">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>

              {/* MÉDICOS */}
              <div className="card">
                <h3>Total de médicos</h3>

                <h1>{dashboardData.totalMedicos}</h1>

                <div className="chart">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
