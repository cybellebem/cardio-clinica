import background from "../../assets/freq-cardiaca.jpeg";
import logo from "../../assets/logo.jpg";
import "./Login.css";

function Login() {
  return (
    <div className="login-container">
      
      <img
        src={background}
        className="background"
        alt="Background"
      />
      
      <div className="overlay"></div>

      <div className="login-card">
        <div className="login-header">
          <div className="welcome-text">
            <h1>
              Seja bem
              <br />
              vindo à
            </h1>
          </div>

          <div className="logo-container">
            <img src={logo} alt="Logo Clínica" />
          </div>
        </div>

        <form className="login-form">
          <label>Nome de usuário:</label>

          <input type="text" placeholder="Digite seu usuário" />

          <label>Senha:</label>

          <input type="password" placeholder="Digite sua senha" />

          <button type="submit">ENTRAR</button>

          <a href="#">Esqueci minha senha</a>
        </form>
      </div>
    </div>
  );
}

export default Login;
