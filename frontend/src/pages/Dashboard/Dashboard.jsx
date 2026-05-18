import { useEffect, useState } from "react";

import { http } from "../../api/http";

import "./Dashboard.css";

export default function Dashboard() {
  const [dashboard, setDashboard] = useState({
    consultasHoje: [],
    totalPacientes: 0,
    totalMedicos: 0,
    totalConsultas: 0,
  });

  const [loading, setLoading] = useState(true);

  async function buscaDashboard() {
    try {
      setLoading(true);

      const response = await http.get("/dashboard/resumo");

      setDashboard(response.data);
    } catch (error) {
      console.error(error);

      alert("Erro ao carregar dashboard");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    buscaDashboard();
  }, []);

  if (loading) {
    return <p>Carregando dashboard...</p>;
  }

  return (
    <>
      <section className="table">
        <h2>Consultas do dia</h2>

        <table>
          <thead>
            <tr>
              <th>Hora</th>
              <th>Paciente</th>
              <th>Médico</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {dashboard.consultasHoje.length > 0 ? (
              dashboard.consultasHoje.map((consulta) => (
                <tr key={consulta.id}>
                  <td>{consulta.hora}</td>

                  <td>{consulta.paciente}</td>

                  <td>{consulta.medico}</td>

                  <td>{consulta.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">
                  Nenhuma consulta encontrada
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      <section className="summary">
        <h2>Resumo geral</h2>

        <div className="cards">
          <div className="card">
            <h3>Total de consultas</h3>

            <h1>{dashboard.totalConsultas}</h1>

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

          <div className="card">
            <h3>Total de pacientes</h3>

            <h1>{dashboard.totalPacientes}</h1>

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

          <div className="card">
            <h3>Total de médicos</h3>

            <h1>{dashboard.totalMedicos}</h1>

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