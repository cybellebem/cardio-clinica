<<<<<<< HEAD
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
=======
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import background from "../../assets/freq-cardiaca.jpeg";
import logo from "../../assets/logo.jpeg";
import FormInput from "../../components/FormInput";
import Button from "../../components/Button";
import "./Login.css";

export default function Login() {
  const {login}=useAuth()
  const navigate=useNavigate()
  const location=useLocation()

  const [form,setForm]=useState({cpf:"",senha:""})
  const [error,setError]=useState("")
  const [loading,setLoading]=useState(false)

  function updateField(e){
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  async function handleSubmit(e){
    e.preventDefault()
    setError("")
    setLoading(true)
    
    try{
      await login(form)
      navigate(location.state?.from?.pathname||"/dashboard",{replace:true})
    }catch(error){
      console.error(error)
      setError("Credenciais inválidas")
    }finally{
      setLoading(false)
>>>>>>> 6c0822d5b44bfa10d781bb3c041b1143e3a7b5f8
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

<<<<<<< HEAD
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
=======
        <form className="login-form" onSubmit={handleSubmit}>
          <FormInput
            label="CPF:"
            type="text"
            name="cpf"
            value={form.cpf}
            placeholder="123.456.789.10"
            onChange={updateField}
            required
          />

          <FormInput
            label="Senha:"
            type="password"
            name="senha"
            value={form.senha}
            placeholder="********"
            onChange={updateField}
            required
          />

          <Button type="submit" disabled={loading}>{loading ? "Entrando..." : "Entrar"}</Button>
>>>>>>> 6c0822d5b44bfa10d781bb3c041b1143e3a7b5f8

          <a href="#">Esqueci minha senha</a>
        </form>
      </div>
    </div>
  );
}