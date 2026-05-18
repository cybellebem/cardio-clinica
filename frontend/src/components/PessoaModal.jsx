import logo from "../assets/logo2.png";

import { FaBars, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { useAuth } from "../auth/AuthContext";
import { Navigate } from "react-router-dom";

export default function Header({ toggleSidebar, collapsed }) {
  const {logout,pessoa}=useAuth()

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
          <span>{mapping[pessoa?.funcao]||""}</span>
          <FaUserCircle className="user-icon" />
          <span>{pessoa?.nome||""}</span>
        </div>

        <button
          className="logout-button"
          type="button"
          onClick={logout}
        >
          <FaSignOutAlt />
          <span>Sair</span>
        </button>
      </div>
    </header>
  );
}


// import { useEffect, useState } from "react";

// import "./PessoaModal.css";

// function PessoaModal({ isOpen, onClose, tipo, onSuccess, pessoa }) {
//   const isEdit = !!pessoa;

//   const [loading, setLoading] = useState(false);

//   const [formData, setFormData] = useState({
//     nome: "",
//     cpf: "",
//     telefone: "",
//     endereco: "",
//     senha: "",
//     crm: "",
//     data_nascimento: "",
//     funcao: "",
//   });

//   useEffect(() => {
//     if (pessoa) {
//       setFormData({
//         nome: pessoa.nome || "",
//         cpf: pessoa.cpf || "",
//         telefone: pessoa.telefone || "",
//         endereco: pessoa.endereco || "",
//         senha: "",
//         crm: pessoa.crm || "",
//         data_nascimento: pessoa.data_nascimento || "",
//         funcao: pessoa.funcao || "",
//       });
//     } else {
//       setFormData({
//         nome: "",
//         cpf: "",
//         telefone: "",
//         endereco: "",
//         senha: "",
//         crm: "",
//         data_nascimento: "",
//         funcao: "",
//       });
//     }
//   }, [pessoa]);

//   if (!isOpen) return null;

//   function handleChange(e) {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();

//     try {
//       setLoading(true);

//       const token = localStorage.getItem("token");

//       const body = {
//         ...formData,
//       };

//       // edição NÃO pode enviar funcao
//       if (isEdit) {
//         delete body.funcao;
//       }

//       // remove crm se não for médico
//       if (formData.funcao !== "Medico") {
//         delete body.crm;
//       }

//       // remove data nascimento se não for paciente
//       if (formData.funcao !== "Paciente") {
//         delete body.data_nascimento;
//       }

//       // remove senha vazia em edição
//       if (isEdit && !body.senha) {
//         delete body.senha;
//       }

//       const response = await fetch(
//         isEdit
//           ? `http://localhost:3000/pessoas/atualizar/${pessoa.id}`
//           : "http://localhost:3000/pessoas/incluir",
//         {
//           method: isEdit ? "PUT" : "POST",

//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },

//           body: JSON.stringify(body),
//         },
//       );

//       const data = await response.json();

//       if (!response.ok) {
//         alert(data.message || "Erro ao salvar pessoa");
//         return;
//       }

//       alert(
//         isEdit ? "Pessoa atualizada com sucesso" : "Pessoa criada com sucesso",
//       );

//       if (onSuccess) {
//         onSuccess();
//       }

//       onClose();
//     } catch (error) {
//       console.error(error);

//       alert("Erro ao conectar com servidor");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="modal-overlay">
//       <div className="modal">
//         <div className="modal-header">
//           <h2>
//             {isEdit ? "Editar" : "Novo"}{" "}
//             {formData.funcao === "Medico"
//               ? "Médico"
//               : formData.funcao === "Paciente"
//                 ? "Paciente"
//                 : "Funcionário"}
//           </h2>

//           <button onClick={onClose}>✖</button>
//         </div>

//         <form onSubmit={handleSubmit} className="modal-form">
//           {/* SELECT FUNÇÃO SOMENTE EM CRIAÇÃO */}
//           {!isEdit && tipo === "Funcionario" && (
//             <div className="form-field">
//               <label htmlFor="funcao">Função</label>
//               <select
//                 id="funcao"
//                 name="funcao"
//                 value={formData.funcao}
//                 onChange={handleChange}
//                 required
//               >
//                 <option value="">Selecione uma função</option>

//                 <option value="Admin">Administrador</option>

//                 <option value="Atendente">Atendente</option>
//               </select>
//             </div>
//           )}

//           {/* DEFINE FUNÇÃO AUTOMÁTICA */}
//           {!isEdit && tipo === "Medico" && formData.funcao !== "Medico" && (
//             <input type="hidden" name="funcao" value="Medico" />
//           )}

//           {!isEdit && tipo === "Paciente" && formData.funcao !== "Paciente" && (
//             <input type="hidden" name="funcao" value="Paciente" />
//           )}

//           <div className="form-field">
//             <label htmlFor="nome">Nome</label>
//             <input
//               id="nome"
//               type="text"
//               name="nome"
//               placeholder="Nome completo"
//               value={formData.nome}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="form-field">
//             <label htmlFor="cpf">CPF</label>
//             <input
//               id="cpf"
//               type="text"
//               name="cpf"
//               placeholder="000.000.000-00"
//               value={formData.cpf}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="form-field">
//             <label htmlFor="telefone">Telefone</label>
//             <input
//               id="telefone"
//               type="text"
//               name="telefone"
//               placeholder="(00) 00000-0000"
//               value={formData.telefone}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="form-field">
//             <label htmlFor="endereco">Endereço</label>
//             <input
//               id="endereco"
//               type="text"
//               name="endereco"
//               placeholder="Rua, número, bairro"
//               value={formData.endereco}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           {(formData.funcao === "Medico" || tipo === "Medico") && (
//             <div className="form-field">
//               <label htmlFor="crm">CRM</label>
//               <input
//                 id="crm"
//                 type="text"
//                 name="crm"
//                 placeholder="CRM"
//                 value={formData.crm}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//           )}

//           {(formData.funcao === "Paciente" || tipo === "Paciente") && (
//             <div className="form-field">
//               <label htmlFor="data_nascimento">Data de Nascimento</label>
//               <input
//                 id="data_nascimento"
//                 type="date"
//                 name="data_nascimento"
//                 value={formData.data_nascimento}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//           )}

//           {(formData.funcao !== "Paciente" || tipo !== "Paciente") && (
//             <div className="form-field">
//               <label htmlFor="senha">
//                 {isEdit ? "Nova senha (opcional)" : "Senha"}
//               </label>
//               <input
//                 id="senha"
//                 type="password"
//                 name="senha"
//                 placeholder={isEdit ? "Deixe em branco para manter" : "Senha"}
//                 value={formData.senha}
//                 onChange={handleChange}
//                 required={!isEdit}
//               />
//             </div>
//           )}

//           <div className="modal-actions">
//             <button type="button" className="cancel-button" onClick={onClose}>
//               Cancelar
//             </button>

//             <button type="submit" className="save-button">
//               {loading ? "Salvando..." : isEdit ? "Atualizar" : "Salvar"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default PessoaModal;