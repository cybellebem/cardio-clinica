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

          <a href="#">Esqueci minha senha</a>
        </form>
      </div>
    </div>
  );
}