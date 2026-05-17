import { useState } from "react";
import { useNavigate } from "react-router-dom";

import background from "../../assets/freq-cardiaca.jpeg";
import logo from "../../assets/logo.jpeg";

import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleLogin(event) {
    event.preventDefault();

    try {
      setLoading(true);

      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          cpf,
          senha,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Erro ao fazer login");
        return;
      }

      // salva token
      localStorage.setItem("token", data.token);

      // salva usuário se quiser
      localStorage.setItem("cpf", JSON.stringify(data.cpf));

      // redireciona
      navigate("/dashboard");
    } catch (error) {
      console.error(error);

      alert("Erro ao conectar com servidor");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-container">
      <img src={background} className="background" alt="Background" />

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

        <form className="login-form" onSubmit={handleLogin}>
          <label>Nome de usuário:</label>

          <input
            type="text"
            placeholder="Digite seu usuário"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />

          <label>Senha:</label>

          <input
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          <button type="submit">{loading ? "Entrando..." : "ENTRAR"}</button>

          <a href="#">Esqueci minha senha</a>
        </form>
      </div>
    </div>
  );
}

export default Login;
