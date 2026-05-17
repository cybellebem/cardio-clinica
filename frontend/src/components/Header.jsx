import logo from "../assets/logo2.png";

import { FaBars, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { useAuth } from "../auth/AuthContext";
import { Navigate } from "react-router-dom";

export default function Header({ toggleSidebar, collapsed }) {
  const {logout,pessoa,loading}=useAuth()

  if(loading) return null;
  if(!pessoa) return <Navigate to="/login" />

  const mapping={
    Medico:"Médico",
    Paciente:"Paciente",
    Admin:"Administrador",
    Atendente:"Atendente"
  }

  return (
    <header className="header">
      <div className="header-left">
        <button
          className={`menu-toggle ${collapsed ? "collapsed" : ""}`}
          type="button"
          onClick={toggleSidebar}
        >
          <FaBars />
        </button>

        <div className="logo-area">
          <img src={logo} alt="Logo" />
        </div>
      </div>

      <div className="user-area">
        <div className="user-info">
          <span>{mapping[pessoa.funcao]}</span>
          <FaUserCircle className="user-icon" />
          <span>{pessoa.nome}</span>
        </div>

        <button className="logout-button" type="button" onClick={logout}>
          <FaSignOutAlt />
          <span>Sair</span>
        </button>
      </div>
    </header>
  );
}