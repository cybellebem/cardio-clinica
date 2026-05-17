<<<<<<< HEAD:frontend/src/pages/Dashboard.jsx
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
=======
import "./Dashboard.css";

export default function Dashboard() {
	return (
		<>
			{/* CONSULTAS */}
			<section className="table">
				<h2>Consultas do dia</h2>
>>>>>>> 6c0822d5b44bfa10d781bb3c041b1143e3a7b5f8:frontend/src/pages/Dashboard/Dashboard.jsx

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

<<<<<<< HEAD:frontend/src/pages/Dashboard.jsx
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
=======
					<tbody>
						<tr>
							<td>08:00</td>
							<td>Nome do Paciente</td>
							<td>Nome do Médico</td>
							<td>Agendada</td>
							<td>👁️</td>
						</tr>
					</tbody>
				</table>
			</section>

			{/* RESUMO */}
			<section className="summary">
				<h2>Resumo mensal</h2>
>>>>>>> 6c0822d5b44bfa10d781bb3c041b1143e3a7b5f8:frontend/src/pages/Dashboard/Dashboard.jsx

				<div className="cards">
					<div className="card">
						<h3>Total de consultas</h3>
						<h1>120</h1>

<<<<<<< HEAD:frontend/src/pages/Dashboard.jsx
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
=======
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
>>>>>>> 6c0822d5b44bfa10d781bb3c041b1143e3a7b5f8:frontend/src/pages/Dashboard/Dashboard.jsx

					<div className="card">
						<h3>Novos pacientes</h3>
						<h1>18</h1>

<<<<<<< HEAD:frontend/src/pages/Dashboard.jsx
            <div className="cards">
              {/* CONSULTAS */}
              <div className="card">
                <h3>Total de consultas</h3>

                <h1>{dashboardData.totalConsultas}</h1>
=======
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
>>>>>>> 6c0822d5b44bfa10d781bb3c041b1143e3a7b5f8:frontend/src/pages/Dashboard/Dashboard.jsx

					<div className="card">
						<h3>Faturamento</h3>
						<h1>R$ XXX</h1>

<<<<<<< HEAD:frontend/src/pages/Dashboard.jsx
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
=======
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
		</>
	);
}
>>>>>>> 6c0822d5b44bfa10d781bb3c041b1143e3a7b5f8:frontend/src/pages/Dashboard/Dashboard.jsx
