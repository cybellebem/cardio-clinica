import {
  FaHome,
  FaHospitalUser,
  FaPlus,
  FaUserMd,
  FaUsers,
} from "react-icons/fa";

import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

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
          <li className={isActive("/pessoas/medicos")}>
            <Link to="/pessoas/medicos">
              <span className="menu-icon">
                <FaUserMd />
              </span>
              <span className="menu-text">Gerenciar Médicos</span>
            </Link>
          </li>

          {/* FUNCIONÁRIOS */}
          <li className={isActive("/pessoas/admins")}>
            <Link to="/pessoas/admins">
              <span className="menu-icon">
                <FaUsers />
              </span>
              <span className="menu-text">Gerenciar Administradores</span>
            </Link>
          </li>

          {/* ATENDENTES */}
          <li className={isActive("/pessoas/atendentes")}>
            <Link to="/pessoas/atendentes">
              <span className="menu-icon">
                <FaUsers />
              </span>
              <span className="menu-text">Gerenciar Atendentes</span>
            </Link>
          </li>

          {/* PACIENTES */}
          <li className={isActive("/pessoas/pacientes")}>
            <Link to="/pessoas/pacientes">
              <span className="menu-icon">
                <FaHospitalUser />
              </span>
              <span className="menu-text">Gerenciar Pacientes</span>
            </Link>
          </li>
        </ul>
      </nav>

      <button className="new-consultation">
        <span className="button-icon">
          <FaPlus />
        </span>

        <span>Nova Consulta</span>
      </button>
    </aside>
  );
}

export default Sidebar;
