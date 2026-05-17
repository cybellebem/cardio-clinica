import { BrowserRouter, Route, Routes } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Funcionarios from "./pages/Funcionarios";
import Login from "./pages/Login/Login";
import Medicos from "./pages/Medicos";
import Pacientes from "./pages/Pacientes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/medicos" element={<Medicos />} />

        <Route path="/funcionarios" element={<Funcionarios />} />

        <Route path="/pacientes" element={<Pacientes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
