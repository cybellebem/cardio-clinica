import { useState } from "react";

import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

import "./Medicos.css";

function Medicos() {
  const [collapsed, setCollapsed] = useState(false);

  function toggleSidebar() {
    setCollapsed(!collapsed);
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

            <div className="cards">
              <div className="card">
                <h3>Total de consultas</h3>
                <h1>120</h1>

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
                <h3>Novos pacientes</h3>
                <h1>18</h1>

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
                <h3>Faturamento</h3>
                <h1>R$ XXX</h1>

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

export default Medicos;
