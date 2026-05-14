import logo from "../assets/logo2.png";

function Header() {
  return (
    <header className="header">
      <button className="menu-toggle">☰</button>

      <div className="logo-area">
        <img src={logo} alt="Logo" />
      </div>

      <div className="user-area">
        <span>👤</span>

        <button>Sair</button>
      </div>
    </header>
  );
}

export default Header;
