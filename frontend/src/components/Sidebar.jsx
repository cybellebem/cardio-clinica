import {
  FaHome,
  FaHospitalUser,
  FaPlus,
  FaUserMd,
  FaUsers,
} from "react-icons/fa";

import { useState } from "react";
import ConsultaModal from "../pages/Consultas/ConsultaModal";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { funcoes } from "../auth/RequirePerm";

export default function Sidebar() {
  const location = useLocation();

const [openModal, setOpenModal] = useState(false);
  const { pessoa, loading } = useAuth();

  if (loading) return null;

  if (!pessoa) return <Navigate to="/login" />;

  const regras = funcoes[pessoa.funcao].listar || [];

  function isActive(path) {
    return location.pathname.startsWith(path) ? "active" : "";
  }

  return (
    <aside className="sidebar">
      <nav className="menu">
        <ul>
          {/* DASHBOARD */}
          <li className={isActive("/dashboard")}>
            <Link to="/dashboard">
              <span className="menu-icon">
                <FaHome />
              </span>

              <span className="menu-text">Dashboard</span>
            </Link>
          </li>

          {/* MÉDICOS */}
          {regras.includes("Medico") && (
            <li className={isActive("/pessoas/medicos")}>
              <Link to="/pessoas/medicos">
                <span className="menu-icon">
                  <FaUserMd />
                </span>

                <span className="menu-text">Médicos</span>
              </Link>
            </li>
          )}

          {/* ADMINISTRADORES */}
          {regras.includes("Admin") && (
            <li className={isActive("/pessoas/admins")}>
              <Link to="/pessoas/admins">
                <span className="menu-icon">
                  <FaUsers />
                </span>

                <span className="menu-text">Administradores</span>
              </Link>
            </li>
          )}

          {/* ATENDENTES */}
          {regras.includes("Atendente") && (
            <li className={isActive("/pessoas/atendentes")}>
              <Link to="/pessoas/atendentes">
                <span className="menu-icon">
                  <FaUsers />
                </span>

                <span className="menu-text">Atendentes</span>
              </Link>
            </li>
          )}

          {/* PACIENTES */}
          {regras.includes("Paciente") && (
            <li className={isActive("/pessoas/pacientes")}>
              <Link to="/pessoas/pacientes">
                <span className="menu-icon">
                  <FaHospitalUser />
                </span>

                <span className="menu-text">Pacientes</span>
              </Link>
            </li>
          )}
        </ul>
      </nav>
{pessoa.funcao === "Medico" && (
  <>
    <button
      className="new-consultation"
      onClick={() => setOpenModal(true)}
    >
      <span className="button-icon">
        <FaPlus />
      </span>

      <span>Nova Consulta</span>
    </button>

    <ConsultaModal
      isOpen={openModal}
      onClose={() => setOpenModal(false)}
    />
  </>
)}
    </aside>
  );
}