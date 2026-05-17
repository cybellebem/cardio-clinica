import logo from "../assets/logo2.png";

import { FaBars, FaSignOutAlt, FaUserCircle } from "react-icons/fa";

function Header({ toggleSidebar, collapsed }) {
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
          <FaUserCircle className="user-icon" />
          <span></span>
        </div>

        <button className="logout-button" type="button">
          <FaSignOutAlt />
          <span>Sair</span>
        </button>
      </div>
    </header>
  );
}

export default Header;
