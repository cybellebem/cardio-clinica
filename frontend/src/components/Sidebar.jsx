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
    return location.pathname === path ? "active" : "";
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
          <li className={isActive("/medicos")}>
            <Link to="/medicos">
              <span className="menu-icon">
                <FaUserMd />
              </span>

              <span className="menu-text">Gerenciar Médicos</span>
            </Link>
          </li>

          {/* FUNCIONÁRIOS */}
          <li className={isActive("/funcionarios")}>
            <Link to="/funcionarios">
              <span className="menu-icon">
                <FaUsers />
              </span>

              <span className="menu-text">Gerenciar Funcionários</span>
            </Link>
          </li>

          {/* PACIENTES */}
          <li className={isActive("/pacientes")}>
            <Link to="/pacientes">
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
