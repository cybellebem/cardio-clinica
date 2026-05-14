import {
  FaHome,
  FaHospitalUser,
  FaPlus,
  FaUserMd,
  FaUsers,
} from "react-icons/fa";

function Sidebar() {
  return (
    <aside className="sidebar">
      <nav className="menu">
        <ul>
          <li className="active">
            <span className="menu-icon">
              <FaHome />
            </span>

            <span className="menu-text">Dashboard</span>
          </li>

          <li>
            <span className="menu-icon">
              <FaUserMd />
            </span>

            <span className="menu-text">Gerenciar Médicos</span>
          </li>

          <li>
            <span className="menu-icon">
              <FaUsers />
            </span>

            <span className="menu-text">Gerenciar Funcionários</span>
          </li>

          <li>
            <span className="menu-icon">
              <FaHospitalUser />
            </span>

            <span className="menu-text">Gerenciar Pacientes</span>
          </li>
        </ul>
      </nav>

      <button className="new-consultation">
        <FaPlus />

        <span>Nova consulta</span>
      </button>
    </aside>
  );
}

export default Sidebar;
